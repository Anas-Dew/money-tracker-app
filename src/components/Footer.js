import React from 'react'
const Footer = () => {
  return (
    <footer className='m-3 d-flex justify-content-center'>
      <p className='m-2'>&copy; 2023 Dewsverse by Anas Dew  </p>
      {/* <Link className='m-2' to={'https://bit.ly/dewsverse-community'}>Join Discord Community</Link> */}
      <a className='m-2' href="https://bit.ly/dewsverse-community" target="_blank" >Join Discord Community</a>
    </footer>
  )
}

export default Footer