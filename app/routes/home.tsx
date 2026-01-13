
import type { Route } from "./+types/home";

import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "~/constants";
import { useEffect } from 'react';
import { usePuterStore } from '~/lib/puter';
import {useLocation, useNavigate} from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job" },
  ];
}

export default function Home() {

const { auth} = usePuterStore();
     
    const location=useLocation();
    const next= location.search.split('next=')[1];
    const navigate=useNavigate();

    
    useEffect (()=> {
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    },[auth.isAuthenticated])

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>

        {resumes.length > 0 && (
         <div className="
                     grid
                     grid-cols-1
                     sm:grid-cols-2
                     lg:grid-cols-3
                      gap-6 " >
               {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
