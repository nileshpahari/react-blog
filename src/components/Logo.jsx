
import React from 'react'

function Logo({height="auto", width="100px"}) {
  return (
    // <img src="../img/logo.png" alt="Blog logo" className={`h-[${height}] w-[${width}]`}/>
    <div className={`h-[${height}] w-[${width}] font-bold`}>BLOG</div>
  )
}

export default Logo