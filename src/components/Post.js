//create the function component
import React, {useState,useEffect} from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../firebase';
import firebase from 'firebase';

function Post({signedinUser,postId,username,caption,imageurl,like}){
    const[comments,setComments]=useState([]);//all comments
    const[comment,setComment]=useState('');//single comment
    const[likeButtonActive,setlikeButtonActive]=useState(false);
    const[commentButtonActive,setcommentButtonActive]=useState(false);
    //const[likeCounter,setlikeCounter]=useState(like);


    //to load all the comments as the begining as soon as user change the post
    //Note about unsubscribe:
    //When you are no longer interested in listening to your data, 
    //you must detach your listener so that your event callbacks stop getting called. 
    //This allows the client to stop using bandwidth to receive updates. For example:
    //var unsubscribe = db.collection("cities")
    //.onSnapshot(() => {
        // Respond to data
        // ...
     // });
  
  // Later ...
  
  // Stop listening to changes
  //unsubscribe();
  

    useEffect(()=>{
        var unsubscribe;
        if(postId){
            unsubscribe=db.collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp','desc')
            .onSnapshot((s)=>{
                setComments(s.docs.map((doc)=>({
                    id:doc.id,
                    c:doc.data()
                })
                   
                    

                ))

        })
        
    }
    return()=>{
        unsubscribe();
    }

},[postId])


   const postComment=(e)=>{
       e.preventDefault();
       db.collection("posts").doc(postId).collection("comments").add(
           {
               text:comment,
               username:signedinUser.displayName,
               timestamp:firebase.firestore.FieldValue.serverTimestamp()
           }
       )
       setComment('');



   }

   //delete comment handler

   const handleDelete=(e)=>{
    
    const commentId=e.target.dataset.id;//getting the id from comment
    db.collection("posts").doc(postId).collection("comments").doc(commentId).delete()//deleting from firebase
    .then(()=>{
        console.log("comment deleted");
    })
    .catch((error)=>{
        console.log("error");
    })
   }

   
   
    return(
        //Post
        <div className="post">
            {/* Username section */}
            <div className="post_header">
            <Avatar className="post_avatar"alt={username} src="image.jpg" />
                <h1>{username}</h1>
            </div>

            {/* post image section */}
        <img className="post_image" src={imageurl}
        alt="post_image"></img>

        {/* like button and comment button */}
        {signedinUser?(
            <div className="container">
            <i 
            className={`${likeButtonActive? "fas fa-heart": "far fa-heart"} heartIcon `} 
             onClick={()=>{
               setlikeButtonActive(!likeButtonActive);
                
             }}>
             </i>
             
            <i class="far fa-comment commentIcon" onClick={()=>setcommentButtonActive(!commentButtonActive)}></i>

            {/* <p>{like} people likes your post</p>          */}
        </div>

        ):("")}
        


        {/* caption section */}

        <h3 className="post_caption">{username}
        :<span className="post_text">{caption}
        </span></h3>



        {/* Comments */}
        <div className="post_comments">
            {comments.map(({id,c})=>(//c is each comment
                <p className="single_comment">
                    <div>
                        <strong>{c.username}</strong> : {c.text}

                    </div>
                    {signedinUser?
                    
                   ((c.username===signedinUser.displayName)?(<button className="delete_button" data-id={id} onClick={handleDelete}>X</button>):(""))
                    :("")}
                </p>



            ))
            
            
            
            }



        </div>
        {/* post comments */}
        {commentButtonActive && signedinUser?(
            <form className="post_commentbox">
            <input type="text"
            className="post_input"
            placeholder="Add Comments.."
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            ></input>
            <button className="post_button"
            type="submit"
            onClick={postComment}
            >Post</button>


        </form>


        ):("")}
        


        </div>
    )
}
export default Post;