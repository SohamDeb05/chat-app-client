import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDsPTXXsi0QCGCZ2cqelqakcAY2GtaxRIc",
  authDomain: "quickconnect-8d2e7.firebaseapp.com",
  projectId: "quickconnect-8d2e7",
  storageBucket: "quickconnect-8d2e7.appspot.com", // 🔍 Corrected here
  messagingSenderId: "126101724049",
  appId: "1:126101724049:web:f96dffee5b023b4df05830",
  measurementId: "G-E0DMK2FTCV"
};

const app = initializeApp(firebaseConfig);

export default app;
