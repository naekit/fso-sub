import EditAuthor from "./EditAuthor"

const Authors = ({ authors, show }) => {

  if (!show) {
    return null
  }
  console.log(authors)
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthor selectAuthors={authors} />
    </div>
  )
}

export default Authors
