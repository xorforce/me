export const metadata = {
  title: 'Privacy Policy — Cadence',
  robots: { index: false, follow: false },
};

export default function Privacy() {
  return (
    <main className='mx-auto max-w-2xl px-8 py-24 site-body-copy space-y-8'>
      <h1 className='site-page-title'>Privacy Policy</h1>
      <p className='text-muted-foreground text-sm'>Last updated: June 2026</p>

      <section className='space-y-3'>
        <h2 className='font-medium'>What Cadence collects</h2>
        <p>
          Cadence collects absolutely no activity user data that can be linked
          back to you. This includes any and/or all activity that you do while
          interacting with the app.
        </p>
      </section>

      <section className='space-y-3'>
        <h2 className='font-medium'>Analytics</h2>
        <p>
          We use anonymized, aggregated crash reports and usage analytics to
          understand how the app performs. These contain no personally
          identifiable information and cannot be linked back to you.
        </p>
      </section>

      <section className='space-y-3'>
        <h2 className='font-medium'>Changes</h2>
        <p>
          If this policy changes in a meaningful way, we will notify you in-app
          before the change takes effect. If you have any questions, you can{' '}
          <a href='mailto:bhagatmakesapps@gmail.com' className='home-link'>
            contact us
          </a>
          .
        </p>
      </section>
    </main>
  );
}
