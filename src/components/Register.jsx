import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "./Firebase";

const Register = () => {
    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            // ...
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
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
                <input className='input input-primary' name='email' type="email" placeholder='Email' />
                <br />
                <input className='input input-primary' name='password' type="password" placeholder='Password' />
                <br />
                <button className='btn btn-primary'>Register</button>
            </form>
        </div>
    );
};

export default Register;