
import { MapPin, Clock, Briefcase, Calendar } from "lucide-react";
import { useState } from "react";

export interface JobData {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  duration: string;
  skills: string[];
  date: string;
}

interface JobCardProps {
  job: JobData;
  onRefer?: (job: JobData) => void;
}

// Custom icon for rupees
const RupeeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-indian-rupee"
  >
    <path d="M6 3h12" />
    <path d="M6 8h12" />
    <path d="m6 13 8.5 8" />
    <path d="M6 13h3" />
    <path d="M9 13c6.667 0 6.667-10 0-10" />
  </svg>
);

const JobCard = ({ job, onRefer }: JobCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format salary to always use ₹ symbol
  const formattedSalary = job.salary.startsWith('₹') ? job.salary : job.salary.replace('$', '₹');

  return (
    <div 
      className="glass-card rounded-xl overflow-hidden card-hover transition-all duration-300 border-l-4 border-l-primary"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-full">
              <Briefcase size={16} className="text-white" />
            </div>
            <h3 className="font-semibold text-lg">{job.title}</h3>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
            <Calendar size={12} />
            <span className="text-xs font-medium">{job.date}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1 ml-10">{job.company}</p>
        
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin size={14} className="text-rose-500" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock size={14} className="text-blue-500" />
            <span>{job.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-green-700">
            <RupeeIcon />
            <span>{formattedSalary}</span>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 animate-fade-in">
            <p className="text-sm mb-3">{job.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {job.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2.5 py-0.5 bg-gradient-to-r from-primary/10 to-primary/20 text-primary text-xs rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
            {onRefer && (
              <button 
                className="w-full py-2 mt-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-blue-600 rounded-lg hover:from-primary/90 hover:to-blue-700 transition-colors shadow-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRefer(job);
                }}
              >
                Refer This Opportunity
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
