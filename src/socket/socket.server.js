const { Server } = require('socket.io');
const aiService = require('../service/ai.service')

function setUpSocketServer(httpServer) {
    const io = new Server(httpServer, {});

    io.on('connection', (socket) => {
        console.log("A user Connected");

        socket.on('ai-message', async (message) => {
            const result = await aiService.generateContent(message)

            socket.emit("ai-message-response", result)
        })

        socket.on('disconnect', () => {
            console.log("User disconnected")
        })
    })
}

module.exports = setUpSocketServer;
