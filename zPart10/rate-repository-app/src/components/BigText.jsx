import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
  },
});

const BigText = () => {
  return (
    <View style={styles.container}>
      <Text fontSize="heading" fontWeight="bold" color="textPrimary">
        Rate Repository
      </Text>
    </View>
  );
};

export default BigText