
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  icon: any;
  color: string;
  bgColor: string;
}

interface LessonHeaderProps {
  subject: Subject;
  lessonTitle: string;
  currentStep: number;
  totalSteps: number;
  interactionScore: number;
  onBack: () => void;
  onLogout: () => void;
}

const LessonHeader = ({ 
  subject, 
  lessonTitle, 
  currentStep, 
  totalSteps, 
  interactionScore, 
  onBack, 
  onLogout 
}: LessonHeaderProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 relative z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${subject.color} flex items-center justify-center`}>
            <subject.icon className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">{lessonTitle}</h1>
            <p className="text-white/80 text-sm">Step {currentStep} of {totalSteps} • Score: {interactionScore} points</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-white/20 rounded-full px-3 py-1 text-white text-sm">
            ⭐ Stars to earn: 3
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-white hover:bg-white/20">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonHeader;
