
import React from 'react'

function Logo({height="auto", width="100px"}) {
  return (
    <img src="../img/logo.png" alt="Blog logo" className={`h-[${height}] w-[${width}]`}/>
  )
}

export default Logo