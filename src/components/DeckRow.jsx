import React, {useState} from 'react'
import '../css/decks.css'
import { useNavigate } from 'react-router-dom'
const DeckRow = ({deckId, deckName, isHeader}) => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className='deckRowContainer'>
      {/* Deck Id */}
      <div>
        <p style={{'color': '#828282', 'fontSize': '1.2rem', 'fontWeight': '600'}}>{deckId}</p>
      </div>

      {/* Deck Name */}
      <div>
        <p style={{'color': '#000000', 'fontSize': '1.2rem', 'fontWeight': '600'}}>{deckName}</p>
      </div>

      {/* Created Date */}
      <div>
        <p style={{'color': '#000000', 'fontSize': '1.2rem', 'fontWeight': '600'}}></p>
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
                        <button onClick={() => navigate('/home/editdecktitle', { state: { deckId, deckName } })}>
                          Edit Title
                        </button>
                    </div>
        }
      </div>
    </div>
  )
}

export default DeckRow