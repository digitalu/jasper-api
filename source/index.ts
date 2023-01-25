import express from 'express';
import { handler, initBridge, method, httpError, StatusCode, apply, onError } from 'bridge';
import formidable from 'formidable';
import z from 'zod';

const app = express();

const authMid = handler({
  headers: z.object({ token: z.string() }),
  resolve: ({ headers }) => {
    if (headers.token === 'secret') return { userName: 'Jaaaas' };

    return httpError(StatusCode.UNAUTHORIZED, 'Token wrong', { whatver: 78 });
  },
});

const helloWorld = handler({
  file: 'any',
  middlewares: apply(authMid),
  resolve: ({ headers, mid, file }) => {
    return file;
  },
});

const routes = {
  hello: helloWorld,
  ah: {
    hey: helloWorld,
  },
};

const errorHandler = onError(({ error, path }) => {
  console.log(path, error);
});

app.use('/', initBridge({ routes, errorHandler, formidable }).expressMiddleware());

app.post('/user', (req, res) => {});

app.listen(8080, () => {
  console.log('Listening on 8080');
});
