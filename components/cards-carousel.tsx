"use client";

import {
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type CollectedCard = {
  id: string;
  name: string;
  series: string;
  /** Transparent cut-out of the card front (PNG/WebP with alpha). */
  image: string;
  /** Optional cut-out of the back. Without it, the back is a blank silhouette. */
  imageBack?: string | null;
  /** Pixel size of `image`, so layout is known before it loads. */
  width?: number;
  height?: number;
  /** Stand a landscape card on its end in the carousel; it turns flat when opened. */
  standUp?: boolean;
  details?: Record<string, string>;
};

type Size = { w: number; h: number };
type Phase = "opening" | "open" | "closing";

type CardsCarouselProps = {
  cards: CollectedCard[];
  speed?: number;
};

const SHELF_HEIGHT = 346; // tallest a card can stand in the carousel
const SHELF_AREA = 74650; // every card gets roughly the same footprint
const CARD_RATIO = 1.586; // standard card, used until a size is given

const OPEN_EASE = "cubic-bezier(.2, 1, .3, 1)";
const CLOSE_EASE = "cubic-bezier(.65, 0, .35, 1)";

const cssUrl = (src: string) => `url(${JSON.stringify(src)})`;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function naturalSize(card: CollectedCard): Size {
  if (card.width && card.height) {
    return { w: card.width, h: card.height };
  }
  return { w: CARD_RATIO * 100, h: 100 };
}

// Same visual weight for every card, whatever its shape or photo resolution.
function shelfSize(card: CollectedCard): Size {
  const natural = naturalSize(card);
  const { w, h } = card.standUp ? { w: natural.h, h: natural.w } : natural;
  let scale = Math.sqrt(SHELF_AREA / (w * h));
  if (h * scale > SHELF_HEIGHT) {
    scale = SHELF_HEIGHT / h;
  }
  return { w: Math.round(w * scale), h: Math.round(h * scale) };
}

function stageSize(card: CollectedCard): Size {
  const { w, h } = naturalSize(card);
  const sideBySide = window.innerWidth >= 640;
  const maxW = Math.min(460, window.innerWidth * (sideBySide ? 0.42 : 0.45));
  const maxH = Math.min(420, window.innerHeight * 0.6);
  const scale = Math.min(maxW / w, maxH / h);
  return { w: Math.round(w * scale), h: Math.round(h * scale) };
}

function flyFrom(src: DOMRect, target: DOMRect, turned = false) {
  const dx = src.left + src.width / 2 - (target.left + target.width / 2);
  const dy = src.top + src.height / 2 - (target.top + target.height / 2);
  return turned
    ? `translate(${dx}px, ${dy}px) rotate(-90deg) scale(${src.height / target.width})`
    : `translate(${dx}px, ${dy}px) scale(${src.width / target.width})`;
}

function CardFace({
  card,
  size,
  lazy = false,
}: {
  card: CollectedCard;
  size: Size;
  lazy?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={card.image}
      alt=""
      width={size.w}
      height={size.h}
      draggable={false}
      loading={lazy ? "lazy" : undefined}
      decoding="async"
      className="cards-cutout"
      style={{ width: size.w, height: size.h }}
    />
  );
}

export function CardsCarousel({ cards, speed = 40 }: CardsCarouselProps) {

  const [reps, setReps] = useState(2);
  const [active, setActive] = useState<CollectedCard | null>(null);
  const [stage, setStage] = useState<Size>({ w: 0, h: 0 });
  const [phase, setPhase] = useState<Phase | null>(null);
  const [flipped, setFlipped] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const sourceRef = useRef<HTMLElement | null>(null);
  const turnedRef = useRef(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const animationRef = useRef<Animation | null>(null);

  // Enough copies that one half of the loop is wider than the screen.
  useEffect(() => {
    const update = () => {
      const needed = Math.max(10, Math.ceil(window.innerWidth / 160) + 2);
      setReps(Math.max(1, Math.ceil(needed / Math.max(cards.length, 1))));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [cards.length]);

  // ---- motion: a steady drift, plus whatever the viewer's gestures add ----
  //
  // offset   where the track sits, in px (always kept within one loop)
  // pending  distance still to travel from wheel / keys, eased out over frames
  // velocity momentum from a drag or flick, in px/s, decaying to nothing
  const motion = useRef({
    offset: 0,
    pending: 0,
    velocity: 0,
    period: 0,
    hovering: false,
    focused: false,
    held: false,
  });
  const dragRef = useRef<{
    id: number;
    startX: number;
    lastX: number;
    lastT: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);

  // Length of one loop: from the first card to its first repeat.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const measure = () => {
      const items = track.children;
      const first = items[0] as HTMLElement | undefined;
      const repeat = items[half.length] as HTMLElement | undefined;
      if (first && repeat) {
        motion.current.period = repeat.offsetLeft - first.offsetLeft;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // half.length is what changes the loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reps, cards.length]);

  useEffect(() => {
    motion.current.held = !!active;
    if (active) {
      motion.current.pending = 0;
      motion.current.velocity = 0;
    }
  }, [active]);

  // One loop drives everything; the track itself never animates in CSS.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const m = motion.current;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const drifting =
        !m.held &&
        !m.hovering &&
        !m.focused &&
        !dragRef.current &&
        !still.matches;
      let step = drifting ? -speed * dt : 0;

      if (Math.abs(m.pending) > 0.1) {
        const take = m.pending * Math.min(1, dt * 12);
        step += take;
        m.pending -= take;
      } else {
        m.pending = 0;
      }

      if (!dragRef.current && Math.abs(m.velocity) > 1) {
        step += m.velocity * dt;
        m.velocity *= Math.exp(-dt * 3.2);
      } else if (!dragRef.current) {
        m.velocity = 0;
      }

      m.offset += step;
      if (m.period > 0) {
        m.offset = ((m.offset % m.period) - m.period) % m.period;
      }
      track.style.transform = `translate3d(${m.offset}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [speed]);

  // Sideways trackpad swipes and shift + wheel push the row. Plain vertical
  // scrolling is left alone so the page still scrolls normally.
  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) {
      return;
    }
    const onWheel = (event: WheelEvent) => {
      if (motion.current.held) {
        return;
      }
      const sideways = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const delta = sideways ? event.deltaX : event.shiftKey ? event.deltaY : 0;
      if (!delta) {
        return;
      }
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 32 : event.deltaMode === 2 ? 600 : 1;
      motion.current.pending -= delta * unit * 1.4;
    };
    stageEl.addEventListener("wheel", onWheel, { passive: false });
    return () => stageEl.removeEventListener("wheel", onWheel);
  }, []);

  const onStagePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      motion.current.held ||
      (event.pointerType === "mouse" && event.button !== 0)
    ) {
      return;
    }
    dragRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      lastT: performance.now(),
      moved: false,
    };
    motion.current.pending = 0;
    motion.current.velocity = 0;
  };

  const onStagePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) {
      return;
    }
    if (!drag.moved && Math.abs(event.clientX - drag.startX) > 6) {
      drag.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.classList.add("is-dragging");
    }
    if (!drag.moved) {
      return;
    }
    const now = performance.now();
    const dx = event.clientX - drag.lastX;
    const dt = Math.max((now - drag.lastT) / 1000, 0.001);
    motion.current.offset += dx;
    // smoothed release speed, so a flick carries on
    motion.current.velocity = motion.current.velocity * 0.6 + (dx / dt) * 0.4;
    drag.lastX = event.clientX;
    drag.lastT = now;
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) {
      return;
    }
    dragRef.current = null;
    event.currentTarget.classList.remove("is-dragging");
    if (drag.moved) {
      // a drag is not a click: swallow the click that follows it
      suppressClickRef.current = true;
      window.setTimeout(() => (suppressClickRef.current = false), 0);
      if (performance.now() - drag.lastT > 80) {
        motion.current.velocity = 0; // held still before letting go
      }
      motion.current.velocity = Math.max(
        -4000,
        Math.min(4000, motion.current.velocity),
      );
    } else {
      motion.current.velocity = 0;
    }
  };

  // Arrow keys move the row while a card in it has focus.
  const onStageKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      motion.current.pending += event.key === "ArrowRight" ? -320 : 320;
    }
  };

  const half = Array.from({ length: reps }, () => cards).flat();
  const loop = [...half, ...half];

  const openCard = (
    card: CollectedCard,
    source: HTMLElement,
    trigger: HTMLElement,
    viaKeyboard: boolean,
  ) => {
    if (active) {
      return;
    }
    sourceRef.current = source;
    turnedRef.current = !!card.standUp;
    returnFocusRef.current = viaKeyboard ? trigger : null;
    setStage(stageSize(card));
    setFlipped(false);
    setActive(card);
    setPhase("opening");
  };

  // The overlay is in the DOM now: measure both ends, then fly the card out.
  useLayoutEffect(() => {
    if (phase !== "opening") {
      return;
    }
    const card = cardRef.current;
    const source = sourceRef.current;
    if (!card || !source) {
      return;
    }
    document.documentElement.style.overflow = "hidden";

    const from = flyFrom(
      source.getBoundingClientRect(),
      card.getBoundingClientRect(),
      turnedRef.current,
    );
    source.style.visibility = "hidden";
    const frame = requestAnimationFrame(() => setPhase("open"));

    if (prefersReducedMotion()) {
      closeRef.current?.focus({ preventScroll: true });
    } else {
      animationRef.current = card.animate(
        [
          { transform: from },
          { transform: "translateY(-10px) scale(1.03)", offset: 0.72 },
          { transform: "none" },
        ],
        { duration: 900, easing: OPEN_EASE },
      );
      animationRef.current.finished
        .then(() => closeRef.current?.focus({ preventScroll: true }))
        .catch(() => undefined);
    }

    return () => cancelAnimationFrame(frame);
  }, [phase]);

  const closeCard = useCallback(() => {
    const card = cardRef.current;
    if (!active || phase === "closing" || !card) {
      return;
    }
    setPhase("closing");
    setFlipped(false);
    tiltRef.current?.style.setProperty("--rx", "0deg");
    tiltRef.current?.style.setProperty("--ry", "0deg");

    const source = sourceRef.current;
    const finish = () => {
      if (source) {
        source.style.visibility = "";
      }
      document.documentElement.style.overflow = "";
      setActive(null);
      setPhase(null);
      returnFocusRef.current?.focus({ preventScroll: true });
    };

    if (prefersReducedMotion() || !source?.isConnected) {
      finish();
      return;
    }

    animationRef.current?.cancel();
    const closing = card.animate(
      [
        { transform: "none" },
        {
          transform: flyFrom(
            source.getBoundingClientRect(),
            card.getBoundingClientRect(),
            turnedRef.current,
          ),
        },
      ],
      { duration: 560, easing: CLOSE_EASE, fill: "forwards" },
    );
    closing.finished
      .then(() => {
        finish();
        closing.cancel();
      })
      .catch(finish);
  }, [active, phase]);

  // Escape closes; Tab stays inside the overlay.
  useEffect(() => {
    if (!active) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeCard();
        return;
      }
      if (event.key !== "Tab" || !overlayRef.current) {
        return;
      }
      const focusable = Array.from(
        overlayRef.current.querySelectorAll<HTMLButtonElement>(
          'button:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, closeCard]);

  useEffect(
    () => () => {
      document.documentElement.style.overflow = "";
    },
    [],
  );

  const onTilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const tilt = tiltRef.current;
    if (
      !card ||
      !tilt ||
      phase !== "open" ||
      event.pointerType !== "mouse" ||
      prefersReducedMotion()
    ) {
      return;
    }
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    tilt.style.setProperty("--rx", `${(-py * 10).toFixed(2)}deg`);
    tilt.style.setProperty("--ry", `${(px * 12).toFixed(2)}deg`);
    tilt.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
    tilt.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
  };

  const resetTilt = () => {
    tiltRef.current?.style.setProperty("--rx", "0deg");
    tiltRef.current?.style.setProperty("--ry", "0deg");
  };

  const overlayState =
    phase === "open" ? "is-in" : phase === "closing" ? "is-out" : "";

  // The front's outline, reused to clip the glare and to shape a blank back.
  const silhouette: CSSProperties | undefined = active
    ? {
        WebkitMaskImage: cssUrl(active.image),
        maskImage: cssUrl(active.image),
      }
    : undefined;

  return (
    <>
      <div
        ref={stageRef}
        className="cards-stage"
        onPointerDown={onStagePointerDown}
        onPointerMove={onStagePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerOver={(event) => {
          motion.current.hovering = !!(event.target as HTMLElement).closest(
            ".cards-item",
          );
        }}
        onPointerLeave={() => {
          motion.current.hovering = false;
        }}
        onFocus={(event) => {
          // only keyboard focus holds the row; a mouse click shouldn't
          motion.current.focused = (event.target as HTMLElement).matches(
            ":focus-visible",
          );
        }}
        onBlur={() => {
          motion.current.focused = false;
        }}
        onKeyDown={onStageKeyDown}
        onClickCapture={(event) => {
          if (suppressClickRef.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClickRef.current = false;
          }
        }}
      >
        <div ref={trackRef} className="cards-track">
          {loop.map((card, index) => {
            const isClone = index >= half.length;
            const size = shelfSize(card);
            return (
              <button
                key={`${card.id}-${index}`}
                type="button"
                className="cards-item"
                style={{ width: size.w }}
                aria-label={`${card.name}, ${card.series}`}
                aria-hidden={isClone || undefined}
                tabIndex={isClone ? -1 : undefined}
                onClick={(event) => {
                  const face =
                    event.currentTarget.querySelector<HTMLElement>(
                      ".cards-shelf > *",
                    );
                  if (face) {
                    openCard(
                      card,
                      face,
                      event.currentTarget,
                      event.detail === 0,
                    );
                  }
                }}
              >
                <span className="cards-shelf">
                  {card.standUp ? (
                    <span
                      className="cards-turned"
                      style={{ width: size.w, height: size.h }}
                    >
                      <CardFace
                        card={card}
                        size={{ w: size.h, h: size.w }}
                        lazy
                      />
                    </span>
                  ) : (
                    <CardFace card={card} size={size} lazy />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {active
        ? createPortal(
            <div
              ref={overlayRef}
              className={`cards-overlay ${overlayState}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cards-overlay-title"
            >
              <button
                type="button"
                className="cards-scrim"
                aria-label="Put it back"
                tabIndex={-1}
                onClick={closeCard}
              />
              <div className="cards-overlay-grid">
                <div className="cards-big-slot">
                  <div
                    ref={cardRef}
                    className="cards-big"
                    style={{ width: stage.w, height: stage.h }}
                    onPointerMove={onTilt}
                    onPointerLeave={resetTilt}
                  >
                    <div ref={tiltRef} className="cards-tilt">
                      <button
                        type="button"
                        className={`cards-flipper ${flipped ? "is-flipped" : ""}`}
                        aria-label={flipped ? "Turn it back" : "Turn it over"}
                        onClick={() => setFlipped((value) => !value)}
                      >
                        <span className="cards-face">
                          <CardFace card={active} size={stage} />
                          <span
                            className="cards-glare"
                            style={silhouette}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="cards-face cards-back">
                          {active.imageBack ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={active.imageBack}
                              alt=""
                              className="cards-cutout"
                              style={{ width: stage.w, height: stage.h }}
                            />
                          ) : (
                            <span
                              className="cards-blank-back"
                              style={silhouette}
                            >
                              <span className="cards-blank-back-text">
                                {active.name}
                              </span>
                            </span>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="cards-info">
                  <p
                    className="site-subtle-label cards-rise"
                    style={{ "--i": 0 } as CSSProperties}
                  >
                    {active.series}
                  </p>
                  <h2
                    id="cards-overlay-title"
                    className="cards-rise text-xl font-medium text-gray-900 sm:text-2xl dark:text-gray-50"
                    style={{ "--i": 1 } as CSSProperties}
                  >
                    {active.name}
                  </h2>
                  <dl
                    className="cards-rise cards-details"
                    style={{ "--i": 2 } as CSSProperties}
                  >
                    {Object.entries(active.details ?? {}).map(
                      ([label, value]) => (
                        <div key={label}>
                          <dt className="site-meta">{label}</dt>
                          <dd className="text-sm text-gray-900 dark:text-gray-100">
                            {value}
                          </dd>
                        </div>
                      ),
                    )}
                  </dl>
                  <p
                    className="cards-rise flex flex-wrap gap-x-5 gap-y-2 text-[13px]"
                    style={{ "--i": 3 } as CSSProperties}
                  >
                    <button
                      ref={closeRef}
                      type="button"
                      className="home-link"
                      onClick={closeCard}
                    >
                      [put it back]
                    </button>
                  </p>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
