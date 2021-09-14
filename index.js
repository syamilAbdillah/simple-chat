const app = require('express')()
const http = require('http')
const {Server} = require('socket.io')

const server = http.createServer(app)
const io = new Server(server)

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){
	console.log('a user connected')
	socket.on('chat message', function(msg){
		io.emit('chat message', msg)
	})
})

server.listen(3000, function(){
	console.log('listening on *:3000')
})