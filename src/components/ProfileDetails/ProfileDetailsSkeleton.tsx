export function ProfileDetailsSkeleton() {
  return (
    <div
      className="animate-pulse max-w-xl mx-auto"
      data-testid="profile-details-skeleton"
    >
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-4">
          <div className="animate-pulse bg-gray-200 h-16 w-16 rounded-full"></div>
          <div className="flex-1 space-y-3 py-1">
            <div className="animate-pulse rounded-md bg-gray-200 h-6 w-3/4"></div>
            <div className="animate-pulse rounded-md bg-gray-200 h-6 w-1/4"></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="animate-pulse rounded-md bg-gray-200 h-4 w-1/6"></div>
            <div className="animate-pulse rounded-md bg-gray-200 h-6 w-1/2"></div>
          </div>
          <div className="space-y-2">
            <div className="animate-pulse rounded-md bg-gray-200 h-4 w-1/6"></div>
            <div className="animate-pulse rounded-md bg-gray-200 h-6 w-1/2"></div>
          </div>
          <div className="space-y-2">
            <div className="animate-pulse rounded-md bg-gray-200 h-4 w-1/6"></div>
            <div className="animate-pulse rounded-md bg-gray-200 h-6 w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
