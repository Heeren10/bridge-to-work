
import { useState } from "react";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import { Check } from "lucide-react";

const Recruiter = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
    duration: "",
    skills: "",
    startDate: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a server
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: "",
        company: "",
        location: "",
        description: "",
        salary: "",
        duration: "",
        skills: "",
        startDate: ""
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header title="Post a Job" />
      
      <main className="flex-1 container-padding max-w-screen-md mx-auto">
        <div className="mb-6">
          <BackButton to="/select-type" />
        </div>
        
        <h1 className="heading-2 mb-2">Create Job Opportunity</h1>
        <p className="text-muted-foreground mb-8">
          Post a job opportunity to help someone in need
        </p>
        
        <div className="glass-card rounded-xl p-6">
          {submitted ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Job Posted Successfully</h3>
              <p className="text-muted-foreground">
                Thank you for creating an opportunity!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Job Title <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    className="input-field w-full"
                    placeholder="e.g. Garden Assistant"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Company/Organization <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    className="input-field w-full"
                    placeholder="e.g. Green City Initiative"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    className="input-field w-full"
                    placeholder="e.g. Downtown"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="salary" className="text-sm font-medium">
                    Pay Rate <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="salary"
                    name="salary"
                    type="text"
                    required
                    className="input-field w-full"
                    placeholder="e.g. $15/hour or $100/day"
                    value={formData.salary}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="duration" className="text-sm font-medium">
                    Duration <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="duration"
                    name="duration"
                    type="text"
                    required
                    className="input-field w-full"
                    placeholder="e.g. 1 day, 1 week, Ongoing"
                    value={formData.duration}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="startDate" className="text-sm font-medium">
                    Start Date <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="startDate"
                    name="startDate"
                    type="text"
                    required
                    className="input-field w-full"
                    placeholder="e.g. Today, Tomorrow, Oct 15"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="skills" className="text-sm font-medium">
                  Required Skills
                </label>
                <input
                  id="skills"
                  name="skills"
                  type="text"
                  className="input-field w-full"
                  placeholder="e.g. No experience needed, Physical work, Basic English"
                  value={formData.skills}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple skills with commas
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Job Description <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  className="input-field w-full resize-none"
                  placeholder="Describe the job, requirements, and any additional details..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full"
              >
                Post Job
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default Recruiter;
