import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
const app = express()
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 4000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // option1 Allow all origin with default of cors
app.use(cors())

// // option2 Allow custom origin
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['Content-type']
//     })
// );

// route
app.get('/', (req,res)=>{
    // console.log(req);
    res.send('Hello Anjay!!')
})


import { Book } from './models/bookModel.js';

// add book
app.post('/books/create',async(req,res)=>{
    try {
        const {title,author,publishYear} = req.body;
        // console.log(req.body);

        if(!title || !author || !publishYear){
            return res.status(400).send({message: `All fields are required`})
        }
        
        const newBook = {
            title,
            author,
            publishYear
        }

        await Book.create(newBook);
        return res.status(201).send({message: `Successfully created new book`})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({Message: error.message})
    }
})

app.get('/getAllBooks', async(req,res)=>{
    try {
        const books = await Book.find({});

        return res.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({Message: error.message})
    }
})

// get single book detail
app.get('/getBook/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({Message: error.message})
    }
})


// findandupdate
app.put('/update/:id',async(req,res)=>{
    try {
        const {title,author,publishYear} = req.body;

        if(!title || !author || !publishYear){
            return res.status(400).send({message: `All fields are required`})
        }
        
        const {id} = req.params
        const result = await Book.findByIdAndUpdate(id,req.body)
        console.log(result);

        if(!result){
            return res.status(201).send({message: `Book not found`})
        }
        return res.status(200).send({message: 'Book has been successfully updated'})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({Message: error.message})
    }
})

// delete book
app.delete('/delete/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const result = await Book.findByIdAndDelete(id)

        if(!result){
            return res.status(201).send({message: `Book not found`})
        }

        return res.status(200).send({message: 'Book is deleted'})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({Message: error.message})
    }
})

// server
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log(`Connected!`);
    app.listen(PORT, ()=>{
        console.log(`App is running on port ${PORT}`);
    })    
}).catch((err) => {
    console.log(err);
});
