import { useMutation } from "@apollo/client";
import { GET_AUTH } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
    const [mutate, result] = useMutation(GET_AUTH);
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()

    const signIn = async({username, password}) => {
        const res = await mutate({variables: {credentials: {username, password}}});
        await authStorage.setAccessToken(res.data.authenticate.accessToken)
        console.log(res.data.authenticate.accessToken)
        // apolloClient.resetStore();

        return res
    }

    return [signIn, result];
}

export default useSignIn