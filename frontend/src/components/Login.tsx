import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuth } from './AuthContext';
import "./Login.css";
import Swal from 'sweetalert2';

type AuthMode = 'login' | 'register';

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  initialMode: AuthMode;
};

export function Login({setIsOpen, initialMode}: Props) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const { signIn, signUp } = useAuth();

  useEffect(() => {
    setMode(initialMode)
  },[initialMode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await signIn(username, password);
        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: 'Login successful!',
          timer: 1500,
          showConfirmButton: false,
          background: '#1a1a1a', // Color de fondo oscuro
          color: '#ffffff', // Color del texto
          customClass: {
            popup: 'small-alert' // Clase personalizada
          }
        });
        setIsOpen(false)
      } else {
        if(password === password2){
          await signUp(username, password);
          Swal.fire({
            icon: 'success',
            title: 'Registration successful!',
            text: 'Please log in with your new account',
            timer: 2000,
            showConfirmButton: false,
            background: '#1a1a1a', // Color de fondo oscuro
            color: '#ffffff', // Color del texto
            customClass: {
              popup: 'small-alert' // Clase personalizada
            }
          });
          setMode('login');
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Passwords do not match',
            background: '#1a1a1a', // Color de fondo oscuro
            color: '#ffffff', // Color del texto
            customClass: {
              popup: 'small-alert' // Clase personalizada
            }
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error instanceof Error ? error.message : 'Authentication error',
        background: '#1a1a1a', // Color de fondo oscuro
        color: '#ffffff', // Color del texto
        customClass: {
          popup: 'small-alert' // Clase personalizada
        }
      });
    }
  };
  return (
    <div className="login-container">
      <h2>{mode === 'login' ? 'Log In' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">{/* email Field */}
          <div className="par">
            <div className="inputLine">
              <img src="assets/user.png" />
              <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  className="input"
                  placeholder="Username"
                />
            </div>
          </div>
        </div>

        <div className="form-group">{/* Password Field */}
          <div className="par">
            <div className="inputLine">
              <img src="assets/password.png" />
              <input
               id="password"
               name="password"
               type="password"
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="input"
               placeholder="Password"
              />
            </div>
          </div>
        </div>

        {mode === 'register' && (
        <div className="form-group">{/* username Field */}
          <div className="par">
            <div className="inputLine">
              <img src="assets/password.png" />
                <input
                id="password2"
                name="password2"
                type="password"
                required
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="input"
                placeholder="Confirm password"
                />
            </div>
          </div>
        </div>
      )}

        <div className="botones">
          <button type="submit" className="accept">
            {mode === 'login' ? 'Log In' : 'Sign In'}
          </button>
          <button
            type="button"
            className="cancel"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </button>
        </div>

        <button type="button" className="ChangeMode" onClick={()=>{
          if(mode === 'login') {
            setMode('register')
          }else{
            setMode('login')
          }
        }}>
            {mode === 'login'
            ? "Don't have an account? Register"
            : 'Already have an account? Log in'}
        </button>
      </form>
    </div>
  );
};
