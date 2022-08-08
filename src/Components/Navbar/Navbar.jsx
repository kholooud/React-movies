import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <nav className={`${styles.navbar} navbar navbar-expand-lg navbar-light`}>
      <a className="navbar-brand" href="#">Noxe</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">

        {props.userData?<ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="home">Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="movies">Movies</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="tvshows">tv shows</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="people">People</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="network">Network</Link>
          </li>
        </ul>:''}

        <ul className="navbar-nav ms-auto">
          <div className="social-icon align-self-center">
            <i className='fab fa-facebook px-2'></i>
            <i className='fab fa-spotify px-2'></i>
            <i className='fab fa-instagram px-2'></i>
            <i className='fab fa-youtube px-2'></i>
          </div>
          {props.userData?
          <li className="nav-item">
            <a onClick={props.logout} className="nav-link" to="logout">Logout</a>
          </li>:
          <> 
          <li className="nav-item">
            <Link className="nav-link" to="login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="register">Register</Link>
          </li>
          </>
          }
         
          
        </ul>
      </div>
</nav>
  )
}
