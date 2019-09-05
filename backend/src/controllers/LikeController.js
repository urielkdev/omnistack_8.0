const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    console.log("tst", req.io, req.connectedUsers);
    console.log("");
    // user that clicked in the like button
    const { user } = req.headers;
    console.log("tst", user);
    // user that receive the like
    const { devId } = req.params;
    console.log("tst", devId);

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      console.log("asdasdasdasdasda");
      return res.status(400).json({ error: "Dev not exists" });
    }

    // se o target ja tiver dado like no usuario logado, deu match
    if (targetDev.likes.includes(loggedDev._id)) {
      const loggedSocket = req.connectedUsers[user];
      const targetSocket = req.connectedUsers[devId];

      if (loggedSocket) {
        console.log("loggedSocket", loggedSocket, "targetDev", targetDev)
        req.io.to(loggedSocket).emit('match', targetDev);
      }
      
      if (targetSocket) {
        console.log("targetSocket", targetSocket, loggedDev)
        req.io.to(targetSocket).emit('match', loggedDev);
      }
    }

    // bota o id do target no usuario que deu like (usuario que ta logado)
    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};