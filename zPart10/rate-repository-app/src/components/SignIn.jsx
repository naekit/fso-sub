import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';

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

const SignInForm = ({ onSubmit }) => {
    return ( 
    <View>
        <FormikTextInput name="username" placeholder="username" />
        <FormikTextInput secureTextEntry={true} name="password" placeholder="password" />
        <Pressable style={styles.submitBtn}>
            <Text fontWeight="bold" color="primary" center="center">Submit</Text>
        </Pressable>
    </View>
    )
}

const SignIn = () => {

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <View style={styles.page}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    </View>
  );
};

export default SignIn;