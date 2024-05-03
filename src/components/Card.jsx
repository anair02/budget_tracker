import React, {useState} from 'react'
import '../css/card.css'
const Card = ({frontSide, backSide}) => {
  const [isOnFront, setIsOnFront] = useState(true)
  return (
    <div className='cardContainer'>
      {isOnFront ?
        <div className='frontCardContainer'>
          <h1>{frontSide}</h1>
        </div>
                :
        <div className='backCardContainer'>
          <div>
            <h1>{backSide}</h1>
          </div>
        </div>
      }
      {!isOnFront && <div className='trueFalseContainer'>
                        <h3>Is your guess correct ?</h3>
                        <label className="rocker rocker_small">
                            <input type="checkbox"/>
                            <span className="switch_left">Yes</span>
                            <span className="switch_right">No</span>
                        </label>
                     </div>}
      <div className='switchBtnContainer'>
        <button className={isOnFront ? 'switchsidebuttonclicked' : 'switchsidebuttonnotclicked'} onClick={() => setIsOnFront(true)}>Front</button>
        <button className={!isOnFront ? 'switchsidebuttonclicked' : 'switchsidebuttonnotclicked'} onClick={() => setIsOnFront(false)}>Back</button>
      </div>


    </div>
  )
}

export default Card