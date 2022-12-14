import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        genres
        author {
            name
        }
        published
        id
    }
`

export const ALL_BOOKS = gql`
    query allBooks($genre: String) {
        allBooks(genre: $genre) {
            title
            genres
            author {
                name
            }
            published
            id
        }
    }
`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`
export const GET_USER = gql`
    query Me {
        me {
          username
          favoriteGenre
        }
      }
`

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            title
            author {
                name
            }
            published
            genres
            id
        }
    }
`
export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $born: Int!) {
        editAuthor(name: $name, born: $born) {
            name
            born
            bookCount
            id
        }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
        ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`