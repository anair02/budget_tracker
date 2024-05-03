import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../css/editCard.css'
import axios from 'axios'
import userAuthStorage from '../authStorage/userStorage'
import useDeckStorage from '../authStorage/deckStorage'
const EditDeckTitle = () => {
  const userAuth = userAuthStorage(state => state.user)
  const navigate = useNavigate()
  const location = useLocation()
  const {deckId} = location.state
  const decks = useDeckStorage(state => state.deckStorage)
  const currentDeck = decks.filter((d) => d.deck_id === deckId)
  console.log(currentDeck)
  const [newName, setNewName] = useState(currentDeck[0].deck_name) 
  const updateDeckStorage = useDeckStorage(state => state.updateDeck)
  const handleUpdateDeck = async () => {
    try {
      const result = await axios.put('http://localhost:3000/updateDeck', {
        deck_id: deckId, 
        user_id: userAuth.user_id, 
        name: newName.toLowerCase()
      })
      if (result.data.success) {
        const updatedDeck = await axios.get(`http://localhost:3000/getDeck/${userAuth.user_id}/${newName.toLowerCase()}`)
        updateDeckStorage(updatedDeck.data.data.deck_id, updatedDeck.data.data.deck_name)
        alert('Updated successfully')
      }
      else {
        alert('Failed to update. The name has been taken')
      }
    } catch(error) {
      alert('Failed to update')
    }
  }
  return (
    <div className='editCardContainer'>
      <h2>Edit Deck Title</h2>
      <div className='editCardContentContainer'>
        <div className='card_container'>
          <div className='cardShape'>
            <div className='card_frontBody'>
                  <h2>{currentDeck[0].deck_name}</h2>
            </div>
          </div>
        </div>
        <div className='editCardFormContainer'>
          <div className='editCardForm'>
            <div>
                <label for="editDeckTitleInput" >Enter deck's title:</label>
                <input type="text"  id="editDeckTitleInput" value={newName} onChange={e => setNewName(e.target.value)} />
            </div>
            <div className='editFlashCardButtonContainer'>
                <button onClick={() => navigate('/home')}>
                  Cancel
                </button>
                <button onClick={handleUpdateDeck}>
                    Update
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditDeckTitle