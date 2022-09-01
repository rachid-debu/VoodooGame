const express = require('express');
const bodyParser = require('body-parser');

const { getGames } = require('./api/games/getGames');
const { addGame } = require('./api/games/addGame');
const { findGames } = require('./api/games/findGames');
const { updateGame } = require('./api/games/updateGame');
const { deleteGame } = require('./api/games/deleteGame');

const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/static`));

app.get('/api/games', getGames)
app.post('/api/games', addGame)
app.post('/api/games/search', findGames)
app.delete('/api/games/:id', deleteGame);
app.put('/api/games/:id', updateGame);

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

module.exports = app;
