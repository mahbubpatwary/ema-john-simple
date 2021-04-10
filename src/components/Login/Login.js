import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

    //    firebase.initializeApp(firebaseConfig);

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }else {
        firebase.app(); // if already initialized, use that one
    }




const Login = () => {

    const provider = new firebase.auth.GoogleAuthProvider();
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
        error: '',
        success : false
    });

    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    let {from} = location.state || {from : {pathname : '/'}};

    const [newUser, setNewUser] = useState(false);
    const [status, setStatus] = useState({
        success : '',
        error : ''
    });
    const statusFunction = (ress, err) =>{
        const newStatus = {
            success : ress,
            error : err
        }
        setStatus(newStatus);
    }


    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
        .then((res) =>{
           
            const {displayName, photoURL, email} = res.user;
            const signedInUser = {
                isSignedIn : true,
                name : displayName,
                photo : photoURL,
                email : email
            };
            setUser(signedInUser)
            console.log(res);
            statusFunction('user logged in successfully', '');
            setLoggedInUser(signedInUser)
            history.replace(from);
        })
        .catch((err) =>{
            console.log(err)
            statusFunction('', err.message)
        })
    };


    const handleGoogleSignOut = () => {
        firebase.auth().signOut()
        .then((res) => {
            const userInfo = {
                isSignedIn : false,
                name : '',
                photo : '',
                email : ''
            }
            setUser(userInfo);
            console.log(res)
            statusFunction('user log out successfully', '')

        }).catch((error) => {
           console.log(error);
           statusFunction('', error.message)
          });

    }




    
    //      Our won authentication Scripts................
  
    //      const is_valid_email = email =>  /(.+)@(.+){2,}\.(.+){2,}/.test(email); 
    //      const hasNumber = input => /\d/.test(input);

    const handleChange = (e) => {
       // debugger;
        let isFieldValid = true;
        if (e.target.name === 'email') {    
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            isFieldValid ? statusFunction('', '')
            : statusFunction('', 'your email is not valid')
           
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length >= 6;
            const passwordNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordNumber;
            isFieldValid ? statusFunction('', '')
            : statusFunction('', 'your password is not valid')
           
        }
        if(isFieldValid){
            const userInfo = { ...user};
            userInfo[e.target.name] = e.target.value;
            setUser(userInfo);
            console.log(user);
        }
        console.log(isFieldValid, e.target.value)
    }


    const handleSubmit = (e) => {
        
        if( newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                const success = 'user created successfully';
                statusFunction(success, '');
                updateUserName(user.name);
                console.log( userCredential.user);
            })
            .catch((error) => {
                
                statusFunction('', error.message);
                console.log(error)
            });
           
        }
        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
               
                const successStatus = 'user logged in successfully';
                statusFunction(successStatus, "");
                setLoggedInUser(user)
                history.replace(from);
                console.log(userCredential)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                statusFunction("", errorMessage);
                console.log(error);
            });
        }
       
        e.preventDefault();
    }



    const updateUserName = (name)=>{
        const user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name
        }).then(function() {
       console.log(`${name} update successfully`)
        }).catch((error) => {
        console.log(error)
        });
    }
    


    return (
        <div className="App">
            <h1>this is a login</h1>
            {
                user.isSignedIn ? <button className='add_btn' onClick={handleGoogleSignOut}>Google Sign out</button>
                                : <button className='add_btn' onClick={handleGoogleSignIn}>Google Sign in</button> 
            }
            <br/>
            {
                user.isSignedIn && <dir>
                    <p>wellcome {user.name} </p>
                    <p>email: {user.email}</p>
                    <img src={user.photo} alt=""/>
                </dir>
            }



                <br/><br/>
            <div>
                <h3>Our won authentication</h3>
                <p> {user.name} </p>
                <p> {user.email} </p>
                <p> {user.password} </p>
                <br/>
                <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
                <label htmlFor="newUser">New user sign up</label>

                <form onSubmit={handleSubmit} >
                   {
                       newUser &&  <input name="name" type="text" onBlur={handleChange} placeholder="enter your name"/>
                    
                   }
                   <br/>
                    <input type="text" name='email' onBlur={handleChange} required placeholder='enter your email address'/>
                    <br/>
                    <input type="password" name="password" required id="" onBlur={handleChange} placeholder="Enter your password"/>
                    <br/>
                        {
                            newUser ?  <input type="submit" value="Create Account"/>
                                        : <button type="submit">Login</button>
                        }
                    <br/><br/>
                    
                   
                </form>
                <p style={{color: 'red'}}> {user.error} </p>
                {
                    user.success && <p style={{color: 'green'}}>User created successfully</p>
                }
                <dir>
                    <p>Status</p>
                    <p style={{color: 'green'}}>{status.success} </p>
                    <p style={{color: 'red'}}>{status.error} </p>
                </dir>

            </div>
            <br/><br/>

        </div>
    );
};

export default Login;