import Map from '../components/map/Map'

export default function Home() {
  return (
    <>
      <h1>Welcome to Covid Patrol</h1>
      {/*// TODO: remove, this is temporary*/}
      <div style={{ height: '50vh' }} />
      <Map />
      <div style={{ height: '300vh' }} />
    </>
  )
}
