
module.exports = (app) => {
    // socket io
    const http = require('http').Server(app);
    const io = require('socket.io')(http, {
        cors: {
            origin: "*",
            credentials: true
        }
    });

    // recieve io messages
    io.on('connection', (socket) => {
        console.log(`<!> Someone just ask to connect <!> : ${socket}`);
    });
      
    http.listen(process.env.IO_PORT, () => {
        console.log(`Server [socket-io] is running on port ${process.env.IO_PORT}`)
    });
};