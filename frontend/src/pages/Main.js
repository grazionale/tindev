import React, { useEffect } from 'react';
import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import './Main.css'

export default function Main( { match }) { //match são todos os parametros passados para está rota
    return (
        <div className="main-container">
            <img src={logo} alt="Tindev" />
            <ul>
                <li>
                    <img src="" alt="" />
                    <footer>
                        <strong>fdsafasdfdas</strong>
                        <p>sdafdsfdasfd</p>
                    </footer>
                    <div className="buttons">
                        <button type="button">
                            <img src={dislike} alt="Dislike" />
                        </button>
                        <button type="button">
                            <img src={like} alt="Like" />
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    );
}