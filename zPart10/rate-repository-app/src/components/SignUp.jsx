import { Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup'
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { NEW_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
    page: {
        height: 490,
        backgroundColor: '#f56c11',
        display: 'flex',
        justifyContent: 'flex-start',
    },
    submitBtn: {
        borderTopColor: '#f56c11',
        borderTopWidth: 3,
        padding: 15,
        backgroundColor: '#19fff4'
    }
})

const initialValues  = {
    username: '',
    password: '',
    passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1)
        .max(30)
        .required('Repository owner name is required'),
    password: yup
        .string()
        .min(5)
        .max(50)
        .required('Repository name is required'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null])
        .required('Passwords must match'),
})

const SignUpForm = ({ onSubmit }) => {
    return ( 
    <View>
        <FormikTextInput name="username" placeholder="username" />
        <FormikTextInput secureTextEntry={true} name="password" placeholder="password" />
        <FormikTextInput secureTextEntry={true} name="passwordConfirmation" placeholder="confirm password" />
        <Pressable onPress={onSubmit} style={styles.submitBtn}>
            <Text fontWeight="bold" color="primary" center="center">Sign Up</Text>
        </Pressable>
    </View>
    )
}

const SignUpPage = () => {
    const [mutate, result] = useMutation(NEW_USER)
    const [signIn] = useSignIn()
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        const { username, password } = values

        try {
            await mutate({ variables: { username, password }})
            await signIn ({username, password})
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.page}>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
            </Formik>
        </View>
      );
}

export default SignUpPage