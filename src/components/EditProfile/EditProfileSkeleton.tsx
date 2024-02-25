export function EditProfileSkeleton() {
  return (
    <div
      className="flex flex-col items-center p-6 rounded-lg shadow-md max-w-xl mx-auto"
      data-testid="edit-profile-skeleton"
    >
      <div className="animate-pulse bg-gray-200 h-12 w-12 rounded-full"></div>
      <div className="animate-pulse rounded-md bg-gray-200 h-6 w-48 my-4"></div>
      <div className="w-full space-y-4">
        <div className="animate-pulse rounded-md bg-gray-200 h-4 w-16"></div>
        <div className="animate-pulse rounded-md bg-gray-200 h-10 w-full"></div>
        <div className="animate-pulse rounded-md bg-gray-200 h-4 w-16"></div>
        <div className="animate-pulse rounded-md bg-gray-200 h-10 w-full"></div>
        <div className="animate-pulse rounded-md bg-gray-200 h-4 w-16"></div>
        <div className="animate-pulse rounded-md bg-gray-200 h-16 w-full"></div>
      </div>
    </div>
  );
}
