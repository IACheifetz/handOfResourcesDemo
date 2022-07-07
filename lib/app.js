const express = require('express');
const path = require('path');
const app = express();


// Built in middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// App routes
app.use('/api/v1/jobs', require('./controllers/jobs'));
app.use('/api/v1/swords', require('./controllers/swords'));
app.use('/api/v1/helmets', require('./controllers/helmets'));
app.use('/api/v1/filaments', require('./controllers/filaments'));
app.use('/api/v1/instruments', require('./controllers/instruments'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
