const express = require('express');
const connectDB = require('./config/db');
const apiUserRoute = require('./routes/users');
const apiProfileRoute = require('./routes/profile');
const apiPostsRoute = require('./routes/posts');
const apiAuthRoute = require('./routes/auth');
const path = require('path');
const publicPath = path.join(__dirname, 'client', 'build');

const app = express();

// connect database
connectDB();

// init middleware

app.use(express.json({ extended: false }));

//Define Routes

app.use(apiUserRoute);
app.use(apiProfileRoute);
app.use(apiPostsRoute);
app.use(apiAuthRoute);

// Serve static assets in production

if (process.env.NODE_ENV === 'production') {
  // set that static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is up on ${PORT}`));
