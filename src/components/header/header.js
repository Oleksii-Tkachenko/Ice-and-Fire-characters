import React from 'react';
import './header.css';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div className='header-block'>
            <h3 className='header-title'>
                <Link to='/main/'>
                Game of Thrones DB
                </Link>
            </h3>
            <ul className='header-links'>
                <li>
                    <Link to='/main/characters/'>Characters</Link>
                </li>
                <li>
                    <Link to='/main/houses/'>Houses</Link>
                </li>
                <li>
                    <Link to='/main/books/'>Books</Link>   
                </li>
            </ul>
        </div>
    );
};

export default Header;