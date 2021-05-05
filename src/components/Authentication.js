import React,{useState} from 'react';
import {Button} from '@material-ui/core';
import {auth} from '../firebase';
import Signinmodal from './Signinmodal';
import Signupmodal2 from './Signupmodal2';
import ImageUpload from './ImageUpload';
import Avatar from '@material-ui/core/Avatar';
import './Authentication.css';

function Authentication(props){
    const [user,setUser]=useState(null);
    const[openImageUpload,setopenImageUpload]=useState(false);

    //send data function to send the username to parent component(Hearder.js)
    const sendData=()=>{
        props.parentCallback(user);
    }

    //function to open image upload box

    const handleImageButton=(e)=>{
        console.log("image upload box");
        setopenImageUpload(!openImageUpload);//whatever the image upload value is do the opposite
    }
    return(
        
        <div>
            {/* if user signedin and click on image upload button the open image upload modal */}
            {user?.displayName ?(//if user is signed in
               openImageUpload && //and click on the image upload button

                <ImageUpload username={user.displayName}openImageUpload={openImageUpload} setopenImageUpload={setopenImageUpload}></ImageUpload>  //then show me the images

            ):(
                <h3>you need to login to upload</h3>
            )}
            {/* if user logged in, show logout and imageupload button, else show signin and signup button */}
            
            {user?(
                
                <div className="container">
                    {/* SIGNED IN USER AVATAR */}
                    <Avatar style={{height: '50px', width: '50px'}} className="post_avatar"alt={user.displayName} src="image.jpg" />

                    {/* image upload button */}
                    <i class="far fa-images imageIcon" onClick={handleImageButton}></i>



                {/* logout button */}
              <Button variant="outlined" onClick={()=>auth.signOut()}>logout</Button>
              </div>

            ):(
              <div className="app_logincontainer">
                  <Signinmodal></Signinmodal>
                  <Signupmodal2 user={user} setUser={setUser}></Signupmodal2>
            </div>
            )}
            {/* calling send data */}
            {sendData()}
                
        </div>
    )
}

export default Authentication;