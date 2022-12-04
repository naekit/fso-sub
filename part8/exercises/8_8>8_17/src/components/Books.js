import { useEffect, useState } from "react"
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from "../queries"

const Books = ({books, show}) => {
  const [booksShow, setBooksShow] = useState(books)
  const [genre, setGenre] = useState('all')
  const query = useQuery(ALL_BOOKS, {
    variables: { genre: genre !== 'all' ? genre: '' }
  });
  

  useEffect(() => {
    const fetchQuery = async () => {
      const data = await query.data.allBooks
      return data
    }
    fetchQuery()
      .then((data) => setBooksShow(data))
      .catch((err) => console.log(err))
  }, [query])

  if (!show || !query) {
    return null
  }

  const genreArr = books.map(b => b.genres).flat(1)
  const genreSet = [...new Set(genreArr), 'all']
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
          <select value={genre} onChange={({target}) => setGenre(target.value)}>
            {genreSet.map(a => 
            <option 
                key={a} 
                value={a}
            >
                {a}
            </option>
            )}
          </select>
        </div>
    </div>
  )
}

export default Books
