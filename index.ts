import express from 'express';
const app = express();

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.get('/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
