import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, loading, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  console.log(data)

  return { repositories: data?.repositories, loading , ...result };
};

export default useRepositories;