import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
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