const express = require("express");
const router = express.Router();
const auth = require('./middleware');
const { beans } = require('./data');

router.post("/", auth, async (req, res) => {
  const { name, description } = req.body;
  const bean = await beans.addBean(req.session.user, name, description);
  res.redirect(`/bean/${bean._id}`);
});

router.put("/:id", auth, async (req, res) => {
  const { _id, creatorId, title, description } = req.body;
  try {
    await beans.updateBean(_id, creatorId, title, description);
    res.redirect(`/bean/${_id}`);
  } catch (e) {
    res.render('viewbean', {
      bean: await beans.getBeanById(_id),
      error: e
    });
  }
});

router.get("/new", auth, async (req, res) => {
  console.log("GET /bean/new");
  res.render("create");
});

router.get("/:id", async (req, res) => {
  console.log("GET /bean/:id");
});

router.post("/vote/:rating", auth, async (req, res) => {
  console.log("POST /bean/vote/:rating");
});

router.post("/comments", auth, async (req, res) => {
  console.log("POST /bean/comments");
});

router.delete("/:id", auth, async (req, res) => {
  console.log("DELETE /bean/:id");
});

router.post("/search", async (req, res) => {
  console.log("POST /bean/search");
  res.send("search");
});

module.exports = router;
