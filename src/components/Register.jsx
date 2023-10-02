import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import auth from "./Firebase";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password, accepted);
        setRegisterSuccess('');
        setRegisterError ('');
        if(password.length < 6 ){
            setRegisterError('Password should be at least 6 char or more');
            return;
        }else if (!/[A-Z]/.test(password)){
            setRegisterError('Your Password should have at least one uppercase letter');
            return;
        }
        else if (!accepted){
            setRegisterError('Please accept the terms first');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            setRegisterSuccess('Account Created Successfully');
            // ...

            updateProfile(user, {
                displayName: name,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
            .then(() => console.log('profile updated'))
            .catch(error => console.log(error))
            sendEmailVerification(user)
            .then(() => {
                alert('Please verify your email');
            })
          })
          .catch((error) => {
            const errorMessage = error.message;
            setRegisterError(errorMessage);
            // ..
          });
        
    }
    return (
        <div>
            <center>
                <h1 className="text-[60px] font-bold pt-[60px]">Register</h1>
            </center>
            <br />
            <br />
            <form onSubmit={handleRegister} className='flex items-center justify-center flex-col'>
                <input className='input input-primary' name='name' type="text" placeholder='Name' required/>
                <br />
                <input className='input input-primary' name='email' type="email" placeholder='Email' required/>
                <br />
                <input 
                className='input input-primary' 
                name='password' type={ showPassword? "text" : "password"} 
                placeholder='Password' required />
                <span onClick={() => setShowPassword(!showPassword)}>Show</span>
                <br />
                <div className="flex items-center gap-3">
                <input type="checkbox" name="terms" id="terms" />
                <label htmlFor="terms">Accept our <a href="#" className="underline text-pink-400">terms and conditions</a></label>
                </div>
                <br />
                <button className='btn btn-primary'>Register</button>
                <br />
                <p>{`Already have an account?`} <Link className="underline text-[green]" to={'/login'}>Go to Login</Link></p>
            </form>
            {
                registerSuccess && 
                <div className="mt-4 max-w-sm mx-auto">
                <div className=" alert alert-success rounded-md">{registerSuccess}</div>
                </div>
            }
            {registerError && <div className="mt-4 max-w-sm mx-auto">
                <div className=" alert alert-error rounded-md">{registerError}</div>
            </div>}
        </div>
    );
};

export default Register;