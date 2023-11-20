// src/server.ts
import app from './app';

const port = 8080;

app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});
