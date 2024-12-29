import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

const fetchProfile = async (handle: string) => {
  const response = await axios.get(
    `http://localhost:3000/api/profiles/${handle}`,
  )
  return response.data
}

export const useFetchProfile = (handle: string) => {
  return useQuery({
    queryKey: ['profile', handle],
    queryFn: () => fetchProfile(handle),
    enabled: !!handle,
  })
}
