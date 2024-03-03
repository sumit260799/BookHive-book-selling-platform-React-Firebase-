import { createContext, useState, useEffect, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiMD1H3zfxYA3nhYLbLfnEqe_ghdJ0P5g",
  authDomain: "my-app-506b9.firebaseapp.com",
  projectId: "my-app-506b9",
  storageBucket: "my-app-506b9.appspot.com",
  messagingSenderId: "338486179381",
  appId: "1:338486179381:web:ba4324d3cd6074df74a37c",
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();

const firebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        setUserData(user);
        localStorage.setItem("userid", user.uid);
      } else {
        setUser(false);
      }
    });
  }, []);

  const isLoggedIn = user ? true : false;

  const EmailandPasswordSignUp = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const EmailandPasswordSignIn = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const signOutUser = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  const addBooksInFireStore = async (bookName, bookPrice, aboutBook, cover) => {
    try {
      const imgRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
      await uploadBytes(imgRef, cover);
      const url = await getDownloadURL(imgRef);
      const docRef = await addDoc(collection(db, "books"), {
        bookName,
        bookPrice,
        aboutBook,
        cover: url,
        userId: userData.uid,
        userName: userData.displayName,
        userEmail: userData.email,
        userPic: userData.photoURL,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getBooksData = async () => {
    const collectionRef = collection(db, "books");
    const querySnap = await getDocs(collectionRef);
    if (querySnap) {
      return querySnap;
    } else {
      console.log("No such document!");
    }
  };

  const getBooksById = async (id) => {
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);

    if (docSnap) {
      return docSnap;
    } else {
      console.log("No such document!");
    }
  };

  const deleteBooksById = async (id) => {
    const docuRef = doc(db, "books", id);
    await deleteDoc(docuRef);
  };

  const placeOrder = async (bookId, bookName, cover, qnty) => {
    const collectionRef = collection(db, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userId: userData.uid,
      userName: userData.displayName,
      userEmail: userData.email,
      userPic: userData.photoURL,
      bookName,
      cover,
      bookQnty: Number(qnty),
    });
    return result;
  };

  const fetchMyBooks = async (userId) => {
    if (!userId) {
      return null;
    }

    try {
      const q = query(collection(db, "books"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot;
    } catch (error) {
      // Handle any errors that might occur during data fetching
      console.error("Error fetching books:", error);
      return null;
    }
  };

  const fetchMyOrders = async (bookId) => {
    if (!bookId) return null;
    try {
      const bookRef = collection(db, "books", bookId, "orders");
      const result = await getDocs(bookRef);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <firebaseContext.Provider
      value={{
        EmailandPasswordSignUp,
        EmailandPasswordSignIn,
        signInWithGoogle,
        user,
        userData,
        isLoggedIn,
        signOutUser,
        addBooksInFireStore,
        getBooksData,
        getBooksById,
        deleteBooksById,
        placeOrder,
        fetchMyBooks,
        fetchMyOrders,
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
};

export const useFirebase = () => {
  return useContext(firebaseContext);
};
