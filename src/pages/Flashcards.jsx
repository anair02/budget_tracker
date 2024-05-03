import React, {useEffect} from 'react'
import '../css/viewFlashCard.css'
import ViewFlashCardRow from '../components/ViewFlashCardRow'
import { useNavigate } from 'react-router-dom'
import useFlashcardStorage from '../authStorage/flashcardStorage'
import axios from 'axios'
import userAuthStorage from '../authStorage/userStorage';
const Flashcards = () => {
  const populateFlashcard = useFlashcardStorage(state => state.setFlashcardStorage)
  const userAuth = userAuthStorage(state => state.user)
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const myFlashcards = await axios.get(`http://localhost:3000/getFlashcards/${userAuth.user_id}`)
				populateFlashcard(myFlashcards.data.data)
      } catch(error) {
        console.log(error.message)
      } 
    }
    fetchFlashcards()
  },[populateFlashcard])
  // Convert SQL timestamp to a JavaScript Date object
  const navigate = useNavigate()
  const flashcards = useFlashcardStorage(state => state.flashcardStorage)
  return (
    <div className={'viewFlashCardContainer'}>
      <h2>View Flashcards</h2>
      {/* Flashcard table */}
      <div className='flashcardsContainer'>
        {/* Table Header */}
        <ViewFlashCardRow cardId={'Card Id'} cardName={'Card Name'} isHeader createdDate={'Created Date'} deckID={'Deck ID'}/>
        {flashcards.map((flashcard, i) => <ViewFlashCardRow cardId={flashcard.card_id} cardName={flashcard.front_text} deckID={flashcard.deck_id} key={i.toString()} backCard={flashcard.back_text} createdDate={flashcard.card_creation_date}/>)}
      </div>
      <button className='createFlashcardBtn' onClick={() => navigate('/home/createFlashcard')}>
        Create
      </button>
    </div>
  )
}

export default Flashcards