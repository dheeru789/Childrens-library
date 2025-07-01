
interface PerformanceTrackerProps {
  correctAnswers: number;
  interactionScore: number;
  selectedItems: string[];
  correctInteractions: number;
}

const PerformanceTracker = ({ 
  correctAnswers, 
  interactionScore, 
  selectedItems, 
  correctInteractions 
}: PerformanceTrackerProps) => {
  const stepProgress = correctInteractions ? Math.round((selectedItems.length / correctInteractions) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-4 text-center animate-pulse">
        <div className="text-2xl font-bold text-green-800">{correctAnswers}</div>
        <div className="text-sm text-green-600">Correct Answers</div>
      </div>
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-4 text-center animate-pulse" style={{ animationDelay: '0.2s' }}>
        <div className="text-2xl font-bold text-blue-800">{interactionScore}</div>
        <div className="text-sm text-blue-600">Total Points</div>
      </div>
      <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl p-4 text-center animate-pulse" style={{ animationDelay: '0.4s' }}>
        <div className="text-2xl font-bold text-purple-800">{stepProgress}%</div>
        <div className="text-sm text-purple-600">Step Progress</div>
      </div>
    </div>
  );
};

export default PerformanceTracker;
