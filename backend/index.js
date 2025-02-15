const express = require("express")
const {createServer} = require('node:http')

const app = express();
const server = createServer(app);

app.get('/test', (req, res) => {
    res.send('<h1> Test works </h1>')
});

server.listen(8000, () => {
    console.log("Server is Running")
})