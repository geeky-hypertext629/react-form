import React, { useEffect, useState } from "react";
import { Auth } from "./Auth";
import { db , auth, storage} from "./config/firebase";
import { collection, getDocs, addDoc,deleteDoc , doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export default function App() {
  const [studentList, updateStudent] = useState([]);
  const [user, updateUser] = useState({
    name: "",
    email: "",
    number: "",
    comment: "",
  });

  function updateData(e) {
    updateUser({ ...user, [e.target.name]: e.target.value });
  }

  const [updatedTitle, updateTitle] = useState("");

  
  const studentsCollectionref = collection(db, "students");
  
  const clicked = async () => {
    try{
    await addDoc(studentsCollectionref,{comments : user.comment, email : user.email, name : user.name, number : user.number, userId : auth?.currentUser?.uid});
    }
    catch(err)
    {
      console.error(err);
    }

    getStudents();

  };


  const deleteStudent =async (id)=>{

    const delStud = doc(db,"students",id);
    await deleteDoc(delStud);
    getStudents();
  }
  
  
  const titleChange = async (id) =>{
    const delStud = doc(db,"students",id);
    await updateDoc(delStud,{comments : updatedTitle});
    getStudents();
    
  }

  const [fileUpload,setFileUpload] = useState();

  const uploadfile = async () =>{
    if(!fileUpload)
    return 
    const filesFolderRef = ref(storage,`/Projectfiles/${fileUpload.name}`);
    await uploadBytes(filesFolderRef, fileUpload);
  }

  const getStudents = async () => {
    const data = await getDocs(studentsCollectionref);
    const filtereData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    updateStudent(filtereData);
  };
  useEffect(() => {
    
    getStudents();
    
  }, []);

  return (
    <div className="App">
      <Auth />

      <div>
        Enter Your name
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={updateData}
          required
        />
      </div>

      <div>
        Enter Your email
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={updateData}
        />
      </div>
      <div>
        Enter Your number
        <input
          type="number"
          name="number"
          value={user.phone}
          onChange={updateData}
        />
      </div>
      <div>
        {" "}
        Enter Your comments
        <textarea
          name="comment"
          id=""
          cols="30"
          rows="10"
          value={user.comment}
          onChange={updateData}
        ></textarea>
      </div>
      <button onClick={clicked}>
        Submit
      </button>

      <div>
        {studentList.map((stud) => {
          return( <>
            <h1>{stud.comments}</h1>
          <button onClick={()=>{
            deleteStudent(stud.id)
          }}> Delete Movie</button>
          <input type="text" name = "title" onChange={(e)=>{
            updateTitle(e.target.value)
          }}/>
          <button onClick={()=>{titleChange(stud.id)}}>Update Title</button>
          </>);
        })}
      </div>


      <div>

        <input type="file" onChange={(e)=>{
          setFileUpload(e.target.files[0])
        }}/>
        <button onClick={uploadfile}>Upload File</button>
      </div>





    </div>





  );
}
