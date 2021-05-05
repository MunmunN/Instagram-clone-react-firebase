//getting Modal from material ui

import React , {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button} from '@material-ui/core';
import './Signupmodel.css';
import {auth} from '../firebase';

//function to set the Modal at the center
function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  //style for the Modal
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  function Signupmodel(){
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    //these are my form variables and they are empty
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);//sign up modal varibales
    const [openSignIn,setOpenSignIn]=useState(false)//sign in modal variable

    //form variables
    const [username,setUsername]=useState('');
    const [fullname,setFullname]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    //new user variable
    const [user,setUser]=useState(null);

    //EVERYTIME NEWUSER LOGGED IN, CALL USEEFFECT,
    //USEEFFECT WITH CHECK IF USER LOGGEDIN OR LOGGEDOUT
    useEffect(()=>{
      auth.onAuthStateChanged(authUser=>{
        if(authUser){
          //if user logged in
          setUser(authUser);
          console.log(authUser);

        }
        else{
          setUser(null);//user logged out
        }
      })
    },[user,username]);

    //Firebase signup using email and password
    const signUp=(event)=>{
      console.log("sign in");
      event.preventDefault();//stop refreshing the screen
      //creating a new user using email and password
      //once user is created update the displayname to new user
      //if thereis any error, show the alert box
      auth.createUserWithEmailAndPassword(email,password)
      .then((authUser)=>{
        return authUser.user.updateProfile({displayName:username})
        //console.log(authUser);

      })
      .catch((error)=>alert(error.message))
    }

    //Firebase SignIn using email and password
    const signIn=(event)=>{
      event.preventDefault();
      auth.signInWithEmailAndPassword(email,password)
      .then((authUser)=>{
        console.log("sign in")
      })
      .catch((error)=>alert(error.message))
    }
    


    return(
        <div>
            {/* sign up popup window(Modal) */}
            <Modal
            open={open}
            onClose={()=>setOpen(false)}>
                 <div style={modalStyle} className={classes.paper}>
                <center>
                    <img className="app_header_image"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                         alt="Instagram Logo">
                    </img>
                </center>
                <h3>Become a member</h3>
                <form className="app_signup_form">
                    <input placeholder="username"
                    autoFocus="autofocus"
                            type="text"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}>
                     </input>
                     <input placeholder="fullname"
                            type="text"
                            value={fullname}
                            onChange={(e)=>setFullname(e.target.value)}>
                    </input>
                    <input placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}>
                    </input>
                    <input placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}>
                    </input>
                    <Button onClick={signUp}>Sign Up</Button>               

                    
                    
                </form>
                 </div>
            </Modal>
            

            {/* sign in pop up window */}
            <Modal
            open={openSignIn}
            onClose={()=>setOpenSignIn(false)}>
                 <div style={modalStyle} className={classes.paper}>
                <center>
                    <img className="app_header_image"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                         alt="Instagram Logo">
                    </img>
                </center>
                <h3>Already a member? Sign In.</h3>
                <form className="app_signup_form">
                    
                    <input placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}>
                    </input>
                    <input placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}>
                    </input>
                    <Button onClick={signIn}>Sign Up</Button>               

                    
                    
                </form>
                 </div>
            </Modal>
            
            
            {/* if user logged in, show logout button, else show signin and sign up button */}
            {user?(
              //logout button
              <Button variant="outlined" onClick={()=>auth.signOut()}>logout</Button>

            ):(
              <div className="app_logincontainer">
                {/* Sign in button */}
                <Button variant="outlined" onClick={()=> setOpenSignIn(true)}>Sign In</Button>
                {/* /sign up button */}
                <Button variant="outlined" onClick={() => setOpen(true) }>Sign up</Button>

              </div>
             
            
            )}
            
            
        </div>
    )
  }
  export default Signupmodel;