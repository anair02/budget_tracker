import AuthPage from './pages/AuthPage'
import Decks from './pages/Decks';
import HomePage from './pages/HomePage'
import Settings from './pages/Settings';
import Flashcards from './pages/Flashcards';
import CardReview from './pages/CardReview';
import CreateDeck from './pages/CreateDeck';
import CreateFlashcard from './pages/CreateFlashcard';
import EditCardBackBody from './pages/EditCardBackBody';
import EditCardTitle from './pages/EditCardTitle';
import EditCardFrontBody from './pages/EditCardFrontBody';
import EditDeckTitle from './pages/EditDeckTitle';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import userAuthStorage from './authStorage/userStorage';
function App() {
  const authUser = userAuthStorage(state => state.user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={!authUser ? <AuthPage/> : <Navigate to={`/${authUser.user_id}`}/>}/>
        <Route path='/:id' element={<HomePage/>}>
          <Route index element={<Decks/>} />
          <Route path='flashcards' element={<Flashcards/>}/>
          <Route path='cardReview' element={<CardReview/>}/>
          <Route path='setting' element={<Settings/>}/>
          <Route path='createDeck' element={<CreateDeck/>}/>
          <Route path='createFlashcard' element={<CreateFlashcard/>}/>
          <Route path='editcardbackbody' element={<EditCardBackBody/>}/>
          <Route path='editcardfrontbody' element={<EditCardFrontBody/>}/>
          <Route path='editcardtitle' element={<EditCardTitle/>}/>
          <Route path='editdecktitle' element={<EditDeckTitle/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
