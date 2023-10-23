import express from "express";
import req from "express/lib/request";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";

// app config
const app = express()
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1693243",
  key: "e0240fc6d04ca0fa9821",
  secret: "27bd1bfe44766b17d003",
  cluster: "ap2",
  useTLS: true
});

// middleware
app.use(express.json());

// DB config
const connection_url = 'mongodb+srv://admin:31123449@cluster0.cb49gax.mongodb.net/whatsappdb?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open', () => {
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log(change);
    })
});

// API routes
app.get('/', (req,res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

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
