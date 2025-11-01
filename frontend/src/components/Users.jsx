import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Users = () => {
const [users,setUsers]=useState([])


// useEffect(()=>{

// fetch('https://jsonplaceholder.typicode.com/todos')
//       .then(response => response.json())
//       .then(data => setUsers(data)).catch(()=>{
//         console.error("Fetching error")
//       })
    
// },[])


useEffect(()=>{
    const fetching= async ()=>{

        try{
const res = await axios.get('https://jsonplaceholder.typicode.com/todos')
setUsers(res.data)
    
        }catch (err) {
        console.log('Error fetching data');
        console.error(err);
    }}
fetching();
},[])



    return (
        <>
        {users.map((item) => (<div key={item.id}>

<p>{item.id}</p>
<h1>{item.title}</h1>
<p>{item.completed?"Yes":"NO"}</p>
        </div>))}
    </>
    )
}

export default Users
