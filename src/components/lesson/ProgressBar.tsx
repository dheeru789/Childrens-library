
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="bg-white/10 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 h-4 rounded-full transition-all duration-1000 relative"
                style={{ width: `${percentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="text-white text-sm font-medium">
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
