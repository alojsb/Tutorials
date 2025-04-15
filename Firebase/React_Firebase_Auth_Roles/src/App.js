import { React, useState } from 'react';
import Login from './screens/Login';
import Home from './screens/Home';
import firebaseApp from './firebase/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

  async function getRole(uid) {
    const docuRef = doc(firestore, `users/${uid}`);
    const encryptedDoc = await getDoc(docuRef);
    const roleInfo = encryptedDoc.data().role;
    return roleInfo;
  }

  async function setUserWithRole(firebaseUser) {
    getRole(firebaseUser.uid)
      .then((role) => {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role: role,
        };
        setUser(userData);
        console.log('user data: ', userData);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      if (!user) {
        setUserWithRole(firebaseUser);
      }
    } else {
      setUser(null);
    }
  });

  return <>{user ? <Home user={user} /> : <Login />}</>;
}

export default App;
