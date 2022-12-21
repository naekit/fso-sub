import Constants from 'expo-constants'
import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignOut from './SignOut';
import RepositoryPage from './RepositoryPage';
import ReviewPage from './ReviewPage';
import SignUpPage from './SignUp';

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flexShrink: 1,
        backgroundColor: '#242120',
    },
    
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} exact />
                <Route path='/repository/:id' element={<RepositoryPage />} />
                <Route path='/review' element={<ReviewPage />} />
                <Route path="/signup" element={<SignUpPage />} exact />
                <Route path="/signin" element={<SignIn />} exact />
                <Route path='/signout' element={<SignOut />} exact />
                {/* <Route path="*" element={<Navigate to="/" replace/>}/> */}
            </Routes>
        </View>
    )
}

export default Main