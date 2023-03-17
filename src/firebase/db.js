import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjOU1IRM9Tf_8jqBaFgkkyDlYQPComLxY",
  authDomain: "reflex-survey-data.firebaseapp.com",
  projectId: "reflex-survey-data",
  storageBucket: "reflex-survey-data.appspot.com",
  messagingSenderId: "356780484528",
  appId: "1:356780484528:web:7428148a9e5b5b752d5875",
};

const app = initializeApp(firebaseConfig, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});
const db = getFirestore();
const sebringSite = collection(db, "DigitalUnrivaledExperience2023");
const sebringApp = collection(db, "Sebring2023-Onsite");
const corvette = collection(db, "Sebring2023Corvette");
const porsche = collection(db, "Sebring2023Porsche");
const lexus = collection(db, "Sebring2023Lexus");

export { db, sebringSite, sebringApp, corvette, porsche, lexus };
