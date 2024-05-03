import React, {useState} from 'react'
import '../css/createdeck.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import userAuthStorage from '../authStorage/userStorage'
import useDeckStorage from '../authStorage/deckStorage'
const CreateDeck = () => {
  const [deckName, setDeckName] = useState('')
  const [deckDescription, setDeckDescription] = useState('')
  const navigate = useNavigate()
  const userAuth = userAuthStorage(state => state.user)
  const addToDeckStorage = useDeckStorage(state => state.setDeck)
  const deckStorage = useDeckStorage(state => state.deckStorage)
  const handleCreateDeck = async () => {
    if (!deckName) {
      alert("Please enter deck's name")
      return
    }
    try {
      const result = await axios.post('http://localhost:3000/createDeck', {
        id : userAuth.user_id, 
        deckName : deckName.toLowerCase(), 
        deckDescription: deckDescription
      })
      if (result.data.success) {
        alert('Deck is created successfully')
        addToDeckStorage([...deckStorage, result.data.data])
        return
      }
      alert('Cannot have duplicate deck')
    } catch(error) {
      alert('Failed to create deck')
    }
    finally {
      setDeckName('')
      setDeckDescription('')
    }
  }
  return (
    <div className='createDeckContainer'>
      <h2>Create new deck</h2>
      <div className='createDeckContentContainer'>
        <div className='createDeckForm'>
          <div>
            <label for="deckname" >Enter deck's name:</label>
            <input type="text"  id="deckname" value={deckName} onChange={e => setDeckName(e.target.value)} />
            <label for="deckDescription" >Enter deck's description:</label>
            <input type="text"   id="deckDescription" value={deckDescription} onChange={e => setDeckDescription(e.target.value)}/>
          </div>
          <div className='createDeckButtonContainer '>
            <button onClick={() => navigate('/home')}>
              Cancel
            </button>
            <button onClick={handleCreateDeck}>
                Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateDeck