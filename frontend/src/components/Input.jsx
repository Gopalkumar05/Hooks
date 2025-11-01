import React, { useState } from 'react'

const Input = () => {
    const [input,setInput]=useState({
        input1:"",
        input2:""
    });
    const[result,setResult]=useState("");

const HandleChange=(e)=>{
    const {name,value}=e.target;
setInput((pre)=>({...pre,[name]:value}))

}


const HandleAdd=()=>{

const sum = Number(input.input1)+Number(input.input2)
setResult(sum)

setInput({
    input1:"",
    input2:""
})
}

  return (
    <div>
<input type="text" name='input1' value={input.input1}  onChange={HandleChange} placeholder='Enter the value 1'/>
<input type="text" name='input2' value={input.input2} onChange={HandleChange} placeholder='Enter the value 2' />
 
 <p>{result}</p>
 <button onClick={HandleAdd}>Add</button>

    </div>
  )
}

export default Input