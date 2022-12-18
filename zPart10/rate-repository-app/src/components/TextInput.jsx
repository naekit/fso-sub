import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    textInput: {
        padding: 15,
        borderColor: '#f56c11',
        backgroundColor: '#242120',
        color: '#19fff4',
        borderBottomWidth: 3,
        textAlign: 'center',
    }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput placeholderTextColor="#19fff4" style={styles.textInput} {...props} />;
};

export default TextInput;