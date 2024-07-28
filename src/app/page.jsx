"use client";
import { makeItResponsive } from '@/utils/function';
import { useEffect } from 'react';
import { app } from './firebaseConfig';
import { makeAppResponsive } from './cocktail';


export default  function Home() {
  useEffect(()=>{
    makeItResponsive();
  },[]);

  return <main>
    helloolasad
  </main>;
}
