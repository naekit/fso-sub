import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import { View, StyleSheet, FlatList } from "react-native";
import Text from "./Text";


const styles = StyleSheet.create({
    button: {
        borderBottomColor: '#f56c11',
        borderBottomWidth: 9,
        padding: 15,
        backgroundColor: '#19fff4',
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
        borderColor: "#19fff4",
        backgroundColor: '#f56c11',
    },
    text: {
        paddingRight: 40,
        marginLeft: 10
    }
})

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ item }) => {
    console.log(item)
    return (
        <View style={styles.flexReview}>
            <View >
                <Text style={styles.rating} color="primary">{item.rating}</Text>
            </View>
            <View style={styles.text}>
                <Text color="textSecondary">{item.user.username}</Text>
                <Text>{new Date(item.createdAt).toLocaleDateString("da-DK")}</Text>
                <Text>{item.text}</Text>
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