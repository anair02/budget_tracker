import React, {useState} from 'react'
import '../css/sideBar.css'
import EdusparkIcon from '../assets/edusparkIcon.jpg'
import { GoHomeFill, GoContainer  } from "react-icons/go";
import { CgFileDocument } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import userAuthStorage from '../authStorage/userStorage';
import useDeckStorage from '../authStorage/deckStorage';
import useFlashcardStorage from '../authStorage/flashcardStorage';
const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const logout = userAuthStorage(state => state.logout)
  const userAuth = userAuthStorage(state => state.user)
  const setDeckStorage = useDeckStorage(state => state.setDeck)
  const setFlashcardStorage = useFlashcardStorage(state => state.setFlashcardStorage)
  const logoutHandle = () => {
    localStorage.removeItem('user')
    logout()
    setDeckStorage([])
    setFlashcardStorage([])
    navigate('/')
  }
  const navigateToPage = (path) => {
    const newURl = path === `/${userAuth.user_id}` ? 'Decks' 
    : path === `/${userAuth.user_id}/flashcards` ? 'Flashcards'
    : path === `/${userAuth.user_id}/cardReview` ? 'Card Review' 
    : path === `/${userAuth.user_id}/setting` ? 'Settings' : '';
    setSideBarState(newURl)
    navigate(path)
  }
  const currentUrl = location.pathname === `/${userAuth.user_id}` ? 'Decks' 
  : location.pathname === `/${userAuth.user_id}/flashcards` ? 'Flashcards'
  : location.pathname === `/${userAuth.user_id}/cardReview` ? 'Card Review' 
  : location.pathname === `/${userAuth.user_id}/setting` ? 'Settings' : '';
  const [sideBarState, setSideBarState] = useState(currentUrl)
  return (
    <div className="sideBarContainer">
      <div className='siderBarTitleIconContainer'>
         {/* app icon */}
         <img src={EdusparkIcon}  alt='eduspark icon'/>
         {/* title */}
         <h2>Eduspark</h2>
      </div>
      <div className='navButtonsContainer'>
          <div className='listOfNavButtons'>
            {/* Card Review nav btn */}
            <div onClick={() => navigateToPage(`/${userAuth.user_id}/cardReview`)} 
                  className={sideBarState == 'Card Review' ? 'navButton navButtonClicked' : 'navButton'}
                  >
              <GoHomeFill color={sideBarState == 'Card Review' ? '#0C7FDA' : '#5D7285'} size={25}/>
              <p>Card Review</p>
            </div>
            {/* Decks nav btn */}
            <div onClick={() => navigateToPage(`/${userAuth.user_id}`)}
                 className={sideBarState == 'Decks' ? 'navButton navButtonClicked' : 'navButton'}>
              <GoContainer color={sideBarState == 'Decks' ? '#0C7FDA' : '#5D7285'} size={25}/>
              <p>Decks</p>
            </div>
            {/* Flashcard nav btn */}
            <div onClick={() => navigateToPage(`/${userAuth.user_id}/flashcards`)}
                 className={sideBarState == 'Flashcards' ? 'navButton navButtonClicked' : 'navButton'}>
              <CgFileDocument  color={sideBarState == 'Flashcards' ? '#0C7FDA' : '#5D7285'} size={25}/>
              <p>Flashcards</p>
            </div>
            {/* Setting nav btn */}
            <div onClick={() => navigateToPage(`/${userAuth.user_id}/setting`)}
                 className={sideBarState == 'Settings' ? 'navButton navButtonClicked' : 'navButton'}>
              <IoMdSettings color={sideBarState == 'Settings' ? '#0C7FDA' : '#5D7285'} size={25}/>
              <p>Settings</p>
            </div>
          </div> 
          {/* logout button */}
          <button className='logoutBtn' onClick={logoutHandle}>Logout</button>
      </div>

    </div>
  )
}

export default Sidebar