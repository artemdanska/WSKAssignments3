import express from 'express';

const app = express();
const port = 3000;
const hostname = '127.0.0.1';

app.use(express.json());

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.get('/api/v1/cat', (req, res) => {
  const cat = {
    cat_id: 1,
    name: 'Kissa',
    birthdate: '2021-05-01',
    weight: 4.2,
    owner: 'Meitsi',
    image: 'https://loremflickr.com/320/240/cat',
  };
  res.json(cat);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
