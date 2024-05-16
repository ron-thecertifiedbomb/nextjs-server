// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBIX3MhDJVPL6IBUh4Aqn2e8OxnidSzC4I",
  authDomain: "e-commerce-photo-storage.firebaseapp.com",
  projectId: "e-commerce-photo-storage",
  storageBucket: "e-commerce-photo-storage.appspot.com",
  messagingSenderId: "1065991973050",
  appId: "1:1065991973050:web:abaee7818f29dd36847a83",
  measurementId: "G-YHSC0Q414W"
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);