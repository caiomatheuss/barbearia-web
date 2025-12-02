// Configuração do Firebase
// IMPORTANTE: Substitua estas configurações pelas suas credenciais do Firebase
// Você pode obter essas informações no console do Firebase: https://console.firebase.google.com/

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBU-B71W66TVIYeyDbmxg4OONqUApuJepo",
  authDomain: "barbearia-web-7bc61.firebaseapp.com",
  projectId: "barbearia-web-7bc61",
  storageBucket: "barbearia-web-7bc61.firebasestorage.app",
  messagingSenderId: "64001551558",
  appId: "1:64001551558:web:96da63622c05ba34d33bc7"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

export default app;

