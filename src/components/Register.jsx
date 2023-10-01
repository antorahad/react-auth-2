import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import auth from "./Firebase";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        setRegisterSuccess('');
        setRegisterError ('');
        if(password.length < 6 ){
            setRegisterError('Password should be at least 6 char or more');
            return;
        }else if (!/[A-Z]/.test(password)){
            setRegisterError('Your Password should have at least one uppercase letter');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            setRegisterSuccess('Account Created Successfully');
            // ...
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
                <input className='input input-primary' name='email' type="email" placeholder='Email' required/>
                <br />
                <input 
                className='input input-primary' 
                name='password' type={ showPassword? "text" : "password"} 
                placeholder='Password' required />
                <span onClick={() => setShowPassword(!showPassword)}>Show</span>
                <br />
                <button className='btn btn-primary'>Register</button>
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