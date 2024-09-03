import { React, useState } from 'react';
import firebaseApp from '../firebase/firebaseConfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);

  async function registerUser(email, password, role) {
    const userInfo = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((firebaseUser) => {
      return firebaseUser;
    });

    console.log(userInfo.user.uid);
    const docuRef = doc(firestore, `users/${userInfo.user.uid}`);
    setDoc(docuRef, { email: email, role: role });
  }

  async function loginUser(email, password, role) {
    signInWithEmailAndPassword(auth, email, password);
  }

  function submitHandler(e) {
    e.preventDefault();
    const email = e.target.elements.input_email.value;
    const password = e.target.elements.input_pwd.value;
    const role = e.target.elements.select_role.value;

    console.log('submit: ', email, password, role);

    if (isRegistering) {
      //register/sign up
      registerUser(email, password, role);
    } else {
      //login
      loginUser(email, password, role);
    }
  }

  return (
    <div>
      <h1>{isRegistering ? 'Sign Up' : 'Log In'}</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor='input_email'>Email</label>
        <input id='input_email' type='email' />
        <label htmlFor='input_pwd'>Password</label>
        <input id='input_pwd' type='password' />
        <label htmlFor='select_role'>Role</label>
        <select id='select_role'>
          <option value='admin'>Administrator</option>
          <option value='user'>User</option>
        </select>
        <input type='submit' value={isRegistering ? 'Sign Up' : 'Log In'} />
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'I already have an account' : 'I want to Sign up'}
      </button>
    </div>
  );
}

export default Login;
