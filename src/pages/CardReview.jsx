import React, {useState} from 'react'
import '../css/cardReview.css'
import Card from '../components/Card'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/navigation';
import axios from 'axios';
import useFlashcardStorage from '../authStorage/flashcardStorage';
import userAuthStorage from '../authStorage/userStorage';
const CardReview = () => { 
  const flashcardStorage = useFlashcardStorage(state => state.flashcardStorage)
  const setFlashcardStorage = useFlashcardStorage(state => state.setFlashcardStorage)
  const [isInReviewSession, setIsInReviewSession] = useState(false)
  const userAuth = userAuthStorage(state => state.user)
  const startReviewSession = async () => {
    try {
      // Create a new session
      const session = await axios.post("http://localhost:3000/createNewSession")
      if (session.data.success) {
        // Map flashcards to session
        const myFlashcards = await axios.get(`http://localhost:3000/getFlashcards/${userAuth.user_id}`)
        setFlashcardStorage(myFlashcards.data.data)
        const session_id = session.data.data.session_id
        const result = await axios.post("http://localhost:3000/mapFlashcardsToSession", {
          session_id: session_id,
          flashcards: myFlashcards.data.data
        })
        if (result.data.success) {
          alert('Mapped flashcards to session successfully')
          setIsInReviewSession(true)
        }
        else {
          alert('Failed to map flashcards to session')
        }

      } else {
        alert('Create session fail')
      }

    } catch(error) {
      alert('Failed to create session')
    }
  }
  return (
    isInReviewSession ?
          <div className='cardReviewPageContainer'>
            {/* list of card goes here */}
            <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            style={{'width': '1300px'}}
            allowTouchMove={false}
          >
              {flashcardStorage.map((f, i) => <SwiperSlide key={i.toString()}>
                                                <Card frontSide={f.front_text} backSide={f.back_text}/>
                                              </SwiperSlide>)}
            </Swiper>
          </div>
                    :
          <div className='greetingPage'>
              <h1>Start Review Session</h1>
              <button className='startReviewBtn' onClick={startReviewSession}>
                <span>Start</span>
              </button>
          </div>
  )
}

export default CardReview
