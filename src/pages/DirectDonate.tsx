
import { useState } from "react";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import { Check, Info } from "lucide-react";

const NGO_LIST = [
  {
    id: "1",
    name: "Haven Shelter",
    description: "Providing emergency shelter and meals for those experiencing homelessness.",
    logo: "https://placehold.co/100",
    impact: "Served over 5,000 individuals last year."
  },
  {
    id: "2",
    name: "New Beginnings Center",
    description: "Supporting individuals with job training and housing assistance.",
    logo: "https://placehold.co/100",
    impact: "Helped 240 people secure jobs and 180 find stable housing last year."
  },
  {
    id: "3",
    name: "Community Health Clinic",
    description: "Providing free or low-cost healthcare services to those in need.",
    logo: "https://placehold.co/100",
    impact: "Delivered healthcare to 3,600 uninsured patients last year."
  },
  {
    id: "4",
    name: "Future Skills Initiative",
    description: "Training programs to build marketable skills for sustainable careers.",
    logo: "https://placehold.co/100",
    impact: "Graduated 420 students with job placement rate of 78%."
  }
];

const DonationOption = ({ name, amount, selected, onSelect }: { 
  name: string; 
  amount: string; 
  selected: boolean; 
  onSelect: () => void 
}) => (
  <button
    className={`border rounded-lg p-4 text-center transition-all ${
      selected 
        ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
        : 'border-border hover:border-primary/30'
    }`}
    onClick={onSelect}
  >
    <p className="text-xl font-bold mb-1">${amount}</p>
    <p className="text-sm text-muted-foreground">{name}</p>
  </button>
);

const DirectDonate = () => {
  const [selectedNGO, setSelectedNGO] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donationSuccess, setDonationSuccess] = useState(false);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process payment
    setDonationSuccess(true);
    setTimeout(() => {
      setDonationSuccess(false);
      setSelectedNGO("");
      setDonationAmount("");
      setCustomAmount("");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header title="Direct Donate" />
      
      <main className="flex-1 container-padding max-w-screen-lg mx-auto">
        <div className="mb-6">
          <BackButton to="/select-type" />
        </div>
        
        <h1 className="heading-2 mb-2">Donate to Support Services</h1>
        <p className="text-muted-foreground mb-8">
          Your donation helps create sustainable solutions
        </p>
        
        <div className="mb-6 glass-card rounded-lg p-4 flex items-start gap-3">
          <Info size={20} className="text-primary mt-0.5" />
          <div>
            <p className="font-medium">Why Donate Through Bridge to Work?</p>
            <p className="text-sm text-muted-foreground">
              Your donation supports organizations that provide job training, housing assistance, 
              healthcare, and other critical services that help people build sustainable futures.
            </p>
          </div>
        </div>
        
        {donationSuccess ? (
          <div className="glass-card rounded-xl p-8 text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-600" size={32} />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Thank You for Your Donation!</h2>
            <p className="text-muted-foreground mb-6">
              Your contribution will help create meaningful change.
            </p>
            <button
              onClick={() => setDonationSuccess(false)}
              className="btn-primary"
            >
              Make Another Donation
            </button>
          </div>
        ) : (
          <form onSubmit={handleDonate} className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Select an Organization</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {NGO_LIST.map(ngo => (
                  <button
                    key={ngo.id}
                    type="button"
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-all text-left ${
                      selectedNGO === ngo.id 
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                        : 'border-border hover:border-primary/30'
                    }`}
                    onClick={() => setSelectedNGO(ngo.id)}
                  >
                    <div className="w-12 h-12 bg-accent rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="font-medium">{ngo.name}</h3>
                      <p className="text-xs text-muted-foreground">{ngo.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Choose Amount</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <DonationOption 
                  name="One Meal" 
                  amount="10" 
                  selected={donationAmount === "10"}
                  onSelect={() => {
                    setDonationAmount("10");
                    setCustomAmount("");
                  }}
                />
                <DonationOption 
                  name="One Day" 
                  amount="25" 
                  selected={donationAmount === "25"}
                  onSelect={() => {
                    setDonationAmount("25");
                    setCustomAmount("");
                  }}
                />
                <DonationOption 
                  name="One Week" 
                  amount="50" 
                  selected={donationAmount === "50"}
                  onSelect={() => {
                    setDonationAmount("50");
                    setCustomAmount("");
                  }}
                />
                <DonationOption 
                  name="One Month" 
                  amount="100" 
                  selected={donationAmount === "100"}
                  onSelect={() => {
                    setDonationAmount("100");
                    setCustomAmount("");
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="customAmount" className="text-sm font-medium">
                  Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <input
                    id="customAmount"
                    type="text"
                    className="input-field w-full pl-8"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setDonationAmount("");
                    }}
                  />
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={!selectedNGO || (!donationAmount && !customAmount)}
            >
              Proceed to Payment
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default DirectDonate;
