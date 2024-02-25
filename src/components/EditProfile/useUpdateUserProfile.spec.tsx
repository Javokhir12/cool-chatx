import { setupServer } from 'msw/node';
import { QueryClient } from 'react-query';
import { HttpResponse, http } from 'msw';
import {
  createQueryClientWrapper,
  renderHook,
  waitFor,
} from '@/__tests__/test-utils';
import { IUserProfile } from '@/types/user-profile';
import { useUpdateUserProfile } from './queries';

const userProfile: IUserProfile = {
  avatar:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  bio: 'Senior Product Manager at Havi. Passionate about creating exceptional digital experiences. In my free time, I enjoy hiking and experimenting with new recipes.',
  email: 'olivia.davis@havi.com',
  name: 'Olivia Davis',
};

const handlers = [
  http.put('/api/profile', async () => {
    return HttpResponse.json({
      message: 'User profile has been updated successfully',
    });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

describe('useUpdateUserProfile', () => {
  it('should update user profile', async () => {
    const wrapper = createQueryClientWrapper({
      queryClient: new QueryClient(),
    });

    const { result } = renderHook(() => useUpdateUserProfile(), { wrapper });

    result.current.mutate(userProfile);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      message: 'User profile has been updated successfully',
    });
  });

  it('should handle server error', async () => {
    server.use(
      http.put('/api/profile', async () => {
        return new HttpResponse('Internal Server Error', { status: 500 });
      })
    );

    const wrapper = createQueryClientWrapper({
      queryClient: new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      }),
    });

    const { result } = renderHook(() => useUpdateUserProfile(), { wrapper });

    result.current.mutate(userProfile);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(
      new Error('Error while updating user profile')
    );
  });
});
