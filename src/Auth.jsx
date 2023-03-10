import { useState } from "react"
import { createUserWithEmailAndPassword , signInWithPopup ,signOut } from "firebase/auth";
import { googleProvider } from "./config/firebase";
import { auth } from "./config/firebase";




export const Auth = ()=>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const btnclicked = async ()=>{
        try
        {
            await createUserWithEmailAndPassword(auth,email,password);

        }
        catch(err)
        {
            console.error(err);
        }
    }

    const googleSignIn = async ()=>{
        await signInWithPopup(auth,googleProvider);
    }

    const logout = async ()=>{
        await signOut(auth);
    }


    return(
        <div>
            <input placeholder="Enter email" type="text" name="email"  value={email} onChange={(e)=>{
                return setEmail(e.target.value);
            }} id="" />
            <input placeholder="Enter password" type="password" name="password" onChange={(e)=>{
                return setPassword(e.target.value);
            }} value={password} id="" />
            <button onClick={btnclicked}>Submit</button>

            <button onClick={googleSignIn}>Click to sign in with google</button>

            <button onClick={logout}>Logout</button>
        </div>
    )
}