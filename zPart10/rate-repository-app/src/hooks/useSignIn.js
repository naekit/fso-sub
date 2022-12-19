import { useMutation } from "@apollo/client";
import { GET_AUTH } from "../graphql/mutations";

const useSignIn = () => {
    const [mutate, result] = useMutation(GET_AUTH);

    const signIn = async({username, password}) => {
        const res = await mutate({variables: {credentials: {username, password}}});
        return res
    }

    return [signIn, result];
}

export default useSignIn