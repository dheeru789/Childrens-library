
import { Button } from "@/components/ui/button";
import { CheckCircle, RotateCcw } from "lucide-react";

interface LessonNavigationProps {
  currentStep: number;
  totalSteps: number;
  selectedItems: string[];
  correctInteractions: number;
  onNextStep: () => void;
  onReset: () => void;
}

const LessonNavigation = ({ 
  currentStep, 
  totalSteps, 
  selectedItems, 
  correctInteractions, 
  onNextStep, 
  onReset 
}: LessonNavigationProps) => {
  const isComplete = selectedItems.length >= correctInteractions;

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
          Step {currentStep} of {totalSteps}
        </div>
        <Button variant="outline" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
      
      <Button
        onClick={onNextStep}
        disabled={!isComplete}
        className={`font-semibold px-8 py-4 text-lg transition-all duration-300 ${
          isComplete
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white animate-pulse'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {currentStep < totalSteps ? "Next Step" : "Complete Lesson"} 
        <CheckCircle className="h-5 w-5 ml-2" />
      </Button>
    </div>
  );
};

export default LessonNavigation;
