
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const socket = require('socket.io');
const helmet = require('helmet');


// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();


app.use(express.static(path.join(__dirname, '/client/build')));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
    req.io = io;
    next();
  });

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });

 app.use((req, res) => {
   res.status(404).json({message: '404 not found...'});
 })

 // connects our backend code with the database
// mongoose.connect('mongodbmongodb+srv://AdrianoXX:m@rian77=@cluster0.6d47y.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27017/NewWaveDB', {useNewUrlParser: true, useUnifiedTopology: true});  
 
const db = mongoose.connection;


const dbURI = (process.env.NODE_ENV === 'production' ? `mongodb+srv://${process.env.login}:${process.env.password}@cluster0.iegdp.gcp.mongodb.net/NewWaveDB?retryWrites=true&w=majority` : 'mongodb://localhost:27017/NewWaveDB');
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });    

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

 const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000 ; o');
  });

  const io = socket(server);
  
  io.on('connection', (socket) => {
    console.log('New socket !!!')
  });

  module.exports = server;