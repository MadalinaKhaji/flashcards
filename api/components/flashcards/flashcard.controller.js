const flashcardService = require('./flashcard.service');

const createFlashcard = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is empty' });
  }

  if (!req.body.formatType) {
    return res.status(400).json({ message: 'Format type is required' });
  }

  flashcardService
    .createFlashcardUsingTransaction(req.body)
    .then((results) => {
      return res.status(201).json({ message: 'Flashcard created succesfully' });
    })
    .catch((error) => {
      console.log(error);
      return;
    });

  // Create flashcard without transaction
  //   flashcardService
  //     .createFlashcard(req.body)
  //     .then((results) => {
  //       let flashcardId = results.insertId;

  //       if (req.body.front && req.body.back) {
  //         flashcardService
  //           .createClassicFlashcard(flashcardId, req.body.front, req.body.back)
  //           .then((results) => {
  //             if (req.body.tags) {
  //               flashcardService
  //                 .createFlashcardTags(flashcardId, req.body.tags)
  //                 .then((results) => {
  //                   return res.status(201).json({ message: 'Flashcard created succesfully' });
  //                 })
  //                 .catch((error) => {
  //                   console.log(error);
  //                 });
  //             }
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //           });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
};

const getFlashcardsByDeckId = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Deck id is required' });
  }

  flashcardService
    .getFlashcardsByDeckId(req.params.id)
    .then((results) => {
      if (!results) {
        return res.status(404).json({ message: 'Flashcards not found' });
      }
      return res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getFlashcardsByUserId = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'User id is required' });
  }

  flashcardService.getFlashcardsByUserId(req.params.id).then((results) => {
    if (!results) {
      return res.status(404).json({ message: 'Flashcards not found' });
    }
    return res.status(200).send(results);
  });
};

const updateFlashcardById = (req, res) => {
  console.log(req.body);

  if (!req.body) {
    return res.status(400).json({ message: 'Request body is empty' });
  }

  if (!req.body.formatType) {
    return res.status(400).json({ message: 'Format type is required' });
  }

  flashcardService
    .updateFlashcardById(req.body)
    .then((results) => {
      if (!results) {
        return res.status(500).json({
          message: 'Failed to update flashcard',
        });
      }
      return res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getFlashcardById = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Flashcard id is required' });
  }

  flashcardService
    .getFlashcardById(req.params.id)
    .then((results) => {
      if (!results) {
        return res.status(404).json({ message: 'Flashcard not found' });
      }
      return res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteFlashcardById = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Flashcard id is required' });
  }

  flashcardService
    .deleteFlashcardById(req.params.id)
    .then((results) => {
      return res.status(200).json({ message: 'Flashcard deleted succesfully' });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  createFlashcard: createFlashcard,
  getFlashcardsByUserId: getFlashcardsByUserId,
  getFlashcardsByDeckId: getFlashcardsByDeckId,
  getFlashcardById: getFlashcardById,
  updateFlashcardById: updateFlashcardById,
  deleteFlashcardById: deleteFlashcardById,
};
