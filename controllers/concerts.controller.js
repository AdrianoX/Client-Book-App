const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Concert.find().populate('Seat'));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getId = async (req, res) => {

    try {
      const dep = await Concert.findById(req.params.id).populate('Seat');
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getPerformer = async (req, res) => {
    try {
      const concerts = await Concert.find({ performer: req.params.performer });
      if (!concerts.length) res.status(404).json({ message: 'Not found' });
      else res.json(concerts);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.getGenre = async (req, res) => {
    try {
      const concerts = await Concert.find({ genre: req.params.genre });
      if (!concerts.length) res.status(404).json({ message: 'Not found' });
      else res.json(concerts);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.getPrice = async (req, res) => {
    try {
      const concerts = await Concert.find({
        price: { $gte: req.params.price_min, $lte: req.params.price_max }
      });
      if (!concerts.length) res.status(404).json({ message: 'Not found' });
      else res.json(concerts);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.getDay = async (req, res) => {
    try {
      const concerts = await Concert.find({ day: req.params.day });
      if (!concerts.length) res.status(404).json({ message: 'Not found' });
      else res.json(concerts);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };

  exports.post = async (req, res) => {

    try {
  
      const { performer, genre, price, day, image } = req.body;
      const newConcert = new Concert({ performer, genre, price, day, image });
      await newConcert.save();
      res.json({ message: 'OK' });
      
    } catch(err) {
      res.status(500).json({ message: err });
    }
  
  };

  exports.putId = async (req, res) => {

    const { performer, genre, price, day, image } = req.body;

  try {
    const dep = await(Concert.findById(req.params.id));
    if(dep) {
        await Concert.updateOne({ _id: req.params.id }, { $set: { performer, genre, price, day, image }});
        res.json({ message: 'OK:' + dep });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deletedId = async (req, res) => {

    try {
      const dep = await(Concert.findById(req.params.id));
      if(dep) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK:' + dep });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
      catch(err) {
        res.status(500).json({ message: err });
      }
  };