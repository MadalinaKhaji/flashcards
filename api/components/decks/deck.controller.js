const deckService = require('./deck.service');

const createDeck = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is empty' });
  }

  if (!req.body.name) {
    return res.status(400).json({ message: 'Deck name is required' });
  }

  if (!req.body.subject) {
    return res.status(400).json({ message: 'Subject is required' });
  }

  if (!req.body.userId) {
    return res.status(400).json({ message: 'User Id is required' });
  }

  deckService
    .createDeck(req.body)
    .then((results) => {
      return res.status(201).json({ message: 'Deck created succesfully', data: results });
    })
    .catch((error) => {
      console.log(error);
    });
};

const getDeckById = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Deck id is required' });
  }

  deckService
    .getDeckById(req.params.id)
    .then((results) => {
      if (!results) {
        return res.status(404).json({ message: 'Deck not found' });
      }
      return res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getDecksByUserId = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'User id is required' });
  }

  deckService
    .getDecksByUserId(req.params.id)
    .then((results) => {
      if (!results) {
        return res.status(404).json({ message: 'Decks not found' });
      }
      return res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateDeckById = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is empty' });
  }

  if (!req.body.name) {
    return res.status(400).json({ message: 'Deck name is required' });
  }

  if (!req.body.subject) {
    return res.status(400).json({ message: 'Subject is required' });
  }

  deckService
    .updateDeckById(req.body)
    .then((results) => {
      if (!results) {
        return res.status(500).json({
          message: 'Failed to update deck',
        });
      }

      return res.status(200).json({
        message: 'Deck updated succesfully',
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteDeckById = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Deck id is required' });
  }

  deckService
    .deleteDeckById(req.params.id)
    .then((results) => {
      return res.status(200).json({ message: 'Deck deleted succesfully' });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  createDeck: createDeck,
  getDeckById: getDeckById,
  getDecksByUserId: getDecksByUserId,
  updateDeckById: updateDeckById,
  deleteDeckById: deleteDeckById,
};
