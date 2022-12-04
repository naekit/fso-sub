import { useQuery } from "@apollo/client"
import { GET_USER } from "../queries"

const Recommend = ({booksShow, page}) => {
    const user = useQuery(GET_USER)
    let booksFiltered = booksShow
    if(page !== 'recommend'){
        return null
    }
    if(user.data.me){
        booksFiltered = booksShow.filter(b => {
            return b.genres.includes(user.data.me.favoriteGenre)
        })
    }
    

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
            {booksFiltered.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    )
}

export default Recommend