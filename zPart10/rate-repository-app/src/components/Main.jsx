import Constants from 'expo-constants'
import { StyleSheet, View } from 'react-native'
import RepositoryList from './RepositoryList';
import BigBlueText from './BigText';

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        marginLeft: 0,
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: '#242120',
    },
    
});

const Main = () => {
    return (
        <View style={styles.container}>
            <BigBlueText />
            <RepositoryList />
        </View>
    )
}

export default Main