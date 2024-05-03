import React, {useState} from 'react'
import '../css/settings.css'
import userAuthStorage from '../authStorage/userStorage'
import axios from 'axios'
const Settings = () => {
  const userAuth = userAuthStorage(state => state.user)
  const [username, setUsername] = useState(userAuth.username)
  const [password, setPassword] = useState(userAuth.password)
  const update = userAuthStorage(state => state.update)
  const updateHandle = async () => {
    try {
      if (!username && !password) {
        alert('Please enter the new value in either username or password fields')
        return
      }
      const result = await axios.put('http://localhost:3000/updateUser', {
        username: username,
        password: password,
        id: userAuth.user_id
      })
      if (result.data.success) {
        const newUser = await axios.get(`http://localhost:3000/getUser/${userAuth.user_id}`)
        if (newUser.data.success) {
          update(newUser.data.data)
          alert('User is updated successfully')
        } else {
          console.log("Couldn't get user by id")
        }
      }
      else {
        alert('Account not found')
      }

    } catch(error) {
      console.log(error)
    }
    finally {
      setUsername('')
      setPassword('')
    }
  }
  return (
    <div className={'settingsPageContaienr'}>
      <h2>
        Settings
      </h2>
      <div className='settingsContentContainer'>
        <div className='updateForm'>
          <div>
            <label for="username" >New Username</label>
            <input type="text"  id="username" value={username} onChange={e => setUsername(e.target.value)}/>
            <label for="password" class="label">New Password</label>
            <input type="password"  id="password" onChange={e => setPassword(e.target.value)} value={password}/>
          </div>
          <div className='buttonContainer'>
            <button onClick={updateHandle}>
                Update
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Settings