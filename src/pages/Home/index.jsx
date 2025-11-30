import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

import api from '../../services/api'


const Home = () => {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get('movie/now_playing', {
                params: {
                    api_key: apiKey,
                    language: 'pt-BR',
                    page: 1,
                }
            })

            setFilmes(response.data.results)
            setLoading(false)
        }

        loadFilmes()
    }, [])

    if (loading) {
        return (
            <div className='loading'>
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((film) => (
                    <article key={film.id}>
                        <strong>{film.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} alt={film.title} />
                        <Link to={`/filme/${film.id}`}>Acessar</Link>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default Home;