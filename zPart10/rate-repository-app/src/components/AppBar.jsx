import { View, StyleSheet, ScrollView } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomColor: '#f56c11',
    borderBottomWidth: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  navItem: {
    paddingRight: 5,
    marginRight: 5,
    borderRightColor: 'orange',
    borderRightWidth: 1,
  }
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal>
    <Link to="/" style={styles.navItem}>
        <Text fontWeight="bold" color="textPrimary">
            Repositories
        </Text>
    </Link>
    <Link to="/signin" style={styles.navItem}>
        <Text fontWeight="bold" color="textPrimary">
            Sign In
        </Text>
    </Link>
    </ScrollView>
  </View>;
};

export default AppBar;