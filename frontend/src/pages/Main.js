import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import itsamatch from '../assets/itsamatch.png';
import './Main.css'
import api from '../services/api';

export default function Main({ match }) { //match são todos os parametros passados para está rota
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);
    //Param1 = Função a ser executada, Array[param2] variaveis que quando alteradas irão chamar a função Param1. 
    //Obs: Se passar array[param2] vazio, então só irá executar a function uma vez
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            });

            setUsers(response.data);
        }
        loadUsers();
    }, [match.params.id]);

    //Estabelece uma conexao com backend assim que entra na tela Main
    useEffect(() => {
        const socket = io('http://localhost:3333', {
            query: { user: match.params.id }
        });
        //Fica ouvindo a function match ser executada no backend pelo 'socket.init'  
        socket.on('match', dev => {
            setMatchDev(dev);
        })
    }, [match.params.id]);

    async function handleLike(id) {
        //param1 = url, param2 = body, param3 = headers
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        });
        setUsers(users.filter(user => user._id != id));
    }

    async function handleDislike(id) {
        //param1 = url, param2 = body, param3 = headers
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id }
        });
        setUsers(users.filter(user => user._id != id));
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className="buttons">
                                <button type="button" onClick={() => handleDislike(user._id)}>
                                    <img src={dislike} alt="Dislike" />
                                </button>
                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt="Like" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty">Acabou :/</div>
            )}
            {matchDev && (
                <div className="match-container">
                    <img src={itsamatch} alt="It's a match" />
                    <img className="avatar" src={matchDev.avatar} alt="It's a match" />
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>
                    <button type="button" onClick={ () => setMatchDev(null)}>FECHAR</button>
                </div>

            )}
        </div>
    );
}