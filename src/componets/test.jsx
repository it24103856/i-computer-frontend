import { useState } from "react";

export default function test(){

    const [count,setcount]=useState(0)
    

   
    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[400px] h-[300px] shadow-2xl ">
                <button className="w-[100px] h-[50px] bg-red-600 text-white" onClick={() => (setcount(count-1))}> Descrement</button>
                <h1 className="w-[100px] h-[50px] text-[30px] text-center">{count}</h1>
                 <button onClick={()=>{
                    console.log("increcement"); 
                    setcount(count+1)   
                    console.log(count)}}  className="w-[100px] h-[50px] bg-blue-600 text-white"> Increment</button>

            </div>
          <button className="w-2 h-3  bg-amber-50 " onClick={()=>{
              
          }         
          }> Click me  </button>
        </div>
    )
}