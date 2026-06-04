export const metadata = {
  title: 'Terms of Use — Cadence',
  robots: { index: false, follow: false },
};

export default function Terms() {
  return (
    <main className='mx-auto max-w-2xl px-8 py-24 site-body-copy space-y-8'>
      <h1 className='site-page-title'>Terms of Use</h1>
      <p className='text-muted-foreground text-sm'>Last updated: June 2026</p>

      <section className='space-y-3'>
        <h2 className='font-medium'>Using Cadence</h2>
        <p>Cadence is a personal habit tracking app for forming good habits.</p>
      </section>

      <section className='space-y-3'>
        <h2 className='font-medium'>Free Version</h2>
        <p>
          The free version provides a limited preview of the Cadence app for you
          to experience the features.
        </p>
      </section>

      <section className='space-y-3'>
        <h2 className='font-medium'>Paid Version</h2>
        <p>
          The paid version of the app, or called "Cadence Pro", grants you full,
          unrestricted access of the app by either a one-time or a recurring
          subscription based purchase. The paid version ensure you get the
          latest updates, the newest features of the app for the duration of
          your subscription.
        </p>
      </section>

      <section className='space-y-3'>
        <h2 className='font-medium'>Contact</h2>
        <p>
          Questions about these terms?{' '}
          <a href='mailto:bhagatmakesapps@gmail.com' className='home-link'>
            Contact us
          </a>
          .
        </p>
      </section>
    </main>
  );
}
