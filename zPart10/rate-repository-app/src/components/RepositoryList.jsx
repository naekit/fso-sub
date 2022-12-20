import useRepositories from '../hooks/useRepositories';
import { RepositoryListContainer } from './RepositoryListContainer';

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();
   
  <RepositoryListContainer repositories={repositories} loading={loading} />
};

export default RepositoryList;