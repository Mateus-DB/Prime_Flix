import React from 'react'
import { Link } from 'react-router-dom'

import './header.css'

const Header = () => {
    return (
        <header>
            <Link to='/' className='logo'>Prime Flix</Link>
            <Link to='/favoritos' className='favoritos'>Meus Filmes</Link>
        </header>

    )
}

export default Header