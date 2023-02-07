import { initBridge, handler, httpError, StatusCode, apply } from 'bridge';
import express from 'express';
import z from 'zod';

const port = 8080;

// It is also possible to use pure HTTP Server
const app = express();
// app.use(bodyParser.json());

const authMid = handler({
  headers: z.object({ token: z.string() }),
  middlewares: [] as const,
  resolve: ({ headers }) => {
    if (headers.token === 'secretToken') return { _id: 'dfdf' };
    return httpError(StatusCode.UNAUTHORIZED, 'Wrong Token');
  },
});

const test = handler({
  resolve: () => 'Salut toi' as const,
});

const routes = {
  user: handler({
    middlewares: apply(authMid),
    resolve: ({ middlewares }) => middlewares._id,
  }),
  auth: authMid,
  test,
};

app.use('/bridge', initBridge({ routes }).expressMiddleware());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
