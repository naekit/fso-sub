import { Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup'
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

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
    repositoryOwner: '',
    repositoryName: '',
    rating: '',
    review: ''
};

const validationSchema = yup.object().shape({
    repositoryOwner: yup
        .string()
        .required('Repository owner name is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .min(0)
        .max(100)
        .required('rating is required'),
    review: yup
        .string()
})

const ReviewForm = ({ onSubmit }) => {
    return ( 
    <View>
        <FormikTextInput name="repositoryOwner" placeholder="Repository owner name" />
        <FormikTextInput name="repositoryName" placeholder="Repository Name" />
        <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
        <FormikTextInput multiline={true} name="review" placeholder="Review" />
        <Pressable onPress={onSubmit} style={styles.submitBtn}>
            <Text fontWeight="bold" color="primary" center="center">Submit</Text>
        </Pressable>
    </View>
    )
}

const ReviewPage = () => {
    const [mutate, result] = useMutation(ADD_REVIEW)
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        const { repositoryOwner, repositoryName, rating, review } = values

        try {
            const { data } = await mutate({ variables: { owner: repositoryOwner, repo: repositoryName, rating: Number(rating), text: review }})
            navigate(`/repository/${data.createReview.repositoryId}`)
        } catch (error) {
            console.log(error)
            yup.ValidationError(error)
        }
    }

    return (
        <View style={styles.page}>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
            </Formik>
        </View>
      );
}

export default ReviewPage