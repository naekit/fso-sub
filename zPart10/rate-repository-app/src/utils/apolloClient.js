import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import Constants from 'expo-constants'
import { setContext } from '@apollo/client/link/context'

const { server } = Constants.manifest.extra

const httpLink = createHttpLink({
    uri: server,
})

const createApolloClient = (authStorage) => {
    const authLink = setContext(async(_, { headers }) => {
        try {
            const accessToken = await authStorage.getAccessToken();
            console.log(accessToken)
            return {
                headers: {
                    ...headers,
                    authorization: accessToken ? `Bearer ${accessToken}` : '',
                },
            };
        } catch (error) {
            console.log(error)
            return {
                headers,
            };
        }
    });
    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
};

export default createApolloClient