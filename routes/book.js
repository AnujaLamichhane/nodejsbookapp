var express = require('express')
var router = express.Router()
var books = require('../resources/book')
const Book = require('../models/book.model')

router.get('/',async  function(req, res) {
  const books = await Book.find({})
  res.render('book', { title: 'bookapp',bookList: books });
});

/*router.get('/',function(req,res){
   res.render ('book',{title:'book app title',bookList: books})*/
//})
router.get('/add',function(req,res){
    res.render ('addbook',{title:'Addbook'})
})
// router.post('/save', function(req, res, ){
//     Book.push({
//      ...req.body,
//      _id:`00${Book.length+1}`
//     })
//     res.redirect("/book");
// })
router.post('/save',async function(req,res,next){
  try{
  const book=await Book.create(req.body)
  res.status(200).redirect('/book')
  } catch (error){
    res.status(500).json({ message: error.message})
  }


   
    })
   

/*router.get("/edit/:_id", function (req, res, next) {
  console.log(req.params._id);
  const book = book.find((book) => book._id === req.params._id);
  res.render("editBooks", { title: "Edit Books", book });
});*/
router.get("/edit/:_id", async function (req, res, next) {
  try{
  const book = await Book.findById(req.params._id)
  
  
  res.render("editbook", { title: "Edit Books", book });
  } catch (error){
    res.status(500).json({ message: error.message})
  }

})


// router.post("/saveEdited/:_id", function (req, res, next) {
//   const currIndex = books.findIndex((book) => req.params._id === book._id);
//   books.splice(currIndex, 1, { ...req.body, _id: req.params._id });
//   res.redirect("/book");
// });
router.post('/saveEdited/:_id', async function(req, res, next){
  const book = await Book.findByIdAndUpdate(req.params._id, req.body)
  if (!book) {
    return res.status(404).json({message: "Error updating book"})
  }
  res.redirect('/book')
 })

// router.get("/delete/:_id", function (req, res) {
//   const index= books.findIndex((book) => req.params._id === book._id);
//   if (index!== -1) {
  
  
//   books.splice(index, 1);
//   }
//   res.redirect("/book");
//   }
// );

router.get("/delete/:_id",async function (req, res) {
  const index= books.findIndex((book) => req.params._id === book._id);
  if (index!== -1) {
  
  
  books.splice(index, 1);
  }
  res.redirect("/book");
  }
);


module.exports= router