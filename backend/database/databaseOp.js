import mysql from 'mysql2';
const db = mysql.createConnection({
  host: 'edusparkdbinstance.cnsky8qa0161.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'admin123',
  database: ''
}).promise();

export const initializeDBConnection = async () => {
  try {
    await db.connect();
    await db.query("USE edusparkDB");
    console.log('Connected to database and selected database successfully');
  } catch (err) {
    console.error('Error connecting to database:', err.message);
  }
};

////////////////////////////////////////////////////////////////////////////
// user
////////////////////////////////////////////////////////////////////////////
export const findUserByUsernameAndPassword = async (username, password) => {
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  const [result] = await db.query(query, [username, password])
  return result.length > 0 ? result[0] : {}
};

export const findUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  const [result] = await db.query(query, [username])
  return result.length > 0 ? result[0] : {}
};

export const findUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE user_id = ?';
  const [result] = await db.query(query, [id])
  return result.length > 0 ? result[0] : {}
} 


export const findAllUsers = async () => {
  const query = 'SELECT * FROM users';
  const [results] = await db.query(query)
  return results
} 

export const createNewUser = async (username, password) => {
  const user = await findUserByUsername(username)
  if (Object.keys(user).length > 0) {
    return {}
  }
  const query = " insert into users (username, password)  values (?, ?) "
  const [result] = await db.query(query, [username, password])
  const id = result.insertId
  return findUserById(id)
}

export const updateUser = async (id, username, password) => {
  const user = await findUserById(id)
  if (Object.keys(user).length > 0) {
    const query = "update users set username = ?, password = ? where user_id = ? "
    const newUsername = !username ? user.username : username
    const newPassword = !password ? user.password : password  
    const [result] = await db.query(query, [newUsername, newPassword, id])
    return result
  }
  else {
    return {}
  }
}

////////////////////////////////////////////////////////////////////////////
// Decks
////////////////////////////////////////////////////////////////////////////
export const findDeckByNameAndID = async (name, id) => {
  const query = "select * from decks where deck_name = ? and user_id = ?"
  const [result] = await db.query(query, [name, id])
  return result.length > 0 ? result[0] : {}
};
export const createDeck = async (name, id, description) => {
  const deck = await findDeckByNameAndID(name, id)
  if (Object.keys(deck).length > 0) {
    return {}
  }
  const query = " insert into decks (deck_name, description, user_id) values (?, ?, ?)"
  const [result] = await db.query(query, [name, description, id])
  return findDeckByNameAndID(name, id)
}

// get all the decks based on user id
export const findDeckByID = async (id) => {
  const query = "select * from decks where user_id = ?"
  const [result] = await db.query(query, [id])
  return result
}

export const findDeckByDeckId = async (id) => {
  const query = 'SELECT * FROM decks WHERE deck_id = ?';
  const [result] = await db.query(query, [id])
  return result.length > 0 ? result[0] : {}
} 
 
export const updateDeck = async (deck_id, user_id, name) => {
  // check if new name duplicate
  const deck = await findDeckByNameAndID(name, user_id)
  if (Object.keys(deck).length > 0) {
    return {}
  }
  else {
    const query = "update decks set deck_name = ? where deck_id = ? and user_id = ?"
    const [result] = await db.query(query, [name, deck_id, user_id])
    return result
  }
}

////////////////////////////////////////////////////////////////////////////
// FLashcards
////////////////////////////////////////////////////////////////////////////
export const createFlashcard = async (user_id, deck_id, front_text, back_text) => {
  const query = " insert into flashcards (user_id, deck_id, front_text, back_text) values (?, ?, ?, ?)"
  const [result] = await db.query(query, [user_id, deck_id, front_text, back_text])
  const cardId = result.insertId
  return findFlashcardByCardID(cardId)
}

export const findFlashcardByUserID = async (user_id) => {
  const query = "select * from flashcards where user_id = ?"
  const [result] = await db.query(query, [user_id])
  return result
}

export const findFlashcardByCardID = async (card_id) => {
  const query = 'SELECT * FROM flashcards WHERE card_id = ?';
  const [result] = await db.query(query, [card_id])
  return result.length > 0 ? result[0] : {}
} 
 
export const updateFlashcard = async (card_id, front_text, back_text) => {
  // check if new name duplicate
  const flashcard = await findFlashcardByCardID(card_id)
  if (Object.keys(flashcard).length > 0) {
    const newFrontText = front_text ? front_text : flashcard.front_text
    const newBackText = back_text ? back_text : flashcard.back_text 
    const query = "update flashcards set front_text = ?, back_text = ? where card_id = ?"
    const [result] = await db.query(query, [newFrontText,newBackText,card_id])
    return result
  }
  return {}
}

export const updateFlashcardTimeStamp = async (card_id, timestamp) => {
  // check if new name duplicate
  const flashcard = await findFlashcardByCardID(card_id)
  if (Object.keys(flashcard).length > 0) {
    const query = "update flashcards set card_creation_date = ? where card_id = ?"
    const [result] = await db.query(query, [timestamp,card_id])
    return result
  }
  return {}
}

export const deleteFlashcard = async (card_id) => {
  const query = "Delete from flashcards where card_id = ?"
  const [result] = await db.query(query, [card_id])
  return result
}

////////////////////////////////////////////////////////////////////////////
// Sessions
////////////////////////////////////////////////////////////////////////////
export const createNewSession = async () => {
  const query = "INSERT INTO sessions (session_id, session_date) VALUES (DEFAULT, DEFAULT);"
  const [result] = await db.query(query)
  const session_id = result.insertId
  return findSessionBasedOnSessionID(session_id)
}

export const findSessionBasedOnSessionID = async (session_id) => {
  const query = 'SELECT * FROM sessions WHERE session_id = ?';
  const [result] = await db.query(query, [session_id])
  return result.length > 0 ? result[0] : {}
}
export const mapFlashcardToSession = async (flashcards, session_id) => {
  let query = "insert into session_reviews (session_id, card_id) values"
   // Map over the flashcards array to create a string for each set of values
  const valueStrings = flashcards.map(f => {
    // Assuming card_id is the identifier you want to insert, make sure to escape it properly
    return `(${session_id}, ${f.card_id})`;
  });
  // Combine the individual value strings into one, separated by commas
  query += valueStrings.join(',');
  // End the query with a semicolon
  query += ';';
  console.log(query)
  const [result] = await db.query(query);
  return result
}