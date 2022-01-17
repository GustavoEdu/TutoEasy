// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc,
    getDocs,
    deleteDoc,
    onSnapshot,
    doc,
    getDoc,
    updateDoc,
    query,
    where,
    orderBy,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
      
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDY6MV9azyyBdtdSG2SYtLcnOAC1UKF6IU",
    authDomain: "fir-javascript-crud-d1561.firebaseapp.com",
    projectId: "fir-javascript-crud-d1561",
    storageBucket: "fir-javascript-crud-d1561.appspot.com",
    messagingSenderId: "579865010991",
    appId: "1:579865010991:web:919a22084902fe09b9f7da"
};
      
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveUser = (user, password, firstName, lastName, avatar) => 
    addDoc(collection(db, "users"), {user: user, password: password, firstName: firstName, lastName: lastName, avatar: avatar});

export const getUsers = () => getDocs(collection(db, "users"));

export const getAmountMessages = async () => {
    const docs = await getDocs(collection(db, "globalMessages"));
    return docs.size;
};

export const onGetGlobalMessage = callback =>
    onSnapshot(collection(db, "globalMessages"), callback);

export const saveGlobalMessage = (id, userFullName, date, content) =>
    addDoc(collection(db, "globalMessages"), {id: id, userFullName: userFullName, date:date, content: content});

export const getSortedMessages = () => {
    return query(collection(db, "globalMessages"), where("id", ">", 0), orderBy("id"));
}
