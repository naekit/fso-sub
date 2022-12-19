import { Pressable, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'
import Text from './Text';
import FormikTextInput from './FormikTextInput';
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
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required')
})

const SignInForm = ({ onSubmit }) => {
    return ( 
    <View>
        <FormikTextInput name="username" placeholder="username" />
        <FormikTextInput secureTextEntry={true} name="password" placeholder="password" />
        <Pressable onPress={onSubmit} style={styles.submitBtn}>
            <Text fontWeight="bold" color="primary" center="center">Submit</Text>
        </Pressable>
    </View>
    )
}

const SignIn = () => {
  const [signIn] = useSignIn()

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
        const { data } = await signIn({username, password});
        console.log(data.authenticate.accessToken);
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <View style={styles.page}>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    </View>
  );
};

export default SignIn;