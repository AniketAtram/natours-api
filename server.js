const app = require('./app');

PORT = '3000';
HOST_NAME = '127.0.0.1';

app.listen(PORT, HOST_NAME, () => { console.log(`Server started at http://${HOST_NAME}:${PORT}`) });