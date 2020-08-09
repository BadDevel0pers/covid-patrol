const faunadb = require('faunadb')

const secret = process.env.DB_KEY
const q = faunadb.query
const client = new faunadb.Client({ secret })

module.exports = async (req, res) => {
  try {
    const countries = await client
      .query(q.Paginate(q.Match(q.Ref('indexes/countries')), { size: 300 }))
      .then(response => {
        const countriesRef = response.data
        const getAllDataQuery = countriesRef.map(ref => {
          return q.Get(ref)
        })
        return client.query(getAllDataQuery).then(data => data)
      })
      .catch(error => console.error('Error: ', error.message))
    // return ok
    res.status(200).json(countries)
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message })
  }
}
