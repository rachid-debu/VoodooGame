const db = require('./models');

export const getGames = async (req, res) => {
    try {
      const games = await db.Game.findAll()
      return res.send(games)
    } catch (err) {
      console.error('There was an error querying games', err);
      return res.send(err);
    }
  }
