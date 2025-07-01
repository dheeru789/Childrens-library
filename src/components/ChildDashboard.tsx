
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Heart, Palette, Microscope, Globe, Gamepad2, Settings, Star, Trophy, LogOut, Languages } from "lucide-react";
import SubjectLessons from "./SubjectLessons";

interface ChildDashboardProps {
  childName: string;
  childAge: string;
  onLogout: () => void;
  onProgressUpdate: (subject: string, lessonId: number, stars: number) => void;
}

const ChildDashboard = ({ childName, childAge, onLogout, onProgressUpdate }: ChildDashboardProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects = [
    { id: "english", name: "English", icon: BookOpen, color: "from-blue-400 to-blue-600", bgColor: "bg-blue-50" },
    { id: "telugu", name: "Telugu", icon: Languages, color: "from-orange-400 to-red-500", bgColor: "bg-orange-50" },
    { id: "hindi", name: "Hindi", icon: Languages, color: "from-green-400 to-emerald-500", bgColor: "bg-green-50" },
    { id: "social", name: "Social", icon: Globe, color: "from-teal-400 to-green-500", bgColor: "bg-teal-50" },
    { id: "science", name: "Science", icon: Microscope, color: "from-cyan-400 to-blue-500", bgColor: "bg-cyan-50" },
    { id: "arts", name: "Arts", icon: Palette, color: "from-purple-400 to-pink-500", bgColor: "bg-purple-50" },
    { id: "fun", name: "Fun", icon: Gamepad2, color: "from-yellow-400 to-orange-500", bgColor: "bg-yellow-50" },
  ];

  if (selectedSubject) {
    return (
      <SubjectLessons
        subject={subjects.find(s => s.id === selectedSubject)!}
        childName={childName}
        childAge={childAge}
        onBack={() => setSelectedSubject(null)}
        onLogout={onLogout}
        onProgressUpdate={onProgressUpdate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-10 animate-bounce text-2xl">👨‍🎓</div>
        <div className="absolute top-20 right-20 animate-pulse text-2xl">📖</div>
        <div className="absolute bottom-20 left-20 animate-bounce text-2xl" style={{ animationDelay: '1s' }}>✏️</div>
        <div className="absolute bottom-10 right-10 animate-pulse text-2xl" style={{ animationDelay: '2s' }}>🎒</div>
        <div className="absolute top-1/2 left-1/4 animate-bounce text-2xl" style={{ animationDelay: '0.5s' }}>🏆</div>
        <div className="absolute top-1/3 right-1/3 animate-pulse text-2xl" style={{ animationDelay: '1.5s' }}>🌈</div>
        <div className="absolute top-3/4 left-1/2 animate-bounce text-2xl" style={{ animationDelay: '2.5s' }}>🚀</div>
        <div className="absolute top-1/4 left-3/4 animate-pulse text-2xl" style={{ animationDelay: '3s' }}>⭐</div>
        <div className="absolute top-2/3 left-1/6 animate-bounce text-2xl" style={{ animationDelay: '4s' }}>🎈</div>
        <div className="absolute top-1/6 right-1/4 animate-pulse text-2xl" style={{ animationDelay: '4.5s' }}>🎨</div>
      </div>

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 relative z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">Children's Library</h1>
              <p className="text-white/80 text-sm">Age: {childAge} years • Learning Made Fun!</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout} className="text-white hover:bg-white/20">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Enhanced Welcome Message */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8 animate-fade-in">
            <div className="text-6xl mb-4 animate-pulse">🌟</div>
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Welcome back, {childName}! 
            </h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
              <p className="text-xl text-white/95 mb-3 font-medium">
                You have amazing potential and endless possibilities!
              </p>
              <p className="text-lg text-white/85 mb-3">
                Every lesson you learn makes you smarter and stronger! 💪
              </p>
              <p className="text-2xl text-white font-semibold">
                Ready for today's learning adventure? 🚀
              </p>
            </div>
          </div>

          {/* Enhanced Subject Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-8">
            {subjects.map((subject, index) => (
              <Card
                key={subject.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-2xl border-0 ${subject.bgColor} animate-fade-in backdrop-blur-sm bg-white/90 hover:bg-white/95`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setSelectedSubject(subject.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${subject.color} flex items-center justify-center mx-auto mb-4 shadow-xl hover:shadow-2xl transition-shadow`}>
                    <subject.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-3">{subject.name}</h3>
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 font-medium">Tap to explore!</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced Progress Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-5xl mx-auto border border-white/20 animate-fade-in">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-3 mb-2">
                <Trophy className="h-8 w-8 text-yellow-400" />
                Your Amazing Learning Journey
                <Trophy className="h-8 w-8 text-yellow-400" />
              </h3>
              <p className="text-white/80">Look how much you've grown and learned!</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white/15 rounded-xl p-6 hover:bg-white/20 transition-colors">
                <div className="text-4xl font-bold text-white mb-2">24</div>
                <div className="text-white/80 font-medium">Lessons Completed</div>
                <div className="text-2xl mt-2">📚</div>
              </div>
              <div className="bg-white/15 rounded-xl p-6 hover:bg-white/20 transition-colors">
                <div className="text-4xl font-bold text-white mb-2">67</div>
                <div className="text-white/80 font-medium">Stars Earned</div>
                <div className="text-2xl mt-2">⭐</div>
              </div>
              <div className="bg-white/15 rounded-xl p-6 hover:bg-white/20 transition-colors">
                <div className="text-4xl font-bold text-white mb-2">7</div>
                <div className="text-white/80 font-medium">Subjects Explored</div>
                <div className="text-2xl mt-2">🎯</div>
              </div>
              <div className="bg-white/15 rounded-xl p-6 hover:bg-white/20 transition-colors">
                <div className="text-4xl font-bold text-white mb-2">12h</div>
                <div className="text-white/80 font-medium">Learning Time</div>
                <div className="text-2xl mt-2">⏰</div>
              </div>
            </div>
            
            {/* Motivational message */}
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl p-4 border border-yellow-400/30">
                <p className="text-white font-semibold text-lg">
                  🌟 You're doing AMAZING, {childName}! Keep learning and growing! 🌟
                </p>
                <p className="text-white/80 text-sm mt-2">
                  Every day you learn something new, you become more awesome!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildDashboard;
