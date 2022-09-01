export const updateGame = async (req, res) => {
    // eslint-disable-next-line radix
    const id = parseInt(req.params.id);
    const { publisherId, name, platform, storeId, bundleId, appVersion, isPublished } = req.body;
    try {
      const game = await db.Game.findByPk(id)
      await game.update({ publisherId, name, platform, storeId, bundleId, appVersion, isPublished })
      return res.send(game)
    } catch (err) {
      console.error('***Error updating game', err);
      return res.status(400).send(err);
    }
  }