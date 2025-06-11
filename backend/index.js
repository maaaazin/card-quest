const express = require("express")
const {createServer} = require('node:http')

const app = express();
const server = createServer(app);
const port = 3000;

app.get('/test', (req, res) => {
    res.send('<h1> Test works </h1>')
});

server.listen({port}, () => {
    console.log("Server is Running on port :", port)
})