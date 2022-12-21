import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
    query getRepositories(
      $orderBy: AllRepositoriesOrderBy
      $orderDirection: OrderDirection
      $filter: String
    ) {
        repositories (
          orderBy: $orderBy
          orderDirection: $orderDirection
          searchKeyword: $filter
        ) {
            edges {
                node {
                    id
                    ownerAvatarUrl
                    description
                    language
                    fullName
                    ratingAverage
                    reviewCount
                    stargazersCount
                    forksCount
                }
            }
        }
    }
`

export const GET_USER = gql`
    query {
        me {
            id
            username
        }
    }
`

export const GET_REPOSITORY = gql`
  query repository($id: ID!) {
    repository(id: $id) {
      id
      ownerAvatarUrl
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`