import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const API = setupServer(
  rest.get('/api/notes/', (req, res, ctx) => res(
    ctx.json([
      { id: 13, content: 'my note' },
      { id: 15, content: 'my note 2' },
    ]),
  )),
);
beforeAll(() => API.listen());
afterEach(() => API.resetHandlers());
afterAll(() => API.close());

export { API, rest };
