import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'mern-goals.firebaseapp.com',
  projectId: 'mern-goals',
  storageBucket: 'mern-goals.appspot.com',
  messagingSenderId: '211560150520',
  appId: '1:211560150520:web:ff0143ccfd50f55918520d',
};

const app = initializeApp(firebaseConfig);

export default app;
