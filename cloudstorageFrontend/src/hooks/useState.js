import { useState } from "react";
export const useTogel = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const togel = () => setValue((prevValue) => !prevValue );
  return [value, togel];
};




export const counter = (()=>{
  const [countValue , updatecount] = useState(0)
  const incress = (()=>{updatecount(countValue+1)})
  const decrees = (()=>{updatecount(countValue-1)})
  const reset = (()=>{updatecount(0)})
return [countValue, incress , decrees , reset]
})