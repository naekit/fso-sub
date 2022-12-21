import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if(!canFetchMore) {
      return;
    }
    console.log(data.repositories)
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { repositories: data?.repositories, fetchMore: handleFetchMore, loading, ...result };
};

export default useRepositories;