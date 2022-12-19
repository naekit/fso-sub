import { gql } from "@apollo/client";

export const GET_AUTH = gql`
    mutation Authenticate($credentials: AuthenticateInput){
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`