import { FlatList, View, StyleSheet } from 'react-native';
import { repositories } from '../../data';
import RepositoryItem from './RepositoryItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    borderBottomColor: '#f56c11',
    borderBottomWidth: 5
  },
});


const ItemSeparator = () => <View style={styles.separator} />;


const RepositoryList = () => {
 
  const DATA = [...repositories]

  return (
        <FlatList
          data={DATA}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({item}) => <RepositoryItem item={item} />}
        //   keyExtractor={item => item.id}
        />
  );
};

export default RepositoryList;