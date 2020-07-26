const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const client = redis.createClient({
  port      : 6379,               // replace with your port
  host      : 'redis',        // replace with your hostanme or IP address
});

app.get('/api/:uuid', (req, res) => {
  const uuid = req.params.uuid;
  client.HGETALL(uuid, (err, arr) => {
    if (err) {
      console.error(err);
    }

    console.log(arr);
    res.json(arr || []);
  });
});

app.post('/api/:uuid/:name/:value', (req, res) => {
  const {uuid, name, value} = req.params;
  client.HSET(uuid, name, value);
  client.HGETALL(uuid, (arr) => {
    console.log(arr);
    res.json(arr);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));