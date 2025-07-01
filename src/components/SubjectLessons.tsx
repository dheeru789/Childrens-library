import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Video, HelpCircle, Star, Play, Award, Settings, LogOut, Gamepad2, Palette, Music, Brain, Zap, Target } from "lucide-react";
import LessonContent from "./LessonContent";

interface Subject {
  id: string;
  name: string;
  icon: any;
  color: string;
  bgColor: string;
}

interface SubjectLessonsProps {
  subject: Subject;
  childName: string;
  childAge: string;
  onBack: () => void;
  onLogout: () => void;
  onProgressUpdate: (subject: string, lessonId: number, stars: number) => void;
}

const SubjectLessons = ({ subject, childName, childAge, onBack, onLogout, onProgressUpdate }: SubjectLessonsProps) => {
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [completedLessons, setCompletedLessons] = useState<{[key: number]: number}>({});

  const getDetailedSubjectContent = (subjectId: string, age: string) => {
    const ageNum = parseInt(age);
    
    if (subjectId === "english") {
      const lessons = [
        // Beginner Level (Ages 3-4)
        { id: 1, title: "ABC Letters - Learning the Alphabet", type: "lesson", description: "Master the 26 letters that build all English words", difficulty: "Beginner" },
        { id: 2, title: "Letter Sounds and Phonics", type: "lesson", description: "Learn how each letter sounds in words", difficulty: "Beginner" },
        { id: 3, title: "Simple Words - CVC Words", type: "lesson", description: "Consonant-Vowel-Consonant words like CAT, DOG, SUN", difficulty: "Beginner" },
        { id: 4, title: "Animal Names and Sounds", type: "lesson", description: "Learn animal names and the sounds they make", difficulty: "Beginner" },
        { id: 5, title: "Colors and Shapes Around Us", type: "lesson", description: "Identify colors and basic shapes in our world", difficulty: "Beginner" },
        { id: 6, title: "Numbers 1-20 in English", type: "lesson", description: "Count and write numbers with proper pronunciation", difficulty: "Beginner" },
        
        // Intermediate Level (Ages 5-7)
        { id: 7, title: "My Family Members", type: "lesson", description: "Learn words for family relationships", difficulty: "Intermediate" },
        { id: 8, title: "Days of the Week", type: "lesson", description: "Seven days and their order in English", difficulty: "Intermediate" },
        { id: 9, title: "Months and Seasons", type: "lesson", description: "Learn about calendar months and weather seasons", difficulty: "Intermediate" },
        { id: 10, title: "Simple Sentences", type: "lesson", description: "Make your first complete sentences", difficulty: "Intermediate" },
        { id: 11, title: "Sight Words - Common Words", type: "lesson", description: "Learn frequently used words like 'the', 'and', 'is'", difficulty: "Intermediate" },
        { id: 12, title: "Rhyming Words and Poetry", type: "lesson", description: "Discover words that sound alike", difficulty: "Intermediate" },
        { id: 13, title: "Body Parts and Actions", type: "lesson", description: "Learn about our body and action words", difficulty: "Intermediate" },
        
        // Advanced Level (Ages 8+)
        { id: 14, title: "Story Reading - Goldilocks", type: "lesson", description: "Read and understand a classic fairy tale", difficulty: "Advanced" },
        { id: 15, title: "Grammar Basics - Nouns and Verbs", type: "lesson", description: "Learn about naming words and action words", difficulty: "Advanced" },
        { id: 16, title: "Descriptive Words - Adjectives", type: "lesson", description: "Words that describe things, people, and places", difficulty: "Advanced" },
        { id: 17, title: "Writing Complete Stories", type: "lesson", description: "Create your own stories with beginning, middle, and end", difficulty: "Advanced" },
        { id: 18, title: "Reading Comprehension", type: "lesson", description: "Understand and answer questions about stories", difficulty: "Advanced" },
        
        // Quizzes and Games
        { id: 19, title: "Letter Recognition Challenge", type: "quiz", description: "Test your knowledge of all 26 letters", difficulty: "Beginner" },
        { id: 20, title: "Word Building Quiz", type: "quiz", description: "Create words from given letters", difficulty: "Intermediate" },
        { id: 21, title: "Reading Comprehension Test", type: "quiz", description: "Answer questions about a short story", difficulty: "Advanced" },
        { id: 22, title: "Alphabet Adventure Game", type: "game", description: "Fun interactive game to practice letters", difficulty: "Beginner" },
        { id: 23, title: "Word Puzzle Challenge", type: "game", description: "Solve crosswords and word searches", difficulty: "Intermediate" },
        { id: 24, title: "Story Builder Game", type: "game", description: "Create amazing stories with picture prompts", difficulty: "Advanced" },
      ];
      
      return lessons.filter(lesson => {
        if (ageNum <= 4) return lesson.difficulty === "Beginner";
        if (ageNum <= 7) return lesson.difficulty !== "Advanced";
        return true;
      });
    }
    
    else if (subjectId === "telugu") {
      const lessons = [
        // Beginner Level
        { id: 1, title: "అక్షరమాల - Telugu Alphabet", type: "lesson", description: "తెలుగు అక్షరాలు మరియు వాటి ధ్వనులు", difficulty: "Beginner" },
        { id: 2, title: "అచ్చులు - Vowels (అ ఆ ఇ ఈ ఉ)", type: "lesson", description: "తెలుగు అచ్చుల పరిచయం మరియు ప్రయోగం", difficulty: "Beginner" },
        { id: 3, title: "హల్లులు - Consonants (క ఖ గ చ)", type: "lesson", description: "తెలుగు హల్లుల అభ్యాసం", difficulty: "Beginner" },
        { id: 4, title: "సంఖ్యలు - Numbers in Telugu", type: "lesson", description: "ఒకటి నుండి పది వరకు లెక్కలు", difficulty: "Beginner" },
        { id: 5, title: "రంగులు - Colors in Telugu", type: "lesson", description: "వివిధ రంగుల పేర్లు తెలుగులో", difficulty: "Beginner" },
        { id: 6, title: "జంతువులు - Animals in Telugu", type: "lesson", description: "వివిధ జంతువుల పేర్లు మరియు వాటి లక్షణాలు", difficulty: "Beginner" },
        
        // Intermediate Level
        { id: 7, title: "కుటుంబం - Family Relationships", type: "lesson", description: "కుటుంబ సభ్యుల పేర్లు మరియు సంబంధాలు", difficulty: "Intermediate" },
        { id: 8, title: "ఆహారం - Food Items", type: "lesson", description: "రోజువారీ ఆహార పదార్థాల పేర్లు", difficulty: "Intermediate" },
        { id: 9, title: "వారాలు మరియు నెలలు - Days and Months", type: "lesson", description: "వారం రోజులు మరియు నెలల పేర్లు", difficulty: "Intermediate" },
        { id: 10, title: "సాధారణ వాక్యాలు - Simple Sentences", type: "lesson", description: "తెలుగులో సరళమైన వాక్యాలు రూపొందించడం", difficulty: "Intermediate" },
        { id: 11, title: "పండ్లు మరియు కూరగాయలు - Fruits and Vegetables", type: "lesson", description: "వివిధ పండ్లు మరియు కూరగాయల పేర్లు", difficulty: "Intermediate" },
        
        // Advanced Level
        { id: 12, title: "చిన్న కథలు - Short Stories", type: "lesson", description: "నైతిక విలువలతో కూడిన చిన్న కథలు", difficulty: "Advanced" },
        { id: 13, title: "పద్యాలు - Telugu Poems", type: "lesson", description: "సరళమైన తెలుగు పద్యాలు మరియు వాటి అర్థం", difficulty: "Advanced" },
        { id: 14, title: "వ్యాకరణం - Basic Grammar", type: "lesson", description: "తెలుగు వ్యాకరణ ప్రాథమిక నియమాలు", difficulty: "Advanced" },
        { id: 15, title: "సంస్కృతి మరియు పండుగలు - Culture and Festivals", type: "lesson", description: "తెలుగు సంస్కృతి మరియు పండుగల గురించి", difficulty: "Advanced" },
        
        // Games and Quizzes
        { id: 16, title: "అక్షర పరీక్ష - Alphabet Test", type: "quiz", description: "తెలుగు అక్షరాల పరీక్ష", difficulty: "Beginner" },
        { id: 17, title: "పదాల పరీక్ష - Vocabulary Test", type: "quiz", description: "తెలుగు పదాల అర్థం తెలుసుకోవడం", difficulty: "Intermediate" },
        { id: 18, title: "అక్షర జట్టు - Letter Matching", type: "game", description: "అక్షరాలను జతపరచే ఆట", difficulty: "Beginner" },
        { id: 19, title: "పద పజిల్ - Word Puzzle", type: "game", description: "తెలుగు పదాలతో పజిల్ ఆట", difficulty: "Intermediate" },
      ];
      
      return lessons.filter(lesson => {
        if (ageNum <= 4) return lesson.difficulty === "Beginner";
        if (ageNum <= 7) return lesson.difficulty !== "Advanced";
        return true;
      });
    }
    
    else if (subjectId === "science") {
      const lessons = [
        // Beginner Level
        { id: 1, title: "Living and Non-Living Things", type: "lesson", description: "Understand what makes something alive vs non-alive", difficulty: "Beginner" },
        { id: 2, title: "Plants Around Us", type: "lesson", description: "Learn about different plants and their parts", difficulty: "Beginner" },
        { id: 3, title: "Animals and Their Homes", type: "lesson", description: "Where different animals live and why", difficulty: "Beginner" },
        { id: 4, title: "Our Amazing Body", type: "lesson", description: "Learn about body parts and their functions", difficulty: "Beginner" },
        { id: 5, title: "Day and Night", type: "lesson", description: "Why we have day and night cycles", difficulty: "Beginner" },
        { id: 6, title: "Hot and Cold", type: "lesson", description: "Understanding temperature and weather", difficulty: "Beginner" },
        
        // Intermediate Level
        { id: 7, title: "Weather and Seasons", type: "lesson", description: "Understanding different types of weather", difficulty: "Intermediate" },
        { id: 8, title: "The Water Cycle", type: "lesson", description: "How water moves around our planet", difficulty: "Intermediate" },
        { id: 9, title: "Our Solar System", type: "lesson", description: "Sun, Moon, planets and stars", difficulty: "Intermediate" },
        { id: 10, title: "Simple Machines", type: "lesson", description: "Tools that make work easier", difficulty: "Intermediate" },
        { id: 11, title: "States of Matter", type: "lesson", description: "Solid, liquid, and gas around us", difficulty: "Intermediate" },
        { id: 12, title: "Light and Shadow", type: "lesson", description: "How light creates shadows", difficulty: "Intermediate" },
        
        // Advanced Level
        { id: 13, title: "Food Chain and Ecosystem", type: "lesson", description: "How animals and plants depend on each other", difficulty: "Advanced" },
        { id: 14, title: "Taking Care of Our Environment", type: "lesson", description: "How to protect nature and our planet", difficulty: "Advanced" },
        { id: 15, title: "Energy and Forces", type: "lesson", description: "Understanding motion and energy", difficulty: "Advanced" },
        { id: 16, title: "Human Body Systems", type: "lesson", description: "How our body parts work together", difficulty: "Advanced" },
        
        // Games and Quizzes
        { id: 17, title: "Nature Quiz", type: "quiz", description: "Test your knowledge about living things", difficulty: "Beginner" },
        { id: 18, title: "Animal Habitat Quiz", type: "quiz", description: "Match animals with their homes", difficulty: "Intermediate" },
        { id: 19, title: "Animal Matching Game", type: "game", description: "Fun game to learn about animals", difficulty: "Beginner" },
        { id: 20, title: "Planet Explorer Adventure", type: "game", description: "Journey through our solar system", difficulty: "Intermediate" },
      ];
      
      return lessons.filter(lesson => {
        if (ageNum <= 4) return lesson.difficulty === "Beginner";
        if (ageNum <= 7) return lesson.difficulty !== "Advanced";
        return true;
      });
    }
    
    else if (subjectId === "arts") {
      const lessons = [
        // Beginner Level
        { id: 1, title: "Drawing with Basic Shapes", type: "creative", description: "Create amazing art using circles, squares, and triangles", difficulty: "Beginner" },
        { id: 2, title: "Color Mixing Magic", type: "creative", description: "Learn how colors blend to create new colors", difficulty: "Beginner" },
        { id: 3, title: "Clay Modeling Fun", type: "creative", description: "Sculpt animals and objects with virtual clay", difficulty: "Beginner" },
        { id: 4, title: "Finger Painting Adventures", type: "creative", description: "Create beautiful art with your fingers", difficulty: "Beginner" },
        { id: 5, title: "Pattern Making", type: "creative", description: "Learn to create repeating patterns", difficulty: "Beginner" },
        
        // Intermediate Level
        { id: 6, title: "Paper Craft Creations", type: "creative", description: "Make beautiful crafts with digital paper", difficulty: "Intermediate" },
        { id: 7, title: "Painting Like a Pro", type: "creative", description: "Learn different painting techniques", difficulty: "Intermediate" },
        { id: 8, title: "Collage Art Adventures", type: "creative", description: "Combine different materials for unique art", difficulty: "Intermediate" },
        { id: 9, title: "Music and Rhythm", type: "creative", description: "Create simple melodies and beats", difficulty: "Intermediate" },
        { id: 10, title: "Dance and Movement", type: "creative", description: "Express yourself through dance", difficulty: "Intermediate" },
        { id: 11, title: "Origami - Paper Folding", type: "creative", description: "Create amazing shapes by folding paper", difficulty: "Intermediate" },
        
        // Advanced Level
        { id: 12, title: "Story Illustration", type: "creative", description: "Draw pictures to tell stories", difficulty: "Advanced" },
        { id: 13, title: "Creative Writing Workshop", type: "creative", description: "Write your own imaginative stories", difficulty: "Advanced" },
        { id: 14, title: "Advanced Drawing Techniques", type: "creative", description: "Learn shading, perspective, and proportion", difficulty: "Advanced" },
        
        // Exploration and Projects
        { id: 15, title: "Virtual Art Gallery Tour", type: "exploration", description: "Explore famous artworks from around the world", difficulty: "Intermediate" },
        { id: 16, title: "Famous Artists Study", type: "exploration", description: "Learn about great artists in history", difficulty: "Advanced" },
        { id: 17, title: "Create Your Masterpiece Project", type: "project", description: "Design and create your own art project", difficulty: "Intermediate" },
      ];
      
      return lessons.filter(lesson => {
        if (ageNum <= 4) return lesson.difficulty === "Beginner";
        if (ageNum <= 7) return lesson.difficulty !== "Advanced";
        return true;
      });
    }
    
    else if (subjectId === "fun") {
      const lessons = [
        // Creative Games (All Ages)
        { id: 1, title: "Digital Drawing Playground", type: "interactive", description: "Free-form drawing with magical brushes and colors", difficulty: "Beginner" },
        { id: 2, title: "Rainbow Color Symphony", type: "interactive", description: "Create music by mixing colors", difficulty: "Beginner" },
        { id: 3, title: "Magic Paint Studio", type: "creative", description: "Paint with sparkles, stars, and magical effects", difficulty: "Beginner" },
        { id: 4, title: "Shape Monster Builder", type: "creative", description: "Build funny monsters using different shapes", difficulty: "Beginner" },
        
        // Puzzle Games
        { id: 5, title: "Animal Puzzle Adventures", type: "puzzle", description: "Solve jigsaw puzzles featuring cute animals", difficulty: "Beginner" },
        { id: 6, title: "Shape and Color Matching", type: "puzzle", description: "Match shapes and colors in fun patterns", difficulty: "Beginner" },
        { id: 7, title: "Memory Palace Game", type: "interactive", description: "Strengthen memory with fun card matching", difficulty: "Intermediate" },
        { id: 8, title: "Pattern Detective", type: "puzzle", description: "Find and complete missing patterns", difficulty: "Intermediate" },
        
        // Learning Games
        { id: 9, title: "Math Magic Playground", type: "interactive", description: "Learn numbers through magical games", difficulty: "Intermediate" },
        { id: 10, title: "Word Adventure Quest", type: "interactive", description: "Explore language through exciting word games", difficulty: "Intermediate" },
        { id: 11, title: "Counting Castle", type: "interactive", description: "Adventure game to practice counting and numbers", difficulty: "Beginner" },
        { id: 12, title: "Alphabet Zoo Safari", type: "interactive", description: "Meet animals while learning letters", difficulty: "Beginner" },
        
        // Story and Adventure Games
        { id: 13, title: "Story Builder Workshop", type: "creative", description: "Create your own interactive stories", difficulty: "Intermediate" },
        { id: 14, title: "Treasure Hunt Explorer", type: "adventure", description: "Solve clues and find hidden treasures", difficulty: "Intermediate" },
        { id: 15, title: "Mystery Detective Game", type: "adventure", description: "Use logic to solve fun mysteries", difficulty: "Advanced" },
        { id: 16, title: "Virtual Zoo Safari", type: "exploration", description: "Explore animals from around the world", difficulty: "Intermediate" },
        { id: 17, title: "Space Explorer Mission", type: "exploration", description: "Journey through space and discover planets", difficulty: "Advanced" },
        
        // Music and Movement Games
        { id: 18, title: "Dance Party Studio", type: "interactive", description: "Follow dance moves and create your own", difficulty: "Beginner" },
        { id: 19, title: "Musical Instrument Maker", type: "creative", description: "Create and play virtual instruments", difficulty: "Intermediate" },
        { id: 20, title: "Rhythm Master Challenge", type: "interactive", description: "Follow the beat and create rhythms", difficulty: "Intermediate" },
        
        // Science and Discovery Games
        { id: 21, title: "Virtual Science Laboratory", type: "interactive", description: "Conduct safe experiments in virtual lab", difficulty: "Advanced" },
        { id: 22, title: "Weather Station Game", type: "exploration", description: "Learn about weather while playing", difficulty: "Intermediate" },
        { id: 23, title: "Plant Growing Simulator", type: "interactive", description: "Grow and care for virtual plants", difficulty: "Intermediate" },
        
        // Creative Challenges
        { id: 24, title: "Invention Workshop", type: "creative", description: "Design and build amazing inventions", difficulty: "Advanced" },
        { id: 25, title: "Fashion Designer Studio", type: "creative", description: "Design clothes and accessories", difficulty: "Intermediate" },
        { id: 26, title: "Cookie Decorator Game", type: "creative", description: "Decorate virtual cookies with fun toppings", difficulty: "Beginner" },
        
        // Brain Training Games
        { id: 27, title: "Brain Teaser Challenge", type: "puzzle", description: "Fun puzzles to exercise your brain", difficulty: "Advanced" },
        { id: 28, title: "Speed Sorting Game", type: "interactive", description: "Sort objects quickly and accurately", difficulty: "Intermediate" },
        { id: 29, title: "Concentration Master", type: "interactive", description: "Improve focus with fun activities", difficulty: "Intermediate" },
        
        // Final Challenge
        { id: 30, title: "Game Designer Challenge", type: "project", description: "Design and create your own mini-games", difficulty: "Advanced" },
      ];
      
      return lessons.filter(lesson => {
        if (ageNum <= 4) return lesson.difficulty === "Beginner";
        if (ageNum <= 7) return lesson.difficulty !== "Advanced";
        return true;
      });
    }

    // Default structure for other subjects
    return [
      { id: 1, title: `Introduction to ${subjectId}`, type: "lesson", description: "Basic concepts and fundamentals", difficulty: "Beginner" },
      { id: 2, title: `${subjectId} Basics`, type: "lesson", description: "Building foundational knowledge", difficulty: "Beginner" },
      { id: 3, title: `Practice ${subjectId}`, type: "lesson", description: "Hands-on practice and application", difficulty: "Intermediate" },
    ];
  };

  const currentLessons = getDetailedSubjectContent(subject.id, childAge);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "lesson": return BookOpen;
      case "quiz": return HelpCircle;
      case "game": return Play;
      case "creative": return Palette;
      case "interactive": return Gamepad2;
      case "puzzle": return Brain;
      case "exploration": return Video;
      case "project": return Award;
      case "adventure": return Target;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lesson": return "from-blue-400 to-blue-600";
      case "quiz": return "from-green-400 to-green-600";
      case "game": case "interactive": return "from-orange-400 to-orange-600";
      case "creative": return "from-purple-400 to-purple-600";
      case "puzzle": return "from-pink-400 to-pink-600";
      case "exploration": return "from-cyan-400 to-cyan-600";
      case "project": return "from-red-400 to-red-600";
      case "adventure": return "from-yellow-400 to-yellow-600";
      default: return "from-gray-400 to-gray-600";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleLessonComplete = (lessonId: number, stars: number) => {
    setCompletedLessons(prev => ({
      ...prev,
      [lessonId]: stars
    }));
    onProgressUpdate(subject.id, lessonId, stars);
  };

  if (selectedLesson) {
    return (
      <LessonContent
        lesson={selectedLesson}
        subject={subject}
        childName={childName}
        childAge={childAge}
        onBack={() => setSelectedLesson(null)}
        onLogout={onLogout}
        onLessonComplete={handleLessonComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-10 animate-bounce text-2xl">📚</div>
        <div className="absolute top-20 right-20 animate-pulse text-2xl">✏️</div>
        <div className="absolute bottom-20 left-20 animate-bounce text-2xl" style={{ animationDelay: '1s' }}>🎨</div>
        <div className="absolute bottom-10 right-10 animate-pulse text-2xl" style={{ animationDelay: '2s' }}>🏆</div>
        <div className="absolute top-1/2 left-1/4 animate-bounce text-2xl" style={{ animationDelay: '0.5s' }}>⭐</div>
        <div className="absolute top-1/3 right-1/3 animate-pulse text-2xl" style={{ animationDelay: '1.5s' }}>🌈</div>
        <div className="absolute top-3/4 left-1/2 animate-bounce text-2xl" style={{ animationDelay: '2.5s' }}>🎈</div>
        <div className="absolute top-1/4 left-3/4 animate-pulse text-2xl" style={{ animationDelay: '3s' }}>🌟</div>
      </div>

      {/* Header */}
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
              <h1 className="text-white font-bold text-lg">{subject.name} Learning Center</h1>
              <p className="text-white/80 text-sm">Age {childAge} • {currentLessons.length} activities available</p>
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

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome to {subject.name} Adventures, {childName}! 🚀
          </h2>
          <p className="text-white/80 text-lg">
            {subject.id === "fun" 
              ? "Ready for some amazing games and activities? Let's have fun while learning!"
              : "Ready to explore, learn, and have fun? Let's start your learning journey!"
            }
          </p>
        </div>

        {/* Enhanced Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {currentLessons.map((lesson, index) => {
            const TypeIcon = getTypeIcon(lesson.type);
            const typeColor = getTypeColor(lesson.type);
            const isCompleted = completedLessons[lesson.id] > 0;
            const earnedStars = completedLessons[lesson.id] || 0;
            
            return (
              <Card
                key={lesson.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 bg-white/95 backdrop-blur-sm ${
                  isCompleted ? 'ring-2 ring-green-400 shadow-green-200' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedLesson(lesson)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${typeColor} flex items-center justify-center shadow-lg`}>
                      <TypeIcon className="h-6 w-6 text-white" />
                    </div>
                    {isCompleted && (
                      <div className="bg-green-100 rounded-full p-1">
                        <Award className="h-5 w-5 text-green-600" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">{lesson.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{lesson.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      lesson.type === 'lesson' ? 'bg-blue-100 text-blue-800' :
                      lesson.type === 'quiz' ? 'bg-green-100 text-green-800' :
                      lesson.type === 'creative' ? 'bg-purple-100 text-purple-800' :
                      lesson.type === 'puzzle' ? 'bg-pink-100 text-pink-800' :
                      lesson.type === 'adventure' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                    </span>
                    
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(lesson.difficulty)}`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= earnedStars
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {earnedStars > 0 && (
                      <span className="text-xs text-green-600 font-medium">
                        {earnedStars} star{earnedStars !== 1 ? 's' : ''} earned!
                      </span>
                    )}
                  </div>
                  
                  {!isCompleted ? (
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium">
                      {subject.id === "fun" ? "Let's Play! 🎮" : "Start Learning ✨"}
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                      {subject.id === "fun" ? "Play Again 🔄" : "Review Lesson 📖"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Progress Summary */}
        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-5xl mx-auto border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Your Amazing Progress in {subject.name} 🎯
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center mb-6">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-white mb-1">
                {Object.keys(completedLessons).length}
              </div>
              <div className="text-white/80 text-sm">{subject.id === "fun" ? "Games Played" : "Lessons Completed"}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-white mb-1">
                {Object.values(completedLessons).reduce((sum, stars) => sum + stars, 0)}
              </div>
              <div className="text-white/80 text-sm">Total Stars</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-white mb-1">
                {Math.round((Object.keys(completedLessons).length / currentLessons.length) * 100)}%
              </div>
              <div className="text-white/80 text-sm">Progress</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-white mb-1">
                {currentLessons.length - Object.keys(completedLessons).length}
              </div>
              <div className="text-white/80 text-sm">Remaining</div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-400 h-4 rounded-full transition-all duration-500 relative overflow-hidden"
              style={{ width: `${(Object.keys(completedLessons).length / currentLessons.length) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          
          <p className="text-center text-white/80 text-sm">
            {Object.keys(completedLessons).length === currentLessons.length
              ? `🎉 Congratulations! You've completed all ${subject.name} ${subject.id === "fun" ? "games" : "lessons"}! You're a superstar! 🌟`
              : `Keep going, ${childName}! You're doing amazing! 💪`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubjectLessons;
