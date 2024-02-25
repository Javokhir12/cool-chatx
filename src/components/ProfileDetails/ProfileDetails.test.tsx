import { HttpResponse, http } from 'msw';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@/__tests__/test-utils';
import { View } from '@/types/common';
import { IUserProfile } from '@/types/user-profile';
import { ProfileDetails } from '.';

const userProfile: IUserProfile = {
  avatar:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  bio: 'Senior Product Manager at Havi. Passionate about creating exceptional digital experiences. In my free time, I enjoy hiking and experimenting with new recipes.',
  email: 'olivia.davis@havi.com',
  name: 'Olivia Davis',
};

const handlers = [
  http.get('/api/profile', async () => {
    return HttpResponse.json<IUserProfile>(userProfile);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
  vi.restoreAllMocks();
});

describe('ProfileDetails', () => {
  it('should render loading skeleton while profile data is being fetched', () => {
    const mockSetView = vi.fn();
    render(<ProfileDetails setView={mockSetView} />);

    expect(screen.getByTestId('profile-details-skeleton')).toBeInTheDocument();
  });

  it('should render user profile correctly', async () => {
    const mockSetView = vi.fn();
    render(<ProfileDetails setView={mockSetView} />);

    expect(await screen.findByText(userProfile.name)).toBeInTheDocument();
    expect(screen.getByText(userProfile.email)).toBeInTheDocument();
    expect(screen.getByText(userProfile.bio)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /my profile/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /bio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /edit/i })).toBeInTheDocument();

    expect(
      screen.queryByTestId('profile-details-skeleton')
    ).not.toBeInTheDocument();
  });

  it('should allow to edit user profile', async () => {
    const mockSetView = vi.fn();
    render(<ProfileDetails setView={mockSetView} />);

    userEvent.click(await screen.findByRole('link', { name: /edit/i }));

    await waitFor(() =>
      expect(mockSetView).toHaveBeenCalledWith(View.EditProfile)
    );
  });

  it('should allow render error message if user profile could not be loaded', async () => {
    server.use(
      http.get('/api/profile', async () => {
        return HttpResponse.error();
      })
    );

    const mockSetView = vi.fn();
    render(<ProfileDetails setView={mockSetView} />);

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Try again' })
    ).toBeInTheDocument();
  });
});
