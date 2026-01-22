// ...existing code...
import type { FC } from "react";
import { Link } from "react-router"
import {useEffect, useState} from 'react'
import ScoreCircle from "~/components/ScoreCircle";
import {usePuterStore} from "~/lib/puter"

const ResumeCard: FC<{ resume: Resume }> = ({ resume }) => {
  const { id, companyName, jobTitle, feedback, imagePath } = resume;
  const {fs} = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState(''); 
  useEffect(()=> {
        const loadResume=async() => {
          const blob = await fs.read(resume.imagePath);
          if(!blob) return;
          let url= URL.createObjectURL(blob);
          setResumeUrl(url);
        }
  
        loadResume();
      }, [resume.imagePath])
  

  return (
    <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
         {companyName && <h2 className="text-black! font-bold wrap-break-words">{companyName}</h2>} 
         {jobTitle && <h3 className="text-lg wrap-break-words text-gray-500">{jobTitle}</h3> }
         {!companyName && !jobTitle && <h2 className="text-black! font-bold "></h2>}
        </div>
        <div className="shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

     {resumeUrl && ( 
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-87.5 max-sm:h-50">
          <img
            src={imagePath}
            alt="resume"
            className="w-full h-87.5 max-sm:h-50 object-cover"
          />
        </div>
      </div>
     )}
    </Link>
  );
};

export default ResumeCard;
// ...existing code...