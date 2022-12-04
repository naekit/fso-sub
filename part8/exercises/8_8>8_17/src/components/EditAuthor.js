import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const EditAuthor = ({ selectAuthors }) => {
  const [name, setName] = useState('Robert Martin')
  const [born, setBorn] = useState('')


  const [ editAuthor ] = useMutation(EDIT_AUTHOR)


  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, born }})
    console.log('add book...')

    setName('')
    setBorn('')
  }
  let authorList = selectAuthors.map(a => a.name)
  
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({target}) => setName(target.value)}>
            {authorList.map(a => 
            <option 
                key={a} 
                value={a}
            >
                {a}
            </option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">edit author birth date</button>
      </form>
    </div>
  )
}

export default EditAuthor
