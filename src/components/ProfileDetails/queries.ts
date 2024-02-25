import { IUserProfile } from '@/types/user-profile';
import { useQuery } from 'react-query';

async function getUserProfile() {
  const response = await fetch('/api/profile');

  // with msw we need to check statusCode as well because it doesn't set ok property to false even in error cases
  if (!response.ok || response.status < 200 || response.status > 299) {
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
