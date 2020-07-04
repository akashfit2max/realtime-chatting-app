const express = require('express')
const app = express() //calling express
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000   //port on which server is running 3000 is by default 

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
//  express middleware
app.use(express.static(__dirname + '/public')) // access css and all extra files

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html') //do everything writte in index file
})

// Socket 
const io = require('socket.io')(http) //created server http

io.on('connection', (socket) => {
    console.log('Connected...')  
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})