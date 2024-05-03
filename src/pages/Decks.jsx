import React, {useEffect} from 'react'
import DeckRow from '../components/DeckRow'
import '../css/decks.css'
import AddIcon from '../assets/addIcon.png'
import { useNavigate } from 'react-router-dom'
import useDeckStorage from '../authStorage/deckStorage'
import axios from 'axios'
import userAuthStorage from '../authStorage/userStorage';
const Decks = () => {
  const deckStorage = useDeckStorage(state => state.deckStorage)
  const populateDeck = useDeckStorage(state => state.setDeck)
  const userAuth = userAuthStorage(state => state.user)
  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const myDecks = await axios.get(`http://localhost:3000/getDecks/${userAuth.user_id}`)
				populateDeck(myDecks.data.data)
      } catch(error) {
        console.log(error.message)
      } 
    }
    fetchDecks()
  },[populateDeck])
  const navigate = useNavigate()
  return (
    <div className={'decksPageContainer'}>
    <h2>Decks</h2>
    {/* Deck table */}
    <div className='decksContainer'>
      {/* Table Header */}
      <DeckRow deckId={'Deck ID'} deckName={'Deck Name'} isHeader/>
      {/* Mockup flashcards for testing*/}
      {deckStorage && deckStorage.map((deck, i) => <DeckRow deckId={deck.deck_id} deckName={deck.deck_name} key={i.toString()}/>)}
    </div>
    <button className="addDeckBtn" onClick={() => navigate('/home/createDeck')}>
      <img src={AddIcon} style={{'width': '30px', 'height': '30px'}}/>
    </button>

  </div>
  )
}

export default Decks