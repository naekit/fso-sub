import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

const App = () => {
  return (
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <View style={styles.container}>
              <Main />
            <StatusBar style='auto'/>
          </View>
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