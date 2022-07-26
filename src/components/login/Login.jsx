import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => (
    <nav className='Login'>
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store's inventory.</p>
        <button className='github' onClick={() => props.authenticate('Github')}>
            Log in with Github
        </button>
        <button className='twitter' onClick={() => props.authenticate('Twitter')}>
            Log in with Twitter
        </button>
        <button className='facebook' onClick={() => props.authenticate('Google')}>
            Log in with Google
        </button>
    </nav>
);

Login.prototype = {
    authenticate: PropTypes.func.isRequired
};
export default Login