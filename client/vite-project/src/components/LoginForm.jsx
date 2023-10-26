import React from 'react'

export const LoginForm = () => {
    return (
        <div>
            <form>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' name='username' />

                <label htmlFor='password'>Password</label>
                <input type='text' id='password' name='password' />

                <button>Submit</button>
            </form>
        </div>
    );
};
