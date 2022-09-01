const express = require('express');
const bodyParser = require('body-parser');

const { getGames } = require('./api/controllers/getGames');
const { addGame } = require('./api/controllers/addGame');
const { findGames } = require('./api/controllers/findGames');
const { updateGame } = require('./api/controllers/updateGame');
const { deleteGame } = require('./api/controllers/deleteGame');
const { populateGames, populateGamesMiddlewares } = require('./api/controllers/populateGames');

const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/static`));

app.get('/api/games', getGames)
app.post('/api/games', addGame)
app.post('/api/games/search', findGames)
app.delete('/api/games/:id', deleteGame);
app.put('/api/games/:id', updateGame);
app.get('/api/games/populate', populateGamesMiddlewares, populateGames)

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

module.exports = app;
