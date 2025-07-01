
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, Star } from "lucide-react";

interface SplashScreenProps {
  onGetStarted: () => void;
}

const SplashScreen = ({ onGetStarted }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 flex items-center justify-center p-4">
      <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Logo */}
        <div className="flex items-center justify-center mb-8 animate-bounce">
          <div className="bg-white rounded-full p-6 shadow-2xl">
            <BookOpen className="h-16 w-16 text-purple-600" />
          </div>
          <Sparkles className="h-8 w-8 text-yellow-400 ml-4 animate-pulse" />
          <Star className="h-6 w-6 text-yellow-300 -ml-2 mt-2 animate-pulse" />
        </div>

        {/* Welcome Text */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
          Welcome to
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent animate-fade-in">
          Children's Library 📚
        </h2>
        
        <p className="text-xl text-white/90 mb-8 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Where Learning Becomes Adventure! Discover, explore, and grow with endless possibilities.
        </p>

        {/* Get Started Button */}
        <Button
          onClick={onGetStarted}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in"
          style={{ animationDelay: '1s' }}
        >
          Get Started 🚀
        </Button>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center space-x-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className="h-6 w-6 text-yellow-300 animate-pulse" 
              style={{ animationDelay: `${star * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
