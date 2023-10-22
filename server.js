import express from "express";
import req from "express/lib/request";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";

// app config
const app = express()
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());

// DB config
const connection_url = 'mongodb+srv://admin:ABvk@17182149@cluster0.cb49gax.mongodb.net/whatsappdb?retryWrites=true&w=majority';

mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// API routes
app.get('/', (req,res) => res.status(200).send('hello world'));

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.listen(port, () => console.log(`Listening on localhost:${port}`));
