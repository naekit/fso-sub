import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import Constants from 'expo-constants'

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  console.log(Constants.manifest)

  return (
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <View style={styles.container}>
                <Main />
              <StatusBar style='auto'/>
            </View>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 5,
    paddingBottom: 55,
    backgroundColor: '#f56c11',
  },
});

export default App  