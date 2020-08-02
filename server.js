const express = require('express');
const path = require('path');
const app = express();


const db = {
    testimonials: [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
    { id: 3, author: 'Ore Oree', text: 'This company is ... 123' },
    { id: 4, author: 'Pole Ore', text: 'They really know how to make you sad.' },
    { id: 5, author: 'Siaba Daba', text: 'They really know how to make you happy AF.' },
    ],
  };


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
  });

//   app.get('/testimonials/:id', (req, res) => {
//     res.json(db.testimonials);
//   });

  app.get('/testimonials/:id', (req, res) => {
    res.json(db.testimonials.filter(item => item.id == req.params.id));
  });

  app.get('/testimonials/random', (req, res) => {
    res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
  });


  app.post('/testimonials', (req, res) => {
    const {author, text} = req.body;
  







app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  }); 