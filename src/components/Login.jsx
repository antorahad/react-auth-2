import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import auth from "./Firebase";


const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');
    const emailRef = useRef(null);
    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        setLoginError('');
        setLoginSuccess('')
        signInWithEmailAndPassword(auth,email,password)
        .then(result => setLoginSuccess('login successful'))
        .catch(error => setLoginError(error.message))
    }
    const handleForgotPassword = () => {
        const email = emailRef.current.value;
        if(!email){
            console.log('kanker sele email de');
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('email check koro chodna');
        })
        .catch(error => console.log(error));
    }
    return (
        <div>
             <center>
                <h1 className="text-[60px] font-bold pt-[60px]">Login</h1>
            </center>
            <br />
            <br />
            <form onSubmit={handleLogin} className='flex items-center justify-center flex-col'>
                <input className='input input-primary' ref={emailRef} name='email' type="email" placeholder='Email' />
                <br />
                <input className='input input-primary' name='password' type="password" placeholder='Password' />
                <br />
                <a onClick={handleForgotPassword}>Forget password</a>
                <br />
                <button className='btn btn-primary'>Login</button>
                <br />
                <p>{`Don't have an account?`} <Link className="underline text-[green]" to={'/register'}>Go to Register</Link></p>
            </form>
            {
                loginError && 
                <div className="mt-4 max-w-sm mx-auto">
                     <div className=" alert alert-error rounded-md">{loginError}</div>
                </div>
            }
            {
                loginSuccess && 
                <div className="mt-4 max-w-sm mx-auto">
                     <div className=" alert alert-success rounded-md">{loginSuccess}</div>
                </div>
            }
        </div>
    );
};

export default Login;