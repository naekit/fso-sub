import { FlatList, View, StyleSheet  } from "react-native"
import RepositoryItem from "./RepositoryItem"

const styles = StyleSheet.create({
    separator: {
      height: 10,
      borderBottomColor: '#f56c11',
      borderBottomWidth: 5
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, loading }) => {
    const repositoryNodes = loading 
  ? []
  : repositories.edges.map(edge => edge.node);

  return (
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({item}) => <RepositoryItem item={item} />}
        //   keyExtractor={item => item.id}
        />
  );
}