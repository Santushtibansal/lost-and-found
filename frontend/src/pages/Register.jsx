import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [fade, setFade] = useState(true); // Add a state for the fade effect
 const[message,setMessage]=useState('');
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('User Registered:', { username, email, password });

    const userData= {
        username:username,
        email:email,
        password:password
    };

    try{
        const response = await  fetch('http://localhost:5000/lostFound/register',
        {   method:'POST',
            headers:{
                'Content-type': 'application/json'
            },
        body:JSON.stringify(userData)
    });

    if(response.ok){
        const data = await response.json();
        console.log(data);
        
        setMessage ('data registration successfull');
        alert(message);
        setUsername('');
        setEmail('');
        setPassword('');
    }

    else{
        const errorData = await response.json();
        console.log(errorData);
        if(errorData.message.includes('Both')){
            alert(" username and email already taken");

        }
        else if(errorData.message.includes('Username')){
            alert("username already taken");

        }
        else if(errorData.message.includes('Email')){
            alert("Email already taken");
        }

    }
}
    catch(error){
        setMessage('an error occured during registration');
        alert(message);
    }

   
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    console.log('User Logged In:', { username,  password });

    const loginData = {
        username:username,
        password:password
    };
    try{
        const response = await fetch('http://localhost:5000/lostFound/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(loginData)

        });

        if(response.ok){
            const data = await response.json();
            localStorage.setItem('token', data.token);
            setMessage('login successfull');
            alert(message);
            setUsername('');
            setPassword('');
        }
        
        else{
           const errorData = await response.json();
            if(errorData.error==='invalid username entered'){
                setMessage(errorData.error);
                alert(message);
            }
            else if(errorData.error==='invalid password entered'){
                setMessage(errorData.error);
                alert(message);
            }
            else{
                setMessage('login failed');
            }

        }
    }
    catch(error){
        setMessage('login unsuccessfull please try again');
        alert(message);
    }
   
  };


  const toggleForm = () => {
    setFade(false); // Start fading out
    setTimeout(() => {
      setIsRegistering(!isRegistering);
      setFade(true); // Fade back in after the content has changed
    }, 800); // Match this duration with the CSS transition time
  };

  return (
    <div className="container">
      <div className="screen">
        <div className={`screen__content ${fade ? 'fade-in' : 'fade-out'}`}>
            <div className='heading'>Lost & Found</div>
          {!isRegistering ? (
            <form className="login" onSubmit={handleRegister}>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  placeholder="User name "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-envelope"></i>
                <input
                  type="email"
                  className="email__input"
                  placeholder="E-mail "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="button login__submit" type="submit">
                <span className="button__text">Register now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
          ) : (
            <form className="login" onSubmit={handleLogin}>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  placeholder="Username / email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="button login__submit" type="submit">
                <span className="button__text">Login</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
          )}
          <div className='bottom-div'>
          <div onClick={toggleForm} className="social-login">
          <br></br>
            <h5>{isRegistering ? " Forgot Password?" : ' '}</h5>
          </div>
            
          <div className='login-span'>
            {isRegistering ? 'Not Registered?  ' : 'Already Registered?  '}
          </div>
          
          <div onClick={toggleForm} className="social-login">
          <br></br>
            <h5>{isRegistering ? "  Register" : '  Log in'}</h5>
          </div>
          
         
           </div>
          
        </div>  

        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
