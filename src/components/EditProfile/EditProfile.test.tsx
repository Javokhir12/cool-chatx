import { HttpResponse, http } from 'msw';
import userEvent from '@testing-library/user-event';
import { QueryClient } from 'react-query';
import { setupServer } from 'msw/node';
import {
  createQueryClientWrapper,
  render,
  screen,
  waitFor,
} from '@/__tests__/test-utils';
import { View } from '@/types/common';
import { IUserProfile } from '@/types/user-profile';
import { EditProfile } from '.';

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
  http.put('/api/profile', async () => {
    return HttpResponse.json({
      message: 'User profile has been updated successfully',
    });
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

describe('EditProfile', () => {
  it('should render loading skeleton while profile data is being fetched', () => {
    const mockSetView = vi.fn();
    render(<EditProfile setView={mockSetView} />, {
      wrapper: createQueryClientWrapper({ queryClient: new QueryClient() }),
    });

    expect(screen.getByTestId('edit-profile-skeleton')).toBeInTheDocument();
  });

  it('should render correct form fields with pre-populated data', async () => {
    const mockSetView = vi.fn();
    render(<EditProfile setView={mockSetView} />);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /update profile/i })
      ).toBeInTheDocument();

      expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue(
        userProfile.name
      );
      expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
        userProfile.email
      );
      expect(screen.getByRole('textbox', { name: /bio/i })).toHaveValue(
        userProfile.bio
      );
      expect(screen.getByRole('link', { name: /cancel/i })).toBeInTheDocument();

      expect(
        screen.queryByTestId('edit-profile-skeleton')
      ).not.toBeInTheDocument();
    });
  });

  it('should allow to cancel updating user profile', async () => {
    const mockSetView = vi.fn();
    render(<EditProfile setView={mockSetView} />, {
      wrapper: createQueryClientWrapper({ queryClient: new QueryClient() }),
    });

    userEvent.click(await screen.findByRole('link', { name: /cancel/i }));

    await waitFor(() =>
      expect(mockSetView).toHaveBeenCalledWith(View.ProfileDetails)
    );
  });

  it('should disable Save button initially', async () => {
    const mockSetView = vi.fn();
    render(<EditProfile setView={mockSetView} />, {
      wrapper: createQueryClientWrapper({ queryClient: new QueryClient() }),
    });

    expect(await screen.findByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('should allow to update user profile', async () => {
    const mockSetView = vi.fn();
    render(<EditProfile setView={mockSetView} />, {
      wrapper: createQueryClientWrapper({ queryClient: new QueryClient() }), // had to create new queryClient in order to solve caching issues
    });

    const bioField = await screen.findByRole('textbox', { name: /bio/i });

    userEvent.type(bioField, 'BioUpdate');

    const saveButton = screen.getByRole('button', { name: 'Save' });

    await waitFor(() => expect(saveButton).toBeEnabled());

    userEvent.click(saveButton);

    await waitFor(() => {
      expect(
        screen.getByText('Your profile has been updated.')
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Go to profile page' })
      ).toBeInTheDocument();
    });
  });

  it('should allow to go to user profile details page after profile has been updated', async () => {
    const mockSetView = vi.fn();
    render(<EditProfile setView={mockSetView} />, {
      wrapper: createQueryClientWrapper({ queryClient: new QueryClient() }),
    });

    const bioField = await screen.findByRole('textbox', { name: /bio/i });

    userEvent.type(bioField, 'UpdateBio');

    const saveButton = screen.getByRole('button', { name: 'Save' });

    await waitFor(() => expect(saveButton).toBeEnabled());

    userEvent.click(saveButton);

    await waitFor(() => {
      const goToProfileButton = screen.getByRole('button', {
        name: 'Go to profile page',
      });

      expect(goToProfileButton).toBeInTheDocument();

      userEvent.click(goToProfileButton);

      expect(mockSetView).toHaveBeenCalledWith(View.ProfileDetails);
    });
  });

  it('should validate name and email fields correctly', async () => {
    const mockSetView = vi.fn();
    render(<EditProfile setView={mockSetView} />, {
      wrapper: createQueryClientWrapper({ queryClient: new QueryClient() }),
    });

    const nameField = await screen.findByRole('textbox', { name: /name/i });
    const emailField = await screen.findByRole('textbox', { name: /email/i });

    expect(screen.queryByText('Please provide a name.')).not.toBeVisible();
    expect(
      screen.queryByText('Please provide a valid email address.')
    ).not.toBeVisible();

    userEvent.clear(nameField);
    userEvent.clear(emailField);

    await waitFor(() => {
      expect(screen.getByText('Please provide a name.')).toBeVisible();
      expect(
        screen.getByText('Please provide a valid email address.')
      ).toBeVisible();
    });
  });
});
