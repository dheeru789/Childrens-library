
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import LessonHeader from "./lesson/LessonHeader";
import ProgressBar from "./lesson/ProgressBar";
import PerformanceTracker from "./lesson/PerformanceTracker";
import InteractiveActivity from "./lesson/InteractiveActivity";
import LessonCompletionScreen from "./lesson/LessonCompletionScreen";
import LessonNavigation from "./lesson/LessonNavigation";

interface Lesson {
  id: number;
  title: string;
  type: string;
  completed: boolean;
  stars: number;
}

interface Subject {
  id: string;
  name: string;
  icon: any;
  color: string;
  bgColor: string;
}

interface LessonContentProps {
  lesson: Lesson;
  subject: Subject;
  childName: string;
  childAge: string;
  onBack: () => void;
  onLogout: () => void;
  onLessonComplete: (lessonId: number, stars: number) => void;
}

const LessonContent = ({ lesson, subject, childName, childAge, onBack, onLogout, onLessonComplete }: LessonContentProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [interactionScore, setInteractionScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const getDetailedLessonContent = () => {
    if (subject.id === "english" && lesson.id === 1) {
      return {
        title: "ABC Letters - The Beginning of Reading Adventure",
        steps: [
          {
            title: "Meet Your First Letters A-F",
            content: `Hello ${childName}! 🌟 Today we're going on an amazing letter adventure! Letters are like magical keys that unlock the world of reading. Each letter has its own special sound and helps us make beautiful words. Are you ready to meet your first letter friends?`,
            activity: "alphabet-intro",
            image: "🔤",
            description: "Click on each letter to hear its sound and see it come alive!",
            interactiveElements: ['A', 'B', 'C', 'D', 'E', 'F'],
            correctInteractions: 6
          },
          {
            title: "Letter Sounds and Recognition",
            content: `Amazing work, ${childName}! 🎉 Now let's learn the special sounds each letter makes. When we see the letter 'A', it says 'Ah' like in 'Apple'. Listen carefully and repeat after me!`,
            activity: "phonics-practice",
            image: "🗣️",
            description: "Listen to each sound and match it with the correct letter!",
            interactiveElements: [
              { letter: 'A', sound: 'Ah', word: 'Apple', emoji: '🍎' },
              { letter: 'B', sound: 'Buh', word: 'Ball', emoji: '⚽' },
              { letter: 'C', sound: 'Kuh', word: 'Cat', emoji: '🐱' },
              { letter: 'D', sound: 'Duh', word: 'Dog', emoji: '🐶' },
              { letter: 'E', sound: 'Eh', word: 'Egg', emoji: '🥚' },
              { letter: 'F', sound: 'Fuh', word: 'Fish', emoji: '🐟' }
            ],
            correctInteractions: 6
          },
          {
            title: "Letter Writing Practice",
            content: `Fantastic! 🌈 Now let's practice writing these letters. Writing helps our brain remember letters better. Trace each letter carefully - start at the top and follow the arrows!`,
            activity: "letter-tracing",
            image: "✏️",
            description: "Trace each letter 3 times to master the shape!",
            interactiveElements: ['A', 'B', 'C', 'D', 'E', 'F'],
            correctInteractions: 18
          }
        ]
      };
    }

    if (subject.id === "science" && lesson.id === 1) {
      return {
        title: "Living and Non-Living Things - Nature's Wonders",
        steps: [
          {
            title: "What Makes Something Alive?",
            content: `Hi ${childName}! 🌱 Let's explore the amazing world around us! Everything we see is either living or non-living. Living things are special - they grow, breathe, eat food, and can have babies. Non-living things are also important, but they don't do these activities.`,
            activity: "living-nonliving-intro",
            image: "🌍",
            description: "Look at these examples and learn what makes them special!",
            interactiveElements: [
              { item: '🌳', type: 'living', reason: 'Trees grow, breathe, and make seeds' },
              { item: '🐶', type: 'living', reason: 'Dogs breathe, eat, and have puppies' },
              { item: '🪑', type: 'non-living', reason: 'Chairs don\'t grow or breathe' },
              { item: '🚗', type: 'non-living', reason: 'Cars are made by people' }
            ],
            correctInteractions: 4
          },
          {
            title: "Sorting Game - Living vs Non-Living",
            content: "Great job learning! Now let's play a sorting game. Drag each item to the correct box - Living or Non-Living!",
            activity: "living-nonliving-sort",
            image: "🎯",
            description: "Drag and drop items into the correct categories!",
            interactiveElements: ['🌸', '🦋', '📱', '⚽', '🐱', '🪨', '🌿', '🏠'],
            correctInteractions: 8
          }
        ]
      };
    }

    // Default structure
    return {
      title: lesson.title,
      steps: [
        {
          title: "Interactive Learning",
          content: `Welcome ${childName}! Let's explore ${lesson.title} together with fun activities!`,
          activity: "general-activity",
          image: "📚",
          description: "Click to interact and learn!",
          interactiveElements: ['🌟', '🎯', '🚀', '🏆'],
          correctInteractions: 4
        }
      ]
    };
  };

  const lessonData = getDetailedLessonContent();
  const totalSteps = lessonData.steps.length;
  const currentStepData = lessonData.steps[currentStep - 1];

  const handleInteraction = (item: any, isCorrect: boolean = true) => {
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setInteractionScore(prev => prev + 10);
      
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1000);
      
      if (!selectedItems.includes(item)) {
        setSelectedItems(prev => [...prev, item]);
      }
    }
  };

  const calculateStars = () => {
    const totalPossibleScore = lessonData.steps.reduce((sum, step) => sum + (step.correctInteractions * 10), 0);
    const percentage = (interactionScore / totalPossibleScore) * 100;
    
    if (percentage >= 90) return 3;
    if (percentage >= 70) return 2;
    if (percentage >= 50) return 1;
    return 1;
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setSelectedItems([]);
    } else {
      const finalStars = calculateStars();
      setLessonCompleted(true);
      setEarnedStars(finalStars);
      onLessonComplete(lesson.id, finalStars);
    }
  };

  const handleReset = () => {
    setSelectedItems([]);
  };

  if (lessonCompleted) {
    const totalPossibleScore = lessonData.steps.reduce((sum, step) => sum + (step.correctInteractions * 10), 0);
    
    return (
      <LessonCompletionScreen
        childName={childName}
        lessonTitle={lesson.title}
        earnedStars={earnedStars}
        correctAnswers={correctAnswers}
        interactionScore={interactionScore}
        totalPossibleScore={totalPossibleScore}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 relative overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl"
            style={{
              top: `${10 + (i * 5)}%`,
              left: `${5 + (i * 6)}%`,
              animation: `bounce 2s infinite ${i * 0.5}s`
            }}
          >
            {['📚', '✏️', '🎨', '🏆', '⭐', '🌈', '🎈', '🌟', '🎯', '💫', '🚀', '🎭', '🎵', '🌸', '🦋'][i]}
          </div>
        ))}
      </div>

      <LessonHeader
        subject={subject}
        lessonTitle={lessonData.title}
        currentStep={currentStep}
        totalSteps={totalSteps}
        interactionScore={interactionScore}
        onBack={onBack}
        onLogout={onLogout}
      />

      <ProgressBar
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      {showFeedback && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">Great job! +10 points</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Card className="max-w-6xl mx-auto shadow-2xl border-0 backdrop-blur-sm bg-white/95">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-8xl mb-6">{currentStepData.image}</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {currentStepData.title}
              </h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  {currentStepData.content}
                </p>
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 border border-blue-200">
                  <p className="text-lg text-blue-800 font-medium">
                    {currentStepData.description}
                  </p>
                </div>
              </div>
            </div>

            <InteractiveActivity
              activity={currentStepData.activity}
              interactiveElements={currentStepData.interactiveElements}
              selectedItems={selectedItems}
              onInteraction={handleInteraction}
              correctInteractions={currentStepData.correctInteractions}
            />

            <PerformanceTracker
              correctAnswers={correctAnswers}
              interactionScore={interactionScore}
              selectedItems={selectedItems}
              correctInteractions={currentStepData.correctInteractions}
            />

            <LessonNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              selectedItems={selectedItems}
              correctInteractions={currentStepData.correctInteractions || 0}
              onNextStep={handleNextStep}
              onReset={handleReset}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LessonContent;
