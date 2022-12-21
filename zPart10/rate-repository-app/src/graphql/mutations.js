import { gql } from "@apollo/client";

export const GET_AUTH = gql`
    mutation Authenticate($credentials: AuthenticateInput){
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`

export const ADD_REVIEW = gql`
    mutation createReview(
        $repo: String!
        $owner: String!
        $rating: Int!
        $text: String
    ) {
        createReview (
            review: {
                repositoryName: $repo,
                ownerName: $owner
                rating: $rating
                text: $text
            }
        ){
            repositoryId
        }
    }
`

export const NEW_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
    }
  }
`

export const DELETE_REVIEW = gql`
    mutation deleteReview($id: ID!) {
        deleteReview(id: $id)
    }
`