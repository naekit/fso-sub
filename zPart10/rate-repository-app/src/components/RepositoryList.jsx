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

  const { repositories, loading } = useRepositories({
    filter,
    orderBy: sort.split(':')[0],
    orderDirection: sort.split(':')[1],
  });
  

  const addFilter = (event) => {
    console.log(event)
    setFilter(event.toLowerCase())
    console.log(filter)
  }

  const [repositoryNodes, setRepos] = useState([]);

  useEffect(() => {
    if(loading){
      return
    } else {
      setRepos(repositories.edges.map((edge) => edge.node))
    }
  }, [loading]);
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
        repositories={repositoryNodes} 
        loading={loading} 
        sortedBy={sort}
        setSortBy={setSort}
        setFilter={addFilter}
        filterVal={filter}
      />
    </>
  ) 
};

export default RepositoryList;