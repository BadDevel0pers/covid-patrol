import { client, q } from '../config/db'
const getAllCountries = client
  .query(q.Paginate(q.Match(q.Ref('indexes/countries'))))
  .then(response => {
    const countriesRef = response.data
    const getAllDataQuery = countriesRef.map(ref => {
      return q.Get(ref)
    })
    return client.query(getAllDataQuery).then(data => data)
  })
  .catch(error => console.error('Error: ', error.message))

export default { getAllCountries }
