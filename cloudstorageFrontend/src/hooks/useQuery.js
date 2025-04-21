import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getCatsadata = (api)=>{
  const { data, isLoading, refetch} = useQuery({
    queryKey: ['cat'],
    queryFn: () => 
      axios.get(api).then(res => res.data),
  });
  return [data ,isLoading, refetch ]
}