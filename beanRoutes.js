const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    console.log("POST /bean");

});

router.put("/:id", async (req, res) => {
    console.log("PUT /bean/:id");
});

router.get("/new", async (req, res) => {
    console.log("GET /bean/new");
    res.render("create", {});
});

router.get("/:id", async (req, res) => {
    console.log("GET /bean/:id");
});

router.post("/vote/:rating", async (req, res) => {
    console.log("POST /bean/vote/:rating");
});

router.post("/comments", async (req, res) => {
    console.log("GET /bean/comments");
});

router.delete("/:id", async (req, res) => {
    console.log("DELETE /bean/:id");
});

router.post("/search", async (req, res) => {
    console.log("POST /bean/search");
    res.send("search");
});

module.exports = router;
