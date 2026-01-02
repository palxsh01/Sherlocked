import React from 'react';
import { LightbulbIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
      <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>
            Sherlocked
          </h1>
          <div className='flex items-center gap-4'>
            <Link to={"/tips"} className='btn btn-primary'>
              <LightbulbIcon className='size-5'/>
              <span>Tips</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
};

export default Navbar;