import Head from 'next/head'
import Map from "../components/map/Map";

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

          <Map/>
      </main>

      <footer>
          Powered by bad-devs
      </footer>
    </div>
  )
}
