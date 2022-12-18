import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert } from 'react-native';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';

const App = () => {
  return (
    <View style={styles.container}>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style='auto'/>
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