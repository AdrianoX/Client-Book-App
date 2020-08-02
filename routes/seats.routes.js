const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db');

router.route('/seats').get((req, res) => { res.json(db.seats) });

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.filter(item => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const {day, seat, client, email} = req.body;

  const data = {
    id: uuidv4(),
    day: day,
    seat: seat,
    client: client,
    email: email,
    message: 'OK'
  }
  res.json(data);
});

router.route('/seats/:id').put((req, res) => {
  const {day, seat, client, email} = req.body;

  res.json(db.seats.map( item => item.id == id &&
    {...item,
      day: day,
      seat: seat,
      client: client,
      email: email,
      message: 'OK'
    })
  );
});

router.route('/seats/:id').delete((req, res) => {
   res.json(db.seats.filter( item => item.id !== req.params.id) && {message: 'OK'});
});

module.exports = router; 