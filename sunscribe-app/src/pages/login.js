import { React } from 'react';


function Login() {


    return (
        <>
            
            <div>
                <h2><a href="/about">About</a></h2>
            </div>
            <div>
                <h2>Login</h2>
                <form id="login_form" action="/">

                    <label for="username">Username:</label>
				    <input type="text" id="username" name="username" placeholder="" required />

                    <label for="password">Password:</label>
				    <input type="text" id="password" name="password" placeholder="" required />

                    <label for="submit">Submit</label>
                    <button type="submit" id="submit ">Submit</button>

                </form>

                <p><a href="/">Back</a></p>

            </div>
            <div>
                <h2><a href="/register">Register</a></h2>
            </div>

        </>
    );
}

export default Login;