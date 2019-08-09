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

    // bota o id do target no usuario que deu like (usuario que ta logado)
    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};