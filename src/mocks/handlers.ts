import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/profile', async () => {
    await delay(1800);
    return HttpResponse.json({
      name: 'John',
      email: 'john.doe@havi.com',
      bio: 'In progress',
    });
  }),
];
