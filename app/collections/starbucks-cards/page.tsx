import { CardsCarousel } from '@/components/cards-carousel';
import './cards.css';
import { SubpageShell } from '@/components/subpage-shell';
import cardsData from '@/data/collections/starbucks-cards.json';

export default function Cards() {
  return (
    <SubpageShell
      maxWidthClass='max-w-5xl'
      contentClassName='py-0 px-4 sm:px-6'
      footerContent={
        <div className='site-footer-note flex items-center justify-center'>
          <p>collecting since 2019</p>
        </div>
      }
      hideNav
    >
      {/* fills the window above the footer, carousel in the middle */}
      <div className='flex min-h-[calc(100svh-5rem)] flex-col justify-center'>
        {cardsData.intro ? (
          <p className='site-page-intro'>{cardsData.intro}</p>
        ) : null}
        <CardsCarousel cards={cardsData.cards} speed={cardsData.speed} />
      </div>
    </SubpageShell>
  );
}
