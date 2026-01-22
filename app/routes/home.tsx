
import type { Route } from "./+types/home";

import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { useEffect } from 'react';
import { usePuterStore } from '~/lib/puter';
import {useNavigate} from "react-router";
import {useState} from 'react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job" },
  ];
}

export default function Home() {

const { auth, kv} = usePuterStore();
     
    const navigate=useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);
    
    
    useEffect(() => {
        if (!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated, navigate]);

    useEffect(()=> {
      const loadResumes = async () => {
        setLoadingResumes(true);

        const items = (await kv.list('resume:*', true)) as KVItem[] | string[] | undefined;

        const parsedResumes = Array.isArray(items)
          ? (items as KVItem[]).map((r) => JSON.parse(r.value) as Resume)
          : [];

        console.log('parsedResumes', parsedResumes);
        setResumes(parsedResumes || []);
        setLoadingResumes(false);
      };

      loadResumes();
    }, [kv]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          {!loadingResumes && resumes?.length === 0 ? (

          
           <h2>Review your submissions and check AI-powered feedback.</h2>
          ):(
           <h2>Review your submissions and check AI-powered feedback.</h2>
        )}
        </div> 
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-50" />
          </div>
        )}
        {!loadingResumes && resumes.length > 0 && (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
