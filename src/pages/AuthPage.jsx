import React, {useState} from 'react'
import '../css/authPage.css'
import EdusparkIcon from '../assets/edusparkIcon.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import userAuthStorage from '../authStorage/userStorage';
const AuthPage = () => {
	const [loginUsername, setLoginUsername] = useState('')
	const [loginPassword, setLoginPassword] = useState('')
	const [signupUsername, setSignupUsername] = useState('')
	const [signupPassword, setSignupPassword] = useState('')
	const [signupConfirmPassword, setSignupConfirmPassword] = useState('')
	const login = userAuthStorage(state => state.login)
	const navigate = useNavigate()
	const onSubmitLogin = async () => {
		try {
			if (!loginUsername || !loginPassword ) {
				alert("Required fields can't be empty")
				return
			}
      const response = await axios.post('http://localhost:3000/login', {
      	username: loginUsername,
				password: loginPassword
      });
			console.log(response)
			if (response.data.success) {
				const id = response.data.data.user_id
				const userData = response.data.data
				localStorage.setItem('user', JSON.stringify(userData))
				login(userData)
				navigate(`/${id}`)
				alert('Login Succesfully')
			}
			else {
				alert('Login failed. Account might have not been created')
			}
    } catch (error) {
      console.error('Error posting data:', error);
    } finally {
			setLoginUsername('')
			setLoginPassword('')
		}
	}
	const onSubmitRegister = async () => {
		if (!signupUsername || !signupConfirmPassword || !signupPassword ) {
			alert("Required fields can't be empty")
			return
		}
		if (signupConfirmPassword !== signupPassword) {
			alert("Confirm password doesn't match with password")
			return
		}
		try {
      const response = await axios.post('http://localhost:3000/register', {
        username: signupUsername,
				password: signupPassword
      });
			if (response.data.success) {
				alert('User is registerd successfully')
			}
			else {
				alert('Register failed. Account might already exist')
			}
    } catch (error) {
      console.error('Error posting data:', error);
    } finally {
			setSignupUsername('')
			setSignupPassword('')
			setSignupConfirmPassword('')
		}
	}
  return (
	<div className='authContainer'>
		<h1>Welcome to Eduspark!</h1>
    <div className="authFormContainer"> 
			<div className="appIconContainer">
				<img src={EdusparkIcon} alt='eduspark icon'/> 	
			</div>
		  <input type="checkbox" id="chk" aria-hidden="true"/>
			<div className="loginFormContainer">
				<div className="authForm">
				<label className="authFormLabel">Login</label>
					<input className="formInput" type="text" placeholder="Username"  value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
					<input className="formInput" type="password"  placeholder="Password"  value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
					<button className='authFormButton' onClick={onSubmitLogin}>Log in</button>
				</div>
			</div>

      <div className="registerFormContainer">
				<div className="authForm">
					<label for="chk" aria-hidden="true" className="authFormLabel">Register</label>
					<input className="formInput" type="text" name="username" placeholder="Username" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)}/>
					<input className="formInput" type="password" name="password" placeholder="Password"  onChange={(e) => setSignupPassword(e.target.value)} value={signupPassword}/>
					<input className="formInput" type="password" name="confirmPassword" placeholder="Confirm Password"  value={signupConfirmPassword} onChange={(e) => setSignupConfirmPassword(e.target.value)}/>
					<button className="authFormButton" onClick={onSubmitRegister}>Register</button>
				</div>
			</div>
	</div>
</div>
  )
}

export default AuthPage