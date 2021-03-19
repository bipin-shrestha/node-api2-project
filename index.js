// require your server and launch it here
const server = require('./api/server');

server.listen(443, () => {
    console.log('\n *** Server Running on http://localhost:3000 *** \n');
});