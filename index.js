const app = require('express')()
const http = require('http')
const {Server} = require('socket.io')

const server = http.createServer(app)
const io = new Server(server)

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
})


io.on('connection', function(socket){

	socket.broadcast.emit('other user connected', {
		id: socket.id,
		otherNickname: socket.handshake.query.nickname
	})

	socket.on('disconnect', function(){
		socket.broadcast.emit('other user disconnected', {
			id: socket.id,
			otherNickname: socket.handshake.query.nickname
		})
	})

	socket.on('chat message', function(msg){
		io.emit('chat message', msg)
	})
})

server.listen(3000, function(){
	console.log('listening on *:3000')
})