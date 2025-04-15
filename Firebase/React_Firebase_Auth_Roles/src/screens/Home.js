import React from 'react';
import firebaseApp from '../firebase/firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';

import AdminView from '../components/AdminView';
import UserView from '../components/UserView';

const auth = getAuth(firebaseApp);

function Home({ user }) {
  return (
    <div>
      Home
      <button onClick={() => signOut(auth)}>Close Session</button>
      {user.role === 'admin' ? <AdminView></AdminView> : <UserView></UserView>}
    </div>
  );
}

export default Home;
