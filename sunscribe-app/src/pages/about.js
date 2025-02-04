import { React } from 'react';


function About() {


    return (
        <>
            
            <div>
                <h2>About</h2>
                <p>SunScribe is a virtual notebook. Nothing more, nothing less.</p>
                <p>It was designed to make "morning pages" more accessible for those of us with busy lives. Morning pages can facilitate creative thinking and problem solving, but the habit is difficult to maintain if you have little time to reflect in the morning.</p>
                <p>Or if you like staying in bed.</p>
                <p>To use SunScribe, register for a free account with the Register link below. Or sign into your existing account.</p>
                <p><a href="/">Back</a></p>
            </div>
            <div>
                <h2><a href="/login">Login</a></h2>
            </div>
            <div>
                <h2><a href="/register">Register</a></h2>
            </div>

        </>
    );
}

export default About;