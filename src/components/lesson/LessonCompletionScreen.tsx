
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star } from "lucide-react";

interface LessonCompletionScreenProps {
  childName: string;
  lessonTitle: string;
  earnedStars: number;
  correctAnswers: number;
  interactionScore: number;
  totalPossibleScore: number;
  onBack: () => void;
}

const LessonCompletionScreen = ({ 
  childName, 
  lessonTitle, 
  earnedStars, 
  correctAnswers, 
  interactionScore, 
  totalPossibleScore, 
  onBack 
}: LessonCompletionScreenProps) => {
  const percentage = Math.round((interactionScore / totalPossibleScore) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 relative overflow-hidden">
      {/* Enhanced celebration animation */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce text-4xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {['🎉', '🏆', '⭐', '🎊', '🌟', '🎈', '🎯', '💫'][Math.floor(Math.random() * 8)]}
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center p-4 min-h-screen relative z-10">
        <Card className="w-full max-w-lg shadow-2xl border-0 backdrop-blur-sm bg-white/95 animate-scale-in">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Trophy className="h-24 w-24 text-yellow-500 mx-auto mb-4 animate-pulse" />
              <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
                🌟 Outstanding Work, {childName}! 🌟
              </h2>
              <p className="text-xl text-gray-600 mb-4">You completed "{lessonTitle}"!</p>
              
              {/* Detailed Performance Breakdown */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">📊 Your Amazing Performance!</h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">✅ Correct Interactions:</span>
                    <span className="font-bold text-green-600">{correctAnswers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">🎯 Total Score:</span>
                    <span className="font-bold text-blue-600">{interactionScore} points</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">📈 Performance:</span>
                    <span className="font-bold text-purple-600">{percentage}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3].map((star) => (
                  <Star
                    key={star}
                    className={`h-10 w-10 ${
                      star <= earnedStars
                        ? 'text-yellow-400 fill-current animate-pulse'
                        : 'text-gray-300'
                    }`}
                    style={{ animationDelay: `${star * 300}ms` }}
                  />
                ))}
              </div>
              
              <p className="text-lg text-gray-600 mb-4 font-semibold">You earned {earnedStars} stars! ⭐</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-gray-700 font-medium">
                  {earnedStars === 3 ? "🏆 Perfect! You're a superstar learner! Every interaction was correct!" :
                   earnedStars === 2 ? "🌟 Excellent work! You understood almost everything perfectly!" :
                   "👏 Great effort! You're learning and improving with each lesson!"}
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => onBack()}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-4 text-xl animate-pulse"
            >
              Continue Your Learning Adventure! 🚀
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LessonCompletionScreen;
