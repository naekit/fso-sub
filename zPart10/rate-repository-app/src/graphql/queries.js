import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
    query getRepositories(
      $orderBy: AllRepositoriesOrderBy
      $orderDirection: OrderDirection
      $filter: String
      $first: Int
      $after: String
    ) {
        repositories (
          orderBy: $orderBy
          orderDirection: $orderDirection
          searchKeyword: $filter
          first: $first
          after: $after
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
                cursor
            }
            pageInfo {
              endCursor
              startCursor
              hasNextPage
            }
        }
    }
`

export const GET_USER = gql`
    query getUser($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
              edges {
                node {
                  id
                  text
                  rating
                  createdAt
                  repositoryId
                  user {
                    id
                    username
                  }
                }
                cursor
              }
              pageInfo {
                endCursor
                startCursor
                hasNextPage
              }
            }
        }
    }
`

export const GET_REPOSITORY = gql`
  query repository($id: ID!, $first: Int, $after: String) {
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
      reviews (first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`