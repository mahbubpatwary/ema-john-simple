import './logo.svg';

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}



// firebase.initializeApp(firebaseConfig);



function Login(){

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isLoggedIn: false,

        name: '',
        email: '',
        password: '',
        photo: ''
    });

    const provider = new firebase.auth.GoogleAuthProvider();


    const handleGoogleSignin = () => {
        firebase.auth().signInWithPopup(provider)
            .then((res) => {
                var credential = res.credential;
                var token = credential.accessToken;

                const { displayName, email, photoURL } = res.user;
                const userInfo = {
                    isLoggedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                };
                setUser(userInfo);
                console.log(res);
            })
            .catch((err) => {
                console.log(err.message, err.code);
            })
    }

    const handleGoogleSignOut = () => {
        firebase.auth().signOut().then((res) => {
            console.log(res)
            const userInfo = {
                isLoggedIn: false,

                name: '',
                email: '',
                password: '',
                photo: '',
                err: ''
            }
            setUser(userInfo);

        }).catch((error) => {
            console.log(error)
        });
    }




    const handleChange = (e) => {
        let isFildValid = true;
        if (e.target.name === 'email') {
            isFildValid = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordNumber = /\d{1}/.test(e.target.value);

            isFildValid = isPasswordValid && passwordNumber;
        }
        if (isFildValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
        console.log(e.target.value)
    }




    const handleSubmit = (e) => {


        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    console.log(user.name)
                    // Signed in 
                    var user = userCredential.user;
                    const newUserInfo = { ...user }
                    newUserInfo.err = '';
                    setUser(newUserInfo);
                    updateUserName(user.name)

                    // console.log('Updated user', userCredential)

                })
                .catch((error) => {
                    e.preventDefault();
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    const newUserInfo = { ...user }
                    newUserInfo.err = error.message;
                    setUser(newUserInfo);


                });

            e.preventDefault();
            console.log('New user', user);

        }


        if (!newUser && user.email && user.password) {

            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    e.preventDefault();
                    // Signed in
                    var user = userCredential.user;
                    const newUserInfo = { ...user }
                    newUserInfo.err = '';
                    setUser(newUserInfo);
                    console.log('login', userCredential)



                })
                .catch((error) => {
                    e.preventDefault();
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    const newUserInfo = { ...user }
                    newUserInfo.err = error.message;
                    setUser(newUserInfo);

                });
            console.log('login user', user)
            e.preventDefault();
        }


    }


    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('Updated user Update successful.')
            // Update successful.
        }).catch(function (error) {
            console.log(error)
        });
    }







    return (
        <div className="App">


            <br /><br />
            {
                user.isLoggedIn ? <button onClick={handleGoogleSignOut}>sign Out</button>
                    : <button onClick={handleGoogleSignin}>sign in</button>


            }

            {
                user.isLoggedIn && <div>
                    <h2>wel come  {user.name}</h2>
                    <p>your email : {user.email} </p>
                    <img src={user.photo} alt=" not support" />

                </div>
            }

            <div>
                <p>Name {user.name}</p>
                <p>email : {user.email}</p>
                <p>password : {user.password}</p>
            </div>

            <div>
                <h2>Our own authentication</h2>

                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">r u new user</label>

                <form onSubmit={handleSubmit}>

                    {
                        newUser && <input name='name' onBlur={handleChange} placeholder="Enter your Name" type="text" />

                    }
                    <br />


                    <input type="email" onBlur={handleChange} name="email" required placeholder="Enter your email address" /> <br />
                    <input type="password" onBlur={handleChange} required name="password" placeholder="Enter your password" id="" /><br />

                    <input type="submit" value="Sign in" />
                    <button type="submit">Sign up</button>
                </form>
                <p>{user.err}</p>
            </div>





        </div>
    );
}

export default Login;
