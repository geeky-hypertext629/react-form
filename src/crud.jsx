
const [user,updateUser] = useState({
    name : "",
    email : "",
    phone : "",
    comment : "",
  })

  function updateData(e){
    const {name, value} = e.target;
    updateUser({...user,[name] : value});
  }

  const clicked= async (e)=>{
    e.preventDefault();
  }



<form method="POST">
<div>
  Enter Your name
  <input type="text" name="name" value={user.name} onChange={updateData} required />
</div>

<div>
  Enter Your email
  <input type="email" name="email" value={user.email} onChange={updateData} />
</div>
<div>
  Enter Your number
  <input type="number" name="phone" value={user.phone} onChange={updateData} />
</div>
<div> Enter Your comments
  <textarea name="comment" id="" cols="30" rows="10" value={user.comment} onChange={updateData}></textarea>
</div>
<button type="submit" onSubmit={clicked} >Submit</button>
</form>