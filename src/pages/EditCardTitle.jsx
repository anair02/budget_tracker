import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/editCard.css'
const EditCardTitle = ({cardTitle}) => {
  const navigate = useNavigate()
  return (
    <div className='editCardContainer'>
      <h2>Edit Card Title</h2>
      <div className='editCardContentContainer'>
        <div className='card_container'>
          <div className='cardShape'>
            <div className='card_frontBody'>
                  <h2>Card Title</h2>
            </div>
          </div>
        </div>
        <div className='editCardFormContainer'>
          <form>
            <div>
                <label for="editCardTitleInput" >Enter flashcard's title:</label>
                <input type="text"  name="editCardTitleSide" id="editCardTitleInput" required=""/>
            </div>
            <div className='editFlashCardButtonContainer'>
                <button onClick={() => navigate('/home/flashcards')}>
                  Cancel
                </button>
                <button>
                    Update
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditCardTitle