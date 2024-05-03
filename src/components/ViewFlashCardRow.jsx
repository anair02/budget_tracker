import React, {useState} from 'react'
import '../css/viewFlashCard.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useFlashcardStorage from '../authStorage/flashcardStorage'
const ViewFlashCardRow = ({cardId, cardName, createdDate, isHeader, deckID, backCard}) => {
  const navigate = useNavigate()
  const removeFlashcard = useFlashcardStorage(state => state.removeFlashcard)
  const date = new Date(createdDate);
  // Use toLocaleDateString to format the date in the desired format
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  const [showMenu, setShowMenu] = useState(false)
  const handleDeleteFlashcard = async () => {
    try {
      const result = await axios.delete(`http://localhost:3000/deleteFlashcard/${cardId}`)
      if (result.data.success) {
        removeFlashcard(cardId)
        alert('Deleted flashcard successfully')
      }
    } catch(error) {
      alert('Failed to delete flashcard')
    }
  }
  return (
    <div className='flashcardRowContainer'>
      {/* Card Id */}
      <div>
        <p style={{'color': '#828282', 'fontSize': '1.2rem', 'fontWeight': '600'}}>{cardId}</p>
      </div>

      {/* Card Name */}
      <div>
        <p style={{'color': '#000000', 'fontSize': '1.2rem', 'fontWeight': '600'}}>{cardName}</p>
      </div>

      {/* Created Date */}
      <div>
        <p style={{'color': '#000000', 'fontSize': '1.2rem', 'fontWeight': '600'}}>{isHeader ? createdDate : formattedDate}</p>
      </div>

      {/* Date */}
      <div>
        <p style={{'color': '#000000', 'fontSize': '1.2rem', 'fontWeight': '600'}}></p>
      </div>

      {/* Owner */}
      <div>
        <p style={{'color': '#000000', 'fontSize': '1.2rem', 'fontWeight': '600'}}>{deckID}</p>
      </div>

      {/* Three dot */}
      <div>
      {!isHeader && 
          <div className="threeDotContainer" > 
              <div className='threeDot' onClick={() => setShowMenu(prev => !prev)}>
                <span/>
                <span/>
                <span/>
              </div>
          </div>
        }
        {showMenu && 
                    <div className="popupMenu">
                        <button onClick={handleDeleteFlashcard}>
                          Delete Flashcard
                        </button>
                        <button onClick={() => navigate('/home/editcardfrontbody', {state: {frontCard: cardName, cardId: cardId }})}>
                          Edit Front Body
                        </button>
                        <button onClick={() => navigate('/home/editcardbackbody', {state: {backCard: backCard, cardId: cardId }})}>
                          Edit Back Body
                        </button>
                    </div>
        }
      </div>
    </div>
  )
}

export default ViewFlashCardRow