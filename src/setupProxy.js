const modelsExport = require("./modelData/models");
const models = modelsExport.default || modelsExport;

module.exports = function (app) {
  app.get("/test/info", (req, res) => {
    res.json(models.schemaInfo());
  });

  app.get("/user/list", (req, res) => {
    res.json(models.userListModel());
  });

  app.get("/user/:id", (req, res) => {
    const id = req.params.id;
    const user = models.userModel(id);
    if (!user) {
      res.status(400).send("User with _id:" + id + " not found.");
      return;
    }
    res.json(user);
  });

  app.get("/photosOfUser/:id", (req, res) => {
    const id = req.params.id;
    const photos = models.photoOfUserModel(id);
    if (!photos) {
      res.status(400).send("Photos for user with _id:" + id + " not found.");
      return;
    }
    res.json(photos);
  });
};

