const db = require('../../models');
const { Op } = require('sequelize');

const findGames = async (req, res) => {
  const { name, platform } = req.body
  try {
    const query = {}
    if (!!platform && platform !== 'all') {
      query.platform = platform
    }
    if (!!name) {
      query.name = {
        [Op.substring]: name,
      }
    }
    const games = await db.Game.findAll({
      where: query,
    })
    
    return res.send(games)
  } catch (err) {
    console.error('There was an error searching a game', err);
    return res.status(400).send(err);
  }
}

module.exports = { findGames }