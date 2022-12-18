import { View, StyleSheet, Image} from "react-native";
import Text from './Text';


const styles = StyleSheet.create({
    view: {
        padding: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginBottom: 6
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    flexImage: {
        flexGrow: 0,
    },
    flexDescription: {
        marginLeft: 10,
    },
    flexStats: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10
    },
});


RepositoryItem = ({ item }) => {
    return (
        <View style={styles.view}>
            <View style={styles.flexContainer}>
                <View style={styles.flexImage}>
                    <Image style={styles.avatar} source={{uri: `${item.ownerAvatarUrl}`}} />
                </View>
                <View style={styles.flexDescription}>
                    <Text fontWeight="bold" fontSize="subheading" color="textSecondary">{item.fullName}</Text>
                    <Text color="textPrimary">{item.language}</Text>    
                </View>
            </View>
            <Text>{item.description}</Text>
            <View style={styles.flexStats}>
                <View>
                    <Text center="center" fontWeight="bold">
                        {item.stargazersCount >= 1000 ? <>{Math.round((item.stargazersCount/1000)*10)/10}k</>: item.stargazersCount}
                    </Text>
                    <Text center="center">stars</Text>
                </View>
                <View>
                    <Text center="center" fontWeight="bold">
                        {item.forksCount >= 1000 ? <>{Math.round((item.forksCount/1000)*10)/10}k</>: item.forksCount}
                    </Text>
                    <Text center="center">forks</Text>
                </View>
                <View>
                    <Text center="center" fontWeight="bold">{item.reviewCount}</Text>
                    <Text center="center">reviews</Text>
                </View>
                <View>
                    <Text center="center" fontWeight="bold">{item.ratingAverage}</Text>
                    <Text center="center">rating</Text>
                </View>
            </View>
        </View>
    )
}

export default RepositoryItem