import React, {useState} from 'react'
import '../css/createflashcard.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import userAuthStorage from '../authStorage/userStorage'
import useFlashcardStorage from '../authStorage/flashcardStorage'
const CreateFlashcard = () => {
  const navigate = useNavigate()
  const [deckName, setDeckName] = useState('')
  const [flashcardFrontSide, setFlashcardFrontSide] = useState('')
  const [flashcardBackSide, setFlashcardBackSide] = useState('')
  const userAuth = userAuthStorage(state => state.user)
  const addToFlashcardStorage = useFlashcardStorage(state => state.setFlashcardStorage)
  const flashcardStorage = useFlashcardStorage(state => state.flashcardStorage)
  const createFlashcardHandle = async () => {
    if (!flashcardFrontSide || !flashcardBackSide || !deckName) {
      alert('Missing required fields')
      return
    }
    try {
      const deck = await axios.get(`http://localhost:3000/getDeck/${userAuth.user_id}/${deckName.toLowerCase()}`)
      if (!deck.data.data?.deck_id) {
        alert('Deck not found')
        return
      }
      const result = await axios.post('http://localhost:3000/createFlashcard', {
        user_id: userAuth.user_id, 
        deck_id: deck.data.data.deck_id, 
        front_text: flashcardFrontSide, 
        back_text: flashcardBackSide
      })
      if (result.data.success) {
        addToFlashcardStorage([...flashcardStorage, result.data.data])
        alert('Create flashcard successfully')
        return
      }
      alert('Create flashcard fail')
    } catch(error) {
      alert('Failed to create flashcard')
    } finally {
      setFlashcardBackSide('')
      setFlashcardFrontSide('')
      setDeckName('')
    }
  }

  return (
    <div className='createFlashcardContainer'>
      <h2>Create new flashcard</h2> 
      <div className='createFlashcardContentContainer'>
        <div className='createFlashcardForm'>
          <div>
            <label for="flashcarddeckname" >Enter deck name:</label>
            <input type="text" id="flashcarddeckname" value={deckName} onChange={e => setDeckName(e.target.value)} />
            <label for="frontside" >Enter flashcard's frontside:</label>
            <input type="text" id="frontside" value={flashcardFrontSide} onChange={e => setFlashcardFrontSide(e.target.value)}/>
            <label for="backside" >Enter flashcard's backside:</label>
            <input type="text" id="backside" value={flashcardBackSide} onChange={e => setFlashcardBackSide(e.target.value)} />
          </div>
          <div className='createFlashcardButtonContainer '>
            <button onClick={() => navigate('/home/flashcards')}>
              Cancel
            </button>
            <button onClick={createFlashcardHandle}>
                Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateFlashcard