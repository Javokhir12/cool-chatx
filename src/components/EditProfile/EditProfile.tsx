import { ChangeEvent, FormEvent, useLayoutEffect, useState } from 'react';
import { View } from '@/types/common';
import { useUserProfile } from '@/components/ProfileDetails/queries';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { useUpdateUserProfile } from './queries';
import { EditProfileSkeleton } from './EditProfileSkeleton';

export interface IEditProfileProps {
  setView: React.Dispatch<React.SetStateAction<View>>;
}

interface IFormState {
  bio: string;
  email: string;
  name: string;
}

interface IValidationErrors {
  email: boolean | null;
  name: boolean | null;
  bio?: boolean | null;
}

export function EditProfile({ setView }: IEditProfileProps) {
  const [formState, setFormState] = useState<IFormState>({
    bio: '',
    email: '',
    name: '',
  });
  const [validationErrors, setValidationErrors] = useState<IValidationErrors>({
    email: null,
    name: null,
  });

  const { data, isFetching } = useUserProfile();
  const mutation = useUpdateUserProfile();

  useLayoutEffect(() => {
    // Pre-populate form fields with user data from server
    if (data) {
      setFormState({
        bio: data.bio,
        email: data.email,
        name: data.name,
      });
    }
  }, [data]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setValidationErrors({
      ...validationErrors,
      [e.target.name]: !e.target.checkValidity(),
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formState);
  };

  const isDirty =
    formState.bio.trim() !== data?.bio.trim() ||
    formState.email.trim() !== data?.email.trim() ||
    formState.name.trim() !== data?.name.trim();
  const hasFormErrors = Boolean(
    validationErrors.name || validationErrors.email
  );

  if (isFetching || mutation.isLoading) {
    return <EditProfileSkeleton />;
  }

  if (mutation.isSuccess) {
    return (
      <div className="max-w-xl min-h-[492px] mx-auto p-6 flex flex-col items-center justify-center bg-white dark:bg-zinc-900 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4 text-green-600 dark:text-green-500">
          Your profile has been updated.
        </h2>
        <Button onClick={() => setView(View.ProfileDetails)}>
          Go to profile page
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-xl mx-auto p-6 flex flex-col items-center justify-center bg-white dark:bg-zinc-900 rounded-lg shadow-md">
        <div className="mb-4">
          <span className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-full">
            <img
              src={data?.avatar}
              className="w-full h-full object-cover"
              alt="User avatar"
            />
          </span>
        </div>
        <h1 className="text-xl font-semibold mb-2 dark:text-white">
          Update Profile
        </h1>
        <a
          className="mb-6 text-sm text-red-600 hover:underline"
          href="#"
          onClick={() => setView(View.ProfileDetails)}
        >
          Cancel
        </a>
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          {mutation.isError && (
            <p className="text-red-500 text-lg mb-2 text-center">
              Couldn't update profile. Try again
            </p>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <Input
              className="peer dark:bg-zinc-700 dark:text-white invalid:border-red-500 invalid:border-2 invalid:focus-visible:ring-0 invalid:focus-visible:ring-offset-0"
              id="name"
              placeholder="Enter your name"
              type="text"
              name="name"
              required
              value={formState.name}
              onChange={handleChange}
            />
            <p className="mt-2 hidden peer-invalid:block text-red-500 text-sm">
              Please provide a name.
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              className="peer dark:bg-zinc-700 dark:text-white invalid:border-red-500 invalid:border-2 invalid:focus-visible:ring-0 invalid:focus-visible:ring-offset-0"
              id="email"
              placeholder="Enter your email"
              type="email"
              required
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
            <p className="mt-2 hidden peer-invalid:block text-red-500 text-sm">
              Please provide a valid email address.
            </p>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
              htmlFor="bio"
            >
              Bio
            </label>
            <Textarea
              className="dark:bg-zinc-700 dark:text-white"
              id="bio"
              placeholder="Enter your bio"
              name="bio"
              value={formState.bio}
              onChange={handleChange}
            ></Textarea>
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="w-full"
              type="submit"
              disabled={hasFormErrors || !isDirty}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
