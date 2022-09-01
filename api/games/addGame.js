const db = require('./models');

export const addGame = async (req, res) => {
    const { publisherId, name, platform, storeId, bundleId, appVersion, isPublished } = req.body;
    try {
      const game = await db.Game.create({ publisherId, name, platform, storeId, bundleId, appVersion, isPublished })
      return res.send(game)
    } catch (err) {
      console.error('***There was an error creating a game', err);
      return res.status(400).send(err);
    }
  }