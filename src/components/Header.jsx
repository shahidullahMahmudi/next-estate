'use client'
import Link from 'next/link';
import {FaSearch} from 'react-icons/fa'
import { useSearchParams,useRouter } from 'next/navigation';
import {SignedIn,SignedOut,UserButton} from '@clerk/nextjs'
import { useEffect, useState } from 'react';

const Header = () => {
    const searchParams=useSearchParams();
    const router=useRouter();
    const [searchTerm,setSearchTerm]=useState('');
    
    useEffect(()=>{
        const urlParams=new URLSearchParams(searchParams);
        const searchTermFromUrl=urlParams.get('searchTerm');
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl)
        }
    },[searchParams])
    const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams=new URLSearchParams(searchParams);
        urlParams.set('searchTerm',searchTerm);
        const searchQuery=urlParams.toString();
    router .push(`/search?${searchQuery}`);
    }
    return (
        <header className='bg-slate-200 shodow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link href='/'>
                <h1 className='font-bold tex-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Teesta</span>
                    <span className='text-slate-700'>Estate</span>

                </h1>
                </Link>
                <form className='bg-slate-100 p-3 rounded-lg flex items-center' onSubmit={handleSubmit}>
                  <input type='text' placeholder='Search...' className='bg-transparent' value={searchTerm}
                  onChange={(e)=>setSearchTerm(e.target.value)}/>
                  <button>
                     <FaSearch className='text-slate-600'/> 
                  </button>
                </form>
                <ul className='flex gap-4'>
                    <Link href='/'>
                    <li className='hidden md:inline text-slate-700 hover:underline' >Home</li>
                    </Link>
                    <Link href='/about'>
                    <li className='hidden md:inline text-slate-700 hover:underline' >About</li>
                    </Link>
                    <SignedIn>
                        <UserButton/>
                        
                    </SignedIn>
                    <SignedOut>

                     <Link href='/sign-in'>
              <li className='hidden md:inline text-slate-700 hover:underline'>
                Sign In
              </li>
            </Link>
                    </SignedOut>


                </ul>

            </div>
            <div className='bg-red-600 inline-block'>black</div>


        </header>
    );
};

export default Header;