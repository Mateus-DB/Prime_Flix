import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api';
import { toast } from 'react-toastify';

import './filme.css'

const Filme = () => {
    const { id } = useParams();
    const apiKey = import.meta.env.VITE_API_KEY;
    const navigate = useNavigate();


    const [film, setFilm] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilm() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: apiKey,
                    language: 'pt-BR'
                }
            })
                .then((response) => {
                    setFilm(response.data)
                    setLoading(false);
                })
                .catch(() => {
                    navigate('/', { replace: true })
                    return;
                })
        }


        loadFilm();

        return () => {

            loadFilm();

        }
    }, [id, navigate, apiKey])

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeflix');
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some(filmeSalvo => filmeSalvo.id === film.id);

        if (hasFilme) {
            toast.warn('Esse filme já está na sua lista!');
            return;
        }

        filmesSalvos.push(film);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!')
    }

    if (loading) {
        return (
            <div className="loading">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className='filme-info'>
            <h1>{film.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`} alt={film.title} />

            <h3>Sinopse</h3>
            <span>{film.overview}</span>

            <strong>
                Avaliação: {film.vote_average} / 10
            </strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://www.youtube.com/results?search_query=${film.title} trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filme