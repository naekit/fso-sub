import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, Alert } from 'react-native';
import Main from './src/components/Main';

const App = () => {
  return (
    <View style={styles.container}>
    <StatusBar></StatusBar>
      <Main />
    </View>
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