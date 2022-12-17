import { View, StyleSheet, Image} from "react-native";
import Text from './Text';


const styles = StyleSheet.create({
    view: {
        padding: 10
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginBottom: 6
    }
});


RepositoryItem = ({ item }) => {
    return (
        <View style={styles.view}>
            <Image style={styles.avatar} source={{uri: `${item.ownerAvatarUrl}`}} />
            <Text fontWeight="bold" fontSize="subheading" color="textSecondary">{item.fullName}</Text>
            <Text>{item.description}</Text>
            <Text color="textSecondary">{item.language}</Text>
            <Text>forks: {item.forksCount}</Text>
            <Text>stargazers: {item.stargazersCount}</Text>
            <Text>reviews: {item.reviewCount}</Text>
            <Text>rating: {item.ratingAverage}</Text>
        </View>
    )
}

export default RepositoryItem