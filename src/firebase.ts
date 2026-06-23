import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import config from '../firebase-applet-config.json';

// Initialize Firebase app with configurations from root
const app = initializeApp(config);

// Use the custom database ID provided by the AI Studio environment
export const db = getFirestore(app, config.firestoreDatabaseId || '(default)');

export const auth = getAuth(app);
