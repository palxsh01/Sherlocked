import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import NavBar from '../components/NavBar';
import { Link } from 'react-router';

const HomePage = () => {
  return (
    <div className='h-screen'>
      <NavBar />
      <p className="mx-auto max-w-6xl p-4 text-center font-mono">
        Welcome to Sherlocked! This is Adit's Club's Premier Event for the Verba Maximus Literary Fest hosted at BITS Pilani Hyderabad Campus. Sherlocked is an event about detectives and some bs that Adit has to tell me.
      </p>
      <div className='flex justify-center'>
        <Link to={"/liveevent"} className='btn btn-secondary' onClick={() => {toast.success("Journey Started!")}}>
        Let's Crack The Case!
        </Link>
      </div>
    </div>
  )
};

export default HomePage;