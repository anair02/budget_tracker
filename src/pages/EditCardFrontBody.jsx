import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../css/editCard.css'
import axios from 'axios'
import useFlashcardStorage from '../authStorage/flashcardStorage'
const EditCardFrontBody = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [newFront, setNewFront] = useState('')
  const updateFlashCard = useFlashcardStorage(state => state.updateFlashcardFrontPage)
  const flashcards = useFlashcardStorage(state => state.flashcardStorage)
  const {cardId} = location.state
  const currentFlashcard = flashcards.filter((f) => f.card_id === cardId)
  console.log(currentFlashcard)
  const handleUpdateFrontBody = async () => {
    try {
      if (!newFront) {
        alert('Missing required field')
        return
      }
      const result = await axios.put('http://localhost:3000/updateFlashcard', {
        card_id: cardId,
        front_text: newFront, 
        back_text: ""
      })
      if (result.data.success) {
        const updatedFlashcard = await axios.get(`http://localhost:3000/getFlashcard/${cardId}`)
        if (updatedFlashcard.data?.data) {
          updateFlashCard(cardId,updatedFlashcard.data?.data.front_text)
          alert('Update front page successfully')
          return
        } 
        alert('Something wrong')
      }
      else {
        alert('Update front body fail')
      }
    } catch(error) {
      alert('Failed to update front body')
    } finally {
      setNewFront('')
    }
  }
  return (
    <div className='editCardContainer'>
      <h2>Edit Front Body</h2>
      <div className='editCardContentContainer'>
        <div className='card_container'>
          <div className='cardShape'>
            <div className='card_frontBody'>
                  <h2>{currentFlashcard[0].front_text}</h2>
            </div>
          </div>
        </div>
        <div className='editCardFormContainer'>
          <div>
            <div>
                <label for="editFrontSideInput" >Enter flashcard's frontside:</label>
                <input type="text"  id="editFrontSideInput" value={newFront} onChange={e => setNewFront(e.target.value)}/>
            </div>
            <div className='editFlashCardButtonContainer'>
                <button onClick={() => navigate('/home/flashcards')}>
                  Cancel
                </button>
                <button onClick={handleUpdateFrontBody}>
                    Update
                </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default EditCardFrontBody