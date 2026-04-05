import { SubpageShell } from "@/components/subpage-shell"

export default function About() {
  return (
    <SubpageShell title="About">
      <div className="site-body-copy space-y-6">
            <p className="transition-colors duration-200 hover:text-gray-800 dark:hover:text-gray-300">
              I&apos;m an iOS Engineer with a strong bias for design, clarity, and building interfaces that look good and work even better.
            </p>

            <p className='transition-colors duration-200 hover:text-gray-800 dark:hover:text-gray-300'>
              Since starting in iOS in 2017, I&apos;ve worked across products used by millions at PhonePe and Zomato, contributed to Kodeco as a content specialist, and spent time across App Excellence, Pincode, and now iOS Platforms at PhonePe. Work takes up a big part of my life, but I like it most when it feels human, collaborative, and a little obsessive in the right ways.
            </p>

            <p className='transition-colors duration-200 hover:text-gray-800 dark:hover:text-gray-300'>
              Outside work, I am usually doing one of a few predictable things: hanging out with friends, playing FPS games on my PlayStation, queuing up Fred Again tracks for no reason, rewatching Shinchan clips, or pretending badminton is just a casual hobby and not something I get way too competitive about.
            </p>

            <p className='transition-colors duration-200 hover:text-gray-800 dark:hover:text-gray-300'>
              I like people who care deeply about what they make, music that feels slightly too loud in the best way, humor that does not take itself too seriously, and food that is simple but perfect. A large portion of fries and an ice-cold latte will do it for me almost every time.
            </p>

            <p className='transition-colors duration-200 hover:text-gray-800 dark:hover:text-gray-300'>
              I guess that is the common thread through most of this page: whether it is software, music, sport, or just everyday life, I tend to care a lot about feel. Things should be thoughtful, useful, and enjoyable to spend time with.
            </p>
      </div>
    </SubpageShell>
  );
}
