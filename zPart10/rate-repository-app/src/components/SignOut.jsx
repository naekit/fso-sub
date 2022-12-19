import React, {useEffect} from "react";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";

const SignOut = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const navigate = useNavigate();

    const logout = async() => {
        await authStorage.removeAccessToken();
        await apolloClient.resetStore();
        navigate('/')
    }

    useEffect(() => {
        logout();
    }, [])

    return (
        <>
        </>
    )
}

export default SignOut