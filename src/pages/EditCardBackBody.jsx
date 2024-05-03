import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../css/editCard.css'
import axios from 'axios'
import useFlashcardStorage from '../authStorage/flashcardStorage'
const EditCardBackBody = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [newBack, setNewBack] = useState('')
  const updateFlashCard = useFlashcardStorage(state => state.updateFlashcardBackPage)
  const {backCard, cardId} = location.state
  const handleUpdateBackBody = async () => {
    try {
      if (!newBack) {
        alert('Missing required field')
        return
      }
      const result = await axios.put('http://localhost:3000/updateFlashcard', {
        card_id: cardId,
        front_text: "", 
        back_text: newBack
      })
      if (result.data.success) {
        const updatedFlashcard = await axios.get(`http://localhost:3000/getFlashcard/${cardId}`)
        if (updatedFlashcard.data?.data) {
          updateFlashCard(cardId,updatedFlashcard.data?.data.back_text)
          alert('Update back page successfully')
          return
        } 
        alert('Something wrong')
      }
      else {
        alert('Update back body fail')
      }
    } catch(error) {
      alert('Failed to update back body')
    } finally {
      setNewBack('')
    }
  }
  return (
    <div className='editCardContainer'>
      <h2>Edit Back Body</h2>
      <div className='editCardContentContainer'>
        <div className='card_container'>
          <div className='cardShape'>
            <div className='card_backBody'>
                <div>
                  <h2>{backCard}</h2>
                </div>
            </div>
          </div>
        </div>
        <div className='editCardFormContainer'>
          <div>
            <div>
                <label for="editBackSideInput" >Enter flashcard's backside:</label>
                <input type="text" id="editBackSideInput" value={newBack} onChange={e => setNewBack(e.target.value) }/>
            </div>
            <div className='editFlashCardButtonContainer'>
                <button onClick={() => navigate('/home/flashcards')}>
                  Cancel
                </button>
                <button onClick={handleUpdateBackBody}>
                    Update
                </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default EditCardBackBody