import { render, screen } from '@/__tests__/test-utils';
import App from '@/App';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { IUserProfile } from '@/types/user-profile';

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
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
});

describe('App', () => {
  it('should render correctly', async () => {
    render(<App />);

    expect(await screen.findByText('My Profile')).toBeInTheDocument();
    expect(await screen.findByText(userProfile.name)).toBeInTheDocument();
    expect(screen.getByText(userProfile.email)).toBeInTheDocument();
    expect(screen.getByText(userProfile.bio)).toBeInTheDocument();
  });
});
