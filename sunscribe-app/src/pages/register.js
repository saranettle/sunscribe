import { React } from 'react';


function Register() {


    return (
        <>
            
            <div>
                <h2><a href="/about">About</a></h2>
            </div>
            <div>
                <h2><a href="/login">Login</a></h2>
            </div>
            <div>
                <h2><a href="/register">Register</a></h2>
                <form id="register_form" action="/">

                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" placeholder="" required />

                    <label for="email">Email:</label>
                    <input type="text" id="email" name="email" placeholder="" required />

                    <label for="password">Password:</label>
                    <input type="text" id="password" name="password" placeholder="" required />

                    <label for="submit">Submit</label>
                    <button type="submit" id="submit ">Submit</button>

                </form>

                <p><a href="/">Back</a></p>
            </div>

        </>
    );
}

export default Register;