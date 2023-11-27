import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const { name = 'user' } = req.query;
  res.send(`Hello ${name as string}!`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use(
  '/bettings',
  createProxyMiddleware({
    target: 'http://localhost:8080/', //should be changed to the digital ocean url for service
    changeOrigin: true,
    pathRewrite: {
      [`^/bettings`]: '',
    },
  }),
);

app.use(
  '/users',
  createProxyMiddleware({
    target: 'http://localhost:8080/', //should be changed to to digital ocean url for service
    changeOrigin: true,
    pathRewrite: {
      [`^/users`]: '',
    },
  }),
);