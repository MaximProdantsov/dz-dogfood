import { useEffect, useState } from "react";



 
export const useDelay = (path)=>{
  const [delayValue, setDelayValue] = useState(path)
  useEffect(()=>{
    const timeotId = setTimeout(() => {
      setDelayValue(path)
    }, 1300);
    return () => clearTimeout(timeotId)
  }, [path]
  
  )
  return delayValue
}