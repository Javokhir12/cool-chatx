import { IUserProfile } from '@/types/user-profile';
import { useQuery } from 'react-query';

async function getUserProfile() {
  const response = await fetch('/api/profile');

  if (!response.ok) {
    throw new Error('Error while getting user profile details');
  }

  return response.json();
}

export function useUserProfile() {
  return useQuery<IUserProfile, Error>({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
    staleTime: Infinity,
  });
}
