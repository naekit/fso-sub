import { View, StyleSheet, ScrollView } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';

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
  },
  smallNavItem: {
    fontSize: 12
  },
  lastItem: {
    borderRightWidth: 0,
    borderRightColor: '#fff',
  }
  // ...
});

const AppBar = () => {
  const { data } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network'
  })

  return <View style={styles.container}>
    <ScrollView horizontal>
    <Link to="/" style={styles.navItem}>
        <Text style={styles.smallNavItem} fontWeight="bold" color="textPrimary">
            Repositories
        </Text>
    </Link>
    { 
      data?.me
      ? 
      <>
      <Link to="/review" style={styles.navItem}>
        <Text style={styles.smallNavItem} fontWeight="bold" color="textPrimary">
            Create a review
        </Text>
      </Link>
      <Link to="/signout">
          <Text style={styles.smallNavItem} fontWeight="bold" color="textPrimary">
            Sign Out
          </Text>
      </Link>
      </>
      :
      <>
      <Link to="/signin" style={styles.navItem}>
          <Text style={styles.smallNavItem} fontWeight="bold" color="textPrimary">
              Sign In
          </Text>
      </Link>
      <Link to="/signup">
          <Text style={styles.smallNavItem} fontWeight="bold" color="textPrimary">
              Sign Up
          </Text>
      </Link>
      </>
    }
    </ScrollView>
  </View>;
};

export default AppBar;