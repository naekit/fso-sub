import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { useParams } from "react-router-native";
import { View, Pressable, StyleSheet, FlatList } from "react-native";
import Text from "./Text";
import * as Linking from 'expo-linking'

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

const RepositoryInfo = ({data}) => {
    return (
        <>
            <RepositoryItem item={data.repository} />
            <Pressable onPress={() => Linking.openURL(data.repository.url)} style={styles.button}>
                <Text color="primary" fontWeight="bold" center="center">Open in GitHub</Text>
            </Pressable>
        </>
    )
}


const RepositoryPage = () => {
    const { id } = useParams()
    const { data, loading } = useQuery(GET_REPOSITORY, {
        variables: { id },
        fetchPolicy: `cache-and-network`
    })
    const reviews = data?.repository 
        ? data.repository.reviews.edges.map(edge => edge.node)
        : []
    console.log(reviews)
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
                        ListHeaderComponent={() => <RepositoryInfo data={data} />}
                    />
            }
        
        </>
    )
}

export default RepositoryPage