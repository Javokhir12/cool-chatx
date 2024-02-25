import { IUserProfile } from '@/types/user-profile';
import { useMutation, useQueryClient } from 'react-query';

type UserProfileBody = Omit<IUserProfile, 'avatar'>;

async function updateUserProfile(profileData: UserProfileBody) {
  const response = await fetch('/api/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error('Error while updating user profile');
  }

  return response.json();
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });
}
