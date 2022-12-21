import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import { View, StyleSheet, FlatList, Pressable, Alert } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";


const styles = StyleSheet.create({
    button: {
        borderColor: '#f56c11',
        borderWidth: 3,
        padding: 5,
        backgroundColor: '#1a1513',
        flexGrow: 1,
        marginRight: 5,
    },
    separator: {
        height: 10,
        borderBottomColor: '#f56c11',
        borderBottomWidth: 5
    },
    flexReview: {
        display: 'flex',
        flexDirection: "row",
        padding: 10,
    },
    rating: {
        padding: 10,
        borderWidth: 3,
        borderColor: "#1a1513",
        backgroundColor: '#f56c11',
    },
    text: {
        paddingRight: 40,
        marginLeft: 10
    },
    flexButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    }
})

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ item }) => {
    const [mutate, result] = useMutation(DELETE_REVIEW, {
        refetchQueries: [
            { query: GET_USER },
            "getUser"
        ]
    })

    const deleteReview = () => {
        Alert.alert(
            "Delete review?",
            "Press Ok to Delete",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log('Cancel Pressed'),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () => await mutate({variables: { id: item.id }})
                }
            ]

        )
    }

    return (
        <View style={styles.flexReview}>
            <View >
                <Text fontWeight="bold" style={styles.rating} color="primary">{item.rating}</Text>
            </View>
            <View style={styles.text}>
                <Text color="textSecondary">{item.user.username}</Text>
                <Text>{new Date(item.createdAt).toLocaleDateString("da-DK")}</Text>
                <Text>{item.text}</Text>
                <View style={styles.flexButtons}>
                    <Pressable style={styles.button}>
                        <Link to={`/repository/${item.repositoryId}`}><Text center="center" fontWeight="bold" color="textPrimary">View repository</Text></Link>
                    </Pressable>
                    <Pressable onPress={deleteReview} style={styles.button}>
                        <Text center="center" fontWeight="bold" color="textPrimary">Delete review</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const MyReviews = () => {
    const { data, loading, refetch } = useQuery(GET_USER, {
        variables: { includeReviews: true },
    });

    // console.log(data.me.reviews.edges)

    const reviews = data?.me 
        ? data.me.reviews.edges.map(({node}) => node)
        : []

    return (
        <>
            {
                loading 
                ? <Text>
                    ...loading
                </Text>
                :   <FlatList
                        data={reviews}
                        ItemSeparatorComponent={ItemSeparator}
                        renderItem={({ item }) => <ReviewItem item={item} />}
                    />
            }
        
        </>
    )
}


export default MyReviews