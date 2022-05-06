import React from "react";

function Navbar() {
  return (
    <div className="flex justify-around bg-neutral-100 py-4 items-center">
      <div >
         <img src="/images/icc.png" alt="" className='w-16 h-16' />
      </div>

      <div className=' flex text-l gap-8'>
      <p  className=' '>Home</p>
      <p>Blog</p>
      <p>Sign up</p>
      </div>
    </div>
  );
}

export default Navbar;
