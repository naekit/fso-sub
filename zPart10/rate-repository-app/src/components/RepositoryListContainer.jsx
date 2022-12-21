import { FlatList, View, StyleSheet, TextInput } from "react-native"
import Text from "./Text";
import { Link } from "react-router-native";
import RepositoryItem from "./RepositoryItem"
import {Picker} from '@react-native-picker/picker'

const styles = StyleSheet.create({
    separator: {
      height: 10,
      borderBottomColor: '#f56c11',
      borderBottomWidth: 5
    },
    loading: {
      height: 600,
      padding: 100
    },
    organizer: {
      paddingBottom: 20,
      flex:1,
      backgroundColor: '',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: '#f56c11',
      borderBottomWidth: 5
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Organizer = ({ sortBy, setSortBy }) => {

  return (
    <View style={styles.organizer}>
      <Picker itemStyle={{height: 50, color:'#f56c11'}} style={{ height: 50, width: '100%', marginTop: 10, }} mode="dropdown" selectedValue={sortBy} onValueChange={(itemValue) => setSortBy(itemValue)}>
        <Picker.Item label="Order By: Highest Rated" value="RATING_AVERAGE:DESC" />
        <Picker.Item label="Order By: Lowest Rated" value="RATING_AVERAGE:ASC"/>
        <Picker.Item label="Order By: Newest" value="CREATED_AT:DESC"/>
      </Picker>
      
    </View>
  )
}

const RepositoryListContainer = ({ repositories, onEndReach, loading, sortedBy, setSortBy  }) => {

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
        <>
        {
          loading ? <Text color="textPrimary" style={styles.loading}> ... loading</Text>
          :
          <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({item}) => <Link to={`/repository/${item.id}`}><RepositoryItem item={item} /></Link>}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={() => 
            <>
              <Organizer sortBy={sortedBy} setSortBy={setSortBy} />
            </>
          }
          //   keyExtractor={item => item.id}
          />
        }
        </>
  );
}

export default RepositoryListContainer