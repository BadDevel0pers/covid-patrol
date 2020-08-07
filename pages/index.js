import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Covid Patrol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <h1>
          Welcome to Covid Patrol
        </h1>
      </main>

      <footer>
          Powered by bad-devs
      </footer>
    </div>
  )
}
