const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');

const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 5000;
const wsPort = process.env.WSPORT || 5005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const redisClient = redis.createClient({
  port      : 6379,               // replace with your port
  host      : 'redis',        // replace with your hostanme or IP address
});

app.get('/api/:uuid', (req, res) => {
  const {uuid} = req.params;
  console.log(`GET: ${uuid}`);
  redisClient.HGETALL(uuid, (err, arr) => {
    if (err) {
      console.error(err);
    }

    console.log(arr);
    res.json(arr || []);
  });
});

app.post('/api/:uuid/:name/:value', (req, res) => {
  const {uuid, name, value} = req.params;
  console.log(`POST: ${uuid} - ${name} - ${value}`);
  redisClient.HSET(uuid, name, value, (err, arr) => {
    if (err) {
      console.error(err);
    } else {
      redisClient.HGETALL(uuid, (err, arr) => {
        if (err) {
          console.error(err);
        }
    
        console.log(arr);
        res.json(arr || []);
      });
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

const wsServer = new WebSocket.Server({port: wsPort});

function getPlayers(gameId, cb) {
  redisClient.HGETALL(gameId, (err, val) => {
    if (err) {
      console.error(err);
    }
    console.log(typeof(val));
    console.log(val);

    const retval =  Object.keys(val).map(key => {return {name: key, selection: val[key]}});
    cb(retval);
  })
}

function addPlayer(gameId, name, cb) {
  redisClient.HSET(gameId, name, -1, (err, arr) => {
    if (err) {
      console.error(err);
    } else {
      getPlayers(gameId, cb);
    }
  });
}

// Setup a map of gameId to sockets.
const gameClientMap = new Map();

wsServer.on('connection', (socketClient, request) => {
  console.log('connected');
  console.log('client Set length: ', wsServer.clients.size);
  
  // Ensure we keep this client in a set with other clients for the same game.
  const gameUrl = request.url;
  if (!gameClientMap.has(gameUrl)) {
    gameClientMap.set(gameUrl, new Set());
  }

  gameClientMap.get(gameUrl).add(socketClient);

  // Message handler
  socketClient.on('message', (message) => {
    console.log(message);
    try {
      const {stage, gameId, player, selection} = JSON.parse(message);
      console.log(`Received input: ${gameId} - ${stage} - ${player} - ${selection}`);

      switch(stage) {
        case "query":
          getPlayers(gameId, (players) => {
            const gameState = {
              players: players
            };
            const payload = JSON.stringify(gameState);
            socketClient.send(payload);
          });
          break;
        case "intro":
          addPlayer(gameId, player, (players) => {
            const gameState = {
              players: players,
              screen: "lobby"
            };

            const payload = JSON.stringify(gameState);
            socketClient.send(payload);

            // Announce the new player to the game.
            const socketSet = gameClientMap.get(gameUrl);
            socketSet.forEach(client => {
              client.send(payload);
            });
          });
          break;
        case "lobby":
          if (selection === "start-round") {
            // Broadcast the new screen to the players.
            const socketSet = gameClientMap.get(gameUrl);
            const gameState = {
              screen: "select"
            };
            const payload = JSON.stringify(gameState);
            socketSet.forEach(client => {
              client.send(payload);
            });
          }
          break
      }
    } catch (e) {
      // We may want to close the socket as well.
      console.error(e);
    }
  });

  socketClient.on('close', (socketClient) => {
    gameClientMap.get(gameUrl).delete(socketClient);
    if (gameClientMap.size == 0) {
      gameClientMap.delete(gameUrl);
    }
    console.log('closed');
    console.log('Number of clients: ', wsServer.clients.size);
  });
});
