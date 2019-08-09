const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      console.log("asdasdasdasdasda");
      return res.status(400).json({ error: "Dev not exists" });
    }

    // se o target ja tiver dado like no usuario logado, deu match
    if (targetDev.likes.includes(user)) {
      console.log("DEU MATCH");
    }

    // bota o id do target no usuario que deu like (usuario que ta logado)
    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};