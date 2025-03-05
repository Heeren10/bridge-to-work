
import { MapPin, Clock, DollarSign } from "lucide-react";
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

const JobCard = ({ job, onRefer }: JobCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="glass-card rounded-xl overflow-hidden card-hover"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{job.title}</h3>
          <span className="text-xs font-medium text-muted-foreground">{job.date}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{job.company}</p>
        
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin size={14} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock size={14} />
            <span>{job.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <DollarSign size={14} />
            <span>{job.salary}</span>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 animate-fade-in">
            <p className="text-sm mb-3">{job.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {job.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2 py-0.5 bg-accent text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
            {onRefer && (
              <button 
                className="w-full py-2 mt-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
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
