const flashcardService = require('./flashcard.service');
const moment = require('moment');

const createFlashcard = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is empty' });
  }

  if (!req.body.formatType) {
    return res.status(400).json({ message: 'Format type is required' });
  }

  let insertFlashcardTypeQuery;
  let queryArgs;
  let placeholderId = null;

  if (req.body.front && req.body.back) {
    insertFlashcardTypeQuery = `INSERT INTO classic_flashcards(FlashcardId, Front, Back) VALUES(?,?,?)`;

    queryArgs = [placeholderId, req.body.front, req.body.back];
  } else if (req.body.context && req.body.blank) {
    insertFlashcardTypeQuery = `INSERT INTO fill_in_the_blank_flashcards(FlashcardId, Context, Blank) VALUES(?,?,?)`;

    queryArgs = [placeholderId, req.body.context, req.body.blank];
  } else {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  flashcardService
    .createFlashcard(req.body, insertFlashcardTypeQuery, queryArgs)
    .then((results) => {
      return res.status(201).send(results);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: 'Error occurred' });
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
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is empty' });
  }

  if (!req.body.formatType) {
    return res.status(400).json({ message: 'Format type is required' });
  }

  // if (req.body.difficulty && req.body.lastStudyDate) {
  //   req.body.studyInterval = determineStudyInterval(req.body.difficulty, req.body.lastStudyDate);
  // }

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

const determineStudyInterval = (difficulty, lastStudyDate) => {
  let studyInterval = 0;

  if (difficulty === 5) {
    studyInterval = 13;
  }
  if (difficulty === 4) {
    studyInterval = 8;
  }
  if (difficulty === 3) {
    studyInterval = 5;
  }
  if (difficulty === 2) {
    studyInterval = 3;
  }
  if (difficulty === 1) {
    studyInterval = 2;
  }
  if (difficulty === 0) {
    studyInterval = 1;
  }
  return studyInterval;
};

const fibonacci = (n) => {
  return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
};

module.exports = {
  createFlashcard: createFlashcard,
  getFlashcardById: getFlashcardById,
  getFlashcardsByUserId: getFlashcardsByUserId,
  getFlashcardsByDeckId: getFlashcardsByDeckId,
  updateFlashcardById: updateFlashcardById,
  deleteFlashcardById: deleteFlashcardById,
};
