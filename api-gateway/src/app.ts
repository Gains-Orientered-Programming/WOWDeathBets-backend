import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import swaggerDocs from './utils/swagger';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  const { name = 'user' } = req.query;
  res.send(`Hello ${name as string}!`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);

  swaggerDocs(app, port);
});

app.use(
  '/bettings',
  createProxyMiddleware({
    target: 'https://betting-service-993cf.ondigitalocean.app/', //should be changed to the digital ocean url for service
    changeOrigin: true,
    pathRewrite: {
      [`^/bettings`]: '',
    },
  }),
);

app.use(
  '/users',
  createProxyMiddleware({
    target: 'https://user-service-wgj5a.ondigitalocean.app/', //should be changed to to digital ocean url for service
    changeOrigin: true,
    pathRewrite: {
      [`^/users`]: '',
    },
  }),
);

// app.use(
//   '/tickets',
//   createProxyMiddleware({
//     target: 'http://localhost:8080/', //should be changed to to digital ocean url for service
//     changeOrigin: true,
//     pathRewrite: {
//       [`^/tickets`]: '',
//     },
//   }),
// );
