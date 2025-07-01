
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Star } from "lucide-react";

interface AgeSelectorProps {
  childName: string;
  onAgeSelect: (age: string) => void;
  onBack: () => void;
}

const AgeSelector = ({ childName, onAgeSelect, onBack }: AgeSelectorProps) => {
  const [selectedAge, setSelectedAge] = useState<string>("");

  const handleAgeSelection = () => {
    if (selectedAge) {
      onAgeSelect(selectedAge);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 animate-bounce">👶</div>
        <div className="absolute top-20 right-20 animate-pulse">🎂</div>
        <div className="absolute bottom-20 left-20 animate-bounce" style={{ animationDelay: '1s' }}>🎈</div>
        <div className="absolute bottom-10 right-10 animate-pulse" style={{ animationDelay: '2s' }}>🎉</div>
        <div className="absolute top-1/2 left-1/4 animate-bounce" style={{ animationDelay: '0.5s' }}>🌟</div>
        <div className="absolute top-1/3 right-1/3 animate-pulse" style={{ animationDelay: '1.5s' }}>🎪</div>
      </div>

      <div className="relative z-10 flex items-center justify-center p-4 min-h-screen">
        <Card className="w-full max-w-md shadow-2xl border-0 backdrop-blur-sm bg-white/95">
          <CardContent className="p-8 text-center">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="absolute top-4 left-4 p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="mb-6">
              <Star className="h-16 w-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Hi {childName}!</h2>
              <p className="text-gray-600">How old are you? This helps us create the perfect learning experience for you!</p>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((age) => (
                <Button
                  key={age}
                  variant={selectedAge === age.toString() ? "default" : "outline"}
                  className="aspect-square text-lg font-bold hover:scale-105 transition-transform"
                  onClick={() => setSelectedAge(age.toString())}
                >
                  {age}
                </Button>
              ))}
            </div>
            
            <Button
              onClick={handleAgeSelection}
              disabled={!selectedAge}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 text-lg disabled:opacity-50"
            >
              Let's Start Learning! 🚀
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgeSelector;
