import express from "express";

const app = express()
const port = process.env.PORT || 9000;

// API routes
app.get('/', (req,res) => res.status(200).send('hello world'));

app.listen(port, () => console.log(`Listening on localhost:${port}`));
