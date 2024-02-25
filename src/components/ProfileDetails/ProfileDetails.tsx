import { View } from '@/types/common';
import { Button } from '@/components/Button';
import { useUserProfile } from './queries';
import { ProfileDetailsSkeleton } from './ProfileDetailsSkeleton';

export interface IProfileDetailsProps {
  setView: React.Dispatch<React.SetStateAction<View>>;
}

export function ProfileDetails({ setView }: IProfileDetailsProps) {
  const { data, isFetching, isError, refetch } = useUserProfile();

  if (isFetching) {
    return <ProfileDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 dark:text-white rounded-lg shadow-md min-h-[364px] flex justify-center flex-col items-center">
        <p className="text-xl text-red-500">Something went wrong</p>
        <Button className="mt-2" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 dark:text-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <div className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full">
          <img src={data?.avatar} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <a
            className="text-sm text-blue-600 hover:underline"
            href="#"
            onClick={() => setView(View.EditProfile)}
          >
            Edit
          </a>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Name</h2>
        <p>{data?.name}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Email</h2>
        <p>{data?.email}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Bio</h2>
        <p>{data?.bio}</p>
      </div>
    </div>
  );
}
