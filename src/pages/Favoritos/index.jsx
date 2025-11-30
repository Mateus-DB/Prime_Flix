import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css';

import { toast } from 'react-toastify';
function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@primeflix');
        setFilmes(JSON.parse(minhaLista) || []);
    }, [])

    function handleDelete(id) {
        const filtroFilmes = filmes.filter((item) => {
            return (item.id !== id);
        })

        setFilmes(filtroFilmes);
        localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes));
        toast.success('Filme excluido com sucesso!')

    }

    return (
        <div className='meus-filmes'>
            <h1>Meus filmes:</h1>

            {filmes.length === 0 && <span>Sua lista está vazia :( </span>}

            <ul>
                {filmes.map((filme) => {
                    return (
                        <li key={filme.id}>
                            <span>{filme.title}</span>

                            <div>
                                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                <button className='btn-excluir' onClick={() => handleDelete(filme.id)}>Excluir</button>
                            </div>

                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;