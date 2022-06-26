const { request } = require("express");
const express = require("express");
const router = express.Router();
const articles = require("../models/articlesSchema");

router.get("/", (req, res) => {
  res.send("testing route");
});

// Router Path to post data to the server
router.post("/article", async (request, response) => {
  const { title, author, category, article, copyright, image } = request.body;

  if (!title || !author || !category || !article || !copyright || !image) {
    return response.status(404).json({
      status: 404,
      message: "Bad POST Parameters."
    });
  }
  try {
    const addarticle = new articles({
      title,
      author,
      category,
      article,
      copyright,
      image,
    });
    await addarticle.save();
    return response.status(201).json({
      status: 201,
      message: "Added Article."
    });
  } catch (error) {
    return response.status(404).json({
      status: 404,
      message: "Error in server right now."
    });
  }
});


// Router path to get data from the sevrer
router.get("/extract", async (request, response) => {
  try{
    const articlesdata = await articles.find();
    return response.status(201).json({
      status: 201,
      data: articlesdata
    });
  }
  catch(error){
    return response.status(404).json({
      status: 404,
      data: "Error in fetching data."
    });
  }
})

// Router path to delete article from database
router.get("/delete/:id", async (request, response) => {
  const { id } = request.params;
  try{
    await articles.deleteOne({ _id: id })
    return response.status(201).json({
      status: 201,
      data: "Deleted."
    });
  }catch(error){
    console.log(error)
    return response.status(404).json({
      status: 404,
      data: "Error in deleting data."
    });
  }
})

// Router path to get article from database
router.get('/get/:id', async (request, response) => {
  const { id } = request.params;

  try{
    const article = await articles.findById({_id : id})
    return response.status(201).json({
      status: 201,
      data: article
    });
  }catch(error){
    return response.status(404).json({
      status: 404,
      data: "Error in fetching article."
    });
  }
})


module.exports = router;
