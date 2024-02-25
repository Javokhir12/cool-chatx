import { delay, http, HttpResponse } from 'msw';
import { IUserProfile } from '@/types/user-profile';

let db: IUserProfile = {
  avatar:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  bio: 'Senior Product Manager at Havi. Passionate about creating exceptional digital experiences. In my free time, I enjoy hiking and experimenting with new recipes.',
  email: 'olivia.davis@havi.com',
  name: 'Olivia Davis',
};

export const handlers = [
  http.get('/api/profile', async () => {
    await delay(1500);
    return HttpResponse.json<IUserProfile>(db);
  }),
  http.put('/api/profile', async ({ request }) => {
    await delay(1500);

    const body = (await request.json()) as Omit<IUserProfile, 'avatar'>;
    db = { ...db, ...body };

    return HttpResponse.json({
      message: 'User profile has been updated successfully',
    });
  }),
];
