book = require("../models/book")
User = require("../models/user")
copy = require('../models/bookCopy')
var getAllBooks = async(req, res) => {
    try {
        const books = await book.find();
        res.render("book_list", { books: books, title: "Books | Library" ,error: false});
    } catch (error) {
        res.render("book_list", { books: [], title: "Books | Library", error : true });
    }
}

var getBook = async(req, res) => {
    try {
        const books = await book.findById(req.params.id);
        res.render("book_detail", {
            book: books,
            num_available: books.available_copies,
            title: `Books | ${books.title}`,
            message: ''
        });
    } catch (error) {
        console.log(error)
        res.redirect("/books");
    }
}




var getLoanedBooks = async(req, res) => {

    try{
        var user = await User.findById(req.user._id)
        user = user.loaned_books
        var books = []
        for(let index=0;index<user.length; index++) {
            i = user[index]
            Copy = await copy.findById(i)
            temp = await book.findById(Copy.book)
            books.push({_id: i,borrow_date: Copy.borrow_data, book: temp})
        }
        res.render('loaned_books',{books : books, title: 'Loaned Books'})
    } catch(error){
        console.log(error)
        res.redirect("/")
    }
    //TODO: access the books loaned for this user and render loaned books page
}

var returnBook = async(req,res) => {
    await copy.deleteOne({'_id':req.body.cid})
    var user = await User.findById(req.user._id)
    user.loaned_books = user.loaned_books.filter(id => id.toString() !== req.body.cid)
    await user.save()
    var books =  user.loaned_books
    res.render('loaned_books',{books : books, title: 'Loaned Books'})
}

var issueBook = async(req, res) => {
    try{
        var books = await book.findById(req.body.bid);
        if(books.available_copies <= 0){
           return res.render("book_detail", {
                book: books,
                num_available: books.available_copies,
                title: `Books | ${books.title}`,
                message: 'There are no sufficient book copies'
            });
        }

         book.updateOne({'_id': req.body.bid},{ $set: {available_copies : books.available_copies-1}}
         ,function(err, res) {
            if (err) throw err;
          })

          var copy_id; 
          await new copy({
              book: req.body.bid,status:true,borrower: req.user._id
          }).save().then(data => copy_id = data._id)

          const user = await User.findById(req.user._id);
          const loaned = user.loaned_books
          loaned.push(copy_id);
          User.updateOne({'_id': req.user._id},{ $set: {loaned_books : loaned}}
         ,function(err, res) {
            if (err) throw err;
          })
          books = await book.findById(req.body.bid);
          return res.render("book_detail", {
            book: books,
            num_available: books.available_copies,
            title: `Books | ${books.title}`,
            message: 'Successfully loaned the book'
        });

    }catch(error){
        console.log(error)
        res.redirect(`/book/${req.body.bid}`)
    }
    
    // TODO: Extract necessary book details from request
    // return with appropriate status
    // Optionally redirect to page or display on same
}

var searchBooks = async(req, res) => {
    console.log(req.body)
    try{
        books = await book.find({
            'title':{
                '$regex': req.body.title,
                '$options': 'i'
            },
            'author':{
                '$regex': req.body.author,
                '$options': 'i'
            } ,
            'genre': {
                '$regex': req.body.genre,
                '$options': 'i'
            }
        })
        res.render("book_list" ,{title: 'Searched Books',book:books,error:false})
    } catch(error){
        res.redirect("/books")
    }
    // TODO: extract search details
    // query book model on these details
    // render page with the above details
}


module.exports = {
    getAllBooks,
    getBook,
    getLoanedBooks,
    issueBook,
    searchBooks,
    returnBook,
}
