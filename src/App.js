
import './App.css';
import Header from './components/Header';//importing header.js component
import Post from './components/Post';
import{useState,useEffect} from 'react';
import{db} from './firebase';    //importing firebase.js file



//Array of all post objects

// const initial_posts=[
//   // post1
//   {'username':'Munmun',
//   'caption':'Sunny Day.',
//   'imageurl':'https://i.pinimg.com/originals/e1/3a/4d/e13a4d737425141353603f7a3edb73cd.jpg'
//   },
//   // post2

//   {'username':'Rose',
//   'caption':'Sunny Day2.',
//   'imageurl':'https://di-uploads-pod10.dealerinspire.com/keffermazdaredesign/uploads/2015/03/road-1024x614.jpg'
//   }
// ]




function App() {
  const[posts,setPosts]=useState([]);        //initial_posts var to store all the posts
  const [user,setUser]=useState('')//var to store signin in username
  useEffect(()=>{
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()
      }))) //will give posts=[{username...,imageurl...,caption....},{},{}]
    })//end of db.collection
  },[])//end of useEffect

//callback function to get username from header.js
  const callbackFunction=(username)=>{
    setUser(username);
  }


  return (
    <div className="App">
      {/* using Header component */}

      <Header appCallback={callbackFunction}/>     

      <h1>welcome to instagram clonning </h1>
      {/* using Post component*/}
    <div className="all_posts">
      {
        posts.map(({id,post})=>(
          <Post signedinUser={user} postId={id} key={id} username={post.username} caption={post.caption} imageurl={post.imageurl} like={post.like}/>


        ))
      }
      
      {/* <Post username="Rose" caption="Sunny Day2." imageurl="https://di-uploads-pod10.dealerinspire.com/keffermazdaredesign/uploads/2015/03/road-1024x614.jpg"/> */}
      

    </div>
      

      
      


      {/* Posts */}
      
    </div>
  );
}

export default App;
