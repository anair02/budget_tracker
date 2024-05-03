import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { findAllUsers, createNewUser, findUserByUsername, findUserById, findUserByUsernameAndPassword, initializeDBConnection, updateUser, createDeck, findDeckByID, updateDeck,findDeckByNameAndID, findFlashcardByCardID, findFlashcardByUserID, createFlashcard, updateFlashcard, deleteFlashcard, createNewSession, mapFlashcardToSession, findSessionBasedOnSessionID, updateFlashcardTimeStamp } from './database/databaseOp.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))

initializeDBConnection()
// Define routes

// Get user by user id 
app.get('/getUser/:id', async (req, res) => {
  const {id} = req.params
  try {
    const result = await findUserById(id)
    if (Object.keys(result).length > 0) {
      res.status(200).json({success: true, data: result})
    } else {
      res.status(200).json({success: false, data: result})
    }
  }
  catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
})

// Login route
app.post('/login', async (req, res) => {
  const {username, password} = req.body
  try {
    const result = await findUserByUsernameAndPassword(username, password)
    if (Object.keys(result).length > 0) {
      res.status(200).json({success: true, data: result})
    } else {
      res.status(200).json({success: false, data: result})
    }
  } catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
});

// Register route
app.post('/register', async (req, res) => {
  const {username, password} = req.body
  try {
    const result = await createNewUser(username, password)
    if (Object.keys(result).length > 0) {
      res.status(200).json({success: true, data: result})
      return
    }
    res.status(200).json({success: false, data: result})
  } catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
})

//Update user route
app.put('/updateUser', async (req, res) => {
  const {id, username, password} = req.body
  try {
    const result = await updateUser(id, username, password)
    if (Object.keys(result).length > 0) {
      res.status(200).json({success: true, data: result})
      return
    }
    res.status(200).json({success: false, data: result})
  } catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
})

//Create new deck route
app.post('/createDeck', async (req, res) => {
  const {id, deckName, deckDescription} = req.body
  try {
    const result = await createDeck(deckName, id, deckDescription)
    if (Object.keys(result).length > 0) {
      res.status(200).json({success: true, data:result})
      return
    }
    res.status(200).json({success: false, data:result})
  } 
  catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
})

// Get all decks based on user id
app.get('/getDecks/:id', async (req, res) => {
  const {id} = req.params
  try {
    const result = await findDeckByID(id)
    res.status(200).json({success: true, data: result})
  } catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
})

// update deck route
app.put('/updateDeck', async (req, res) => {
  try {
    const {deck_id, user_id, name} = req.body
    const result = await updateDeck(deck_id, user_id, name)
    if (Object.keys(result).length > 0) {
      res.status(200).json({success: true, data: result})
      return
    }
    res.status(200).json({success: false, data: result})

  } catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
})

// get deck based on user id and deck name
app.get('/getDeck/:id/:name', async (req, res) => {
  const {id, name} = req.params
  try {
    const result = await findDeckByNameAndID(name, id)
    res.status(200).json({success: true, data: result})
  } catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
})

// get all flashcards based on user id 
app.get('/getFlashcards/:id', async (req, res) => {
  const {id} = req.params
  try {
    const result = await findFlashcardByUserID(id)
    res.status(200).json({success: true, data: result})
  } catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
})

// create flashcard
app.post('/createFlashcard', async (req, res) => {
  const {user_id, deck_id, front_text, back_text} = req.body
  try {
    const result = await createFlashcard(user_id, deck_id, front_text, back_text)
    if (Object.keys(result).length > 0) {
      res.status(200).json({success: true, data:result})
      return
    }
    res.status(200).json({success: false, data:result})
  } 
  catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
})

// update flashcard route
app.put('/updateFlashcard', async (req, res) => {
  try {
    const {card_id, front_text, back_text} = req.body
    const result = await updateFlashcard(card_id, front_text, back_text)
    if (Object.keys(result).length > 0) {
      res.status(200).json({success: true, data: result})
      return
    }
    res.status(200).json({success: false, data: result})

  } catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
})

//update flashcard timestamp
app.put('/updateFlashcardTimeStamp', async (req, res) => {
  try {
    const {card_id, timestamp} = req.body
    const result = await updateFlashcardTimeStamp(card_id, timestamp)
    if (Object.keys(result).length > 0) {
      res.status(200).json({success: true, data: result})
      return
    }
    res.status(200).json({success: false, data: result})

  } catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
})

// get flashcard based on cardId
app.get('/getFlashcard/:cardId', async (req, res) => {
  const {cardId} = req.params
  try {
    const result = await findFlashcardByCardID(cardId)
    res.status(200).json({success: true, data: result})
  } catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
})

//delete flashcard
app.delete('/deleteFlashcard/:cardId', async (req, res) => {
  const {cardId} = req.params
  try {
    const result = await deleteFlashcard(cardId)
    res.status(200).json({success: true, data: result})
  } catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
})

//create new session
app.post('/createNewSession', async(req, res) => {
  try {
    const result = await createNewSession()
    res.status(200).json({success: true, data: result})
  } catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
})

// map flashcards to session 
app.post('/mapFlashcardsToSession', async (req, res) => {
  try {
    const {flashcards, session_id} = req.body
    const result = await mapFlashcardToSession(flashcards, session_id)
    res.status(200).json({success: true, data: result})
  } catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
})

app.get('/getSessions', async (req, res) => {
  try {
    const result = await findSessionBasedOnSessionID(1)
    res.status(200).json({success: true, result})
  } catch(error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: "An error occurred while processing your request." });
  }
})




// Start the server
app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
