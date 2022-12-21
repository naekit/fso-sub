import { useEffect, useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import { View, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  filter: {
    backgroundColor: '#3d3836',
    opacity: 0.8,
    padding: 10,
    width: '95%',
    borderRadius: 5,
    margin: 10,
    color: '#f56c11',
  }
})

const RepositoryList = () => {
  const [sort, setSort] = useState('CREATED_AT:DESC')
  const [filter, setFilter] = useState('')

  const { repositories, loading, fetchMore } = useRepositories({
    first: 6,
    filter,
    orderBy: sort.split(':')[0],
    orderDirection: sort.split(':')[1],
  });
  
  const addFilter = (event) => {
    setFilter(event.toLowerCase())
  }

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <>
      <View style={styles.filter}>
          <TextInput 
            onChangeText={(e) => addFilter(e)} 
            placeholder="Type to filter..." 
            style={{textAlign: 'center', color: '#f56c11'}} 
            placeholderTextColor={`#f56c11`} 
            value={filter}
          />
      </View>
      <RepositoryListContainer 
        repositories={repositories} 
        loading={loading} 
        sortedBy={sort}
        setSortBy={setSort}
        onEndReach={onEndReach}
      />
    </>
  ) 
};

export default RepositoryList;