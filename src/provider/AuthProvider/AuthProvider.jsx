import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "../../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";
export const AuthContext = createContext(null);

// social auth provider
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const axiosPublic = useAxiosPublic();


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };


    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }


    // signin user
    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // google login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };


    const logOut = () => {
        setUser(null);
        return signOut(auth);
    }

      // save user
  const saveUser = async user => {
    const currentUser = {
      email: user?.email,
      role: 'user',
      status: 'Verified',
    }
    const { data } = await axios.put(`http://localhost:5000/user`,
    currentUser)
    return data
  }


    useEffect(() => {
        const unSubscribe =
            onAuthStateChanged(auth, currentUser => {
                console.log('user in auth state', currentUser);
                // const userEmail = currentUser?.email || user?.email;
                const loggedUser = { email: currentUser?.email };
                setUser(currentUser);
                if (currentUser) {
                   saveUser(currentUser)
                  }
                
                setLoading(false);


// after jwt application get token & store client. sob users ee token pabe tai axiospublic nibo
                if (currentUser) {

                    axiosPublic.post('/jwt', loggedUser)
                        .then(res => {
                            if(res.data.token){
                                // console.log(res.data.token);
                               localStorage.setItem('access-token', res.data.token);
                            }
                            
                        })


                }
                else {
                    // remove token (if stored in the client side: lcoal storage, caching, in memory
                        // but http only cookie use korle server side thekei cookie remove korte hobe
                   
                        localStorage.removeItem('access-token');
                }
            });
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])




    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        logInUser,
        googleLogin,
        logOut,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
AuthProvider.propTypes = {
    children: PropTypes.node,
}