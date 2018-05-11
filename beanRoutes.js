const express = require("express");
const router = express.Router();
const auth = require('./middleware');
const { beans } = require('./data');

const upload = require('multer')({
  dest: 'public/images/'
});

router.post("/", auth, upload.single('image'), async (req, res) => {
  const { name, description } = req.body;
  try {
    console.log(req.file);
    const bean = await beans.addBean(req.session.user, name, description, `/images/${req.file.filename}`);
    res.redirect(`/bean/${bean._id}`);
  } catch (e) {
    res.render('create', {
      error: e,
      name,
      description
    })
  }
});

router.post("/search", async (req, res) => {
  const { searchTerm } = req.body;
  console.log(`searchTerm: ${searchTerm}`);
  try {
    res.render('beans', {
      beans: await beans.searchBeans(searchTerm)
    });
  }
  catch (e) {
    res.render('beans', {
      error: e
    })
    console.log(e);
  }
});

router.post("/comment", auth, async (req, res) => {
  const {comment, rating, _id} = req.body;
  const user = req.session.user;
  try{
    const bean = await beans.getBeanById(_id);
    await beans.addComment(_id, bean.title, user, comment, rating);
    res.redirect('/bean/' + _id)
  }catch(e){
    console.log(e);
  }
});

router.post("/:id", auth, async (req, res) => {
  const { _id, title, description } = req.body;
  try {
    await beans.updateBean(_id, req.session.user, title, description);
    res.redirect(`/bean/${_id}`);
  } catch (e) {
    const bean = await beans.getBeanById(_id);
    res.render('viewbean', {
      bean,
      editable: bean.creatorId === req.session.user,
      error: e
    });
  }
});

router.get("/new", auth, async (req, res) => {
  res.render("create");
});

router.get("/:id", async (req, res) => {
  try {
    const bean = await beans.getBeanById(req.params.id);
    res.render('viewbean', {
      bean,
      editable: bean.creatorId === req.session.user
    });
  } catch (e) {
    res.redirect('/');
  }
});

router.post("/vote/:rating", auth, async (req, res) => {
  console.log("POST /bean/vote/:rating");
});

router.get("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    if ((await beans.getBeanById(id)).creatorId !== req.session.user)
      throw 'only the creator can delete the bean';
    await beans.removeBean(id);
    res.redirect('/');
  } catch (e) {
    const bean = await beans.getBeanById(id);
    res.render('viewbean', {
      bean,
      editable: bean.creatorId === req.session.user,
      error: e
    });
  }
});

module.exports = router;
