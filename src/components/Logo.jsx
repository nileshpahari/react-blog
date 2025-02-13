
import React from 'react'

function Logo({height="auto", width="100px", className=""}) {
  return (
    // <img src="../img/logo.png" alt="Blog logo" className={`h-[${height}] w-[${width}]`}/>
    <div className={`h-[${height}] w-[${width}] font-bold text-gray-300 ${className}`}>BLOG</div>
  )
}

export default Logo