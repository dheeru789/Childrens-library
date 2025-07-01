
import { Button } from "@/components/ui/button";
import { Volume2, CheckCircle } from "lucide-react";

interface InteractiveActivityProps {
  activity: string;
  interactiveElements: any[];
  selectedItems: string[];
  onInteraction: (item: any, isCorrect?: boolean) => void;
  correctInteractions: number;
}

const InteractiveActivity = ({ 
  activity, 
  interactiveElements, 
  selectedItems, 
  onInteraction, 
  correctInteractions 
}: InteractiveActivityProps) => {
  const renderActivity = () => {
    if (activity === "alphabet-intro") {
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6 text-purple-800">🎭 Letter Theater - Meet Your Letter Friends!</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
            {interactiveElements.map((letter, index) => (
              <div 
                key={letter} 
                className={`bg-white rounded-xl p-6 shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer border-4 ${
                  selectedItems.includes(letter) ? 'border-green-400 bg-green-50' : 'border-purple-200 hover:border-purple-400'
                }`}
                onClick={() => onInteraction(letter, true)}
              >
                <div className="text-4xl font-bold text-purple-600 mb-2">{letter}</div>
                <div className="text-sm text-gray-600">{letter.toLowerCase()}</div>
                {selectedItems.includes(letter) && (
                  <div className="mt-2 text-green-600">
                    <Volume2 className="h-4 w-4 mx-auto" />
                    <div className="text-xs">Great!</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4">
            <p className="text-lg text-gray-700 font-medium">
              🎵 Click each letter to hear its magical sound! You've clicked {selectedItems.length} out of {correctInteractions} letters!
            </p>
          </div>
        </div>
      );
    }

    if (activity === "phonics-practice") {
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6 text-blue-800">🎵 Sound Symphony - Learn Letter Sounds!</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {interactiveElements.map((item, index) => (
              <div 
                key={item.letter} 
                className={`bg-white rounded-xl p-6 shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-4 ${
                  selectedItems.includes(item.letter) ? 'border-green-400 bg-green-50' : 'border-blue-200 hover:border-blue-400'
                }`}
                onClick={() => onInteraction(item.letter, true)}
              >
                <div className="text-5xl mb-2">{item.emoji}</div>
                <div className="text-3xl font-bold text-blue-600 mb-1">{item.letter}</div>
                <div className="text-lg text-gray-700 mb-1">"{item.sound}"</div>
                <div className="text-sm text-gray-600">{item.word}</div>
                {selectedItems.includes(item.letter) && (
                  <div className="mt-2 text-green-600">
                    <CheckCircle className="h-5 w-5 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4">
            <p className="text-lg text-gray-700 font-medium">
              🎯 Progress: {selectedItems.length}/{correctInteractions} sounds learned!
            </p>
          </div>
        </div>
      );
    }

    if (activity === "letter-tracing") {
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6 text-green-800">✍️ Letter Art Studio - Practice Writing!</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {interactiveElements.map((letter, index) => (
              <div 
                key={letter} 
                className="bg-white rounded-xl p-6 shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl font-bold text-green-600 mb-4">{letter}</div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-20 mb-4 flex items-center justify-center bg-gray-50">
                  <div className="text-gray-400 text-6xl font-bold opacity-30">{letter}</div>
                </div>
                <div className="flex gap-2 justify-center">
                  {[1,2,3].map(trace => (
                    <Button
                      key={trace}
                      size="sm"
                      variant={selectedItems.includes(`${letter}-${trace}`) ? "default" : "outline"}
                      onClick={() => onInteraction(`${letter}-${trace}`, true)}
                    >
                      Trace {trace}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4">
            <p className="text-lg text-gray-700 font-medium">
              📝 Tracing Progress: {selectedItems.length}/{correctInteractions} traces completed!
            </p>
          </div>
        </div>
      );
    }

    if (activity === "living-nonliving-sort") {
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6 text-teal-800">🌍 Nature Detective - Sort Living & Non-Living!</h3>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-green-100 rounded-xl p-6 border-4 border-green-300">
              <h4 className="font-bold text-green-800 mb-4 text-xl">🌱 Living Things</h4>
              <div className="min-h-32 border-2 border-dashed border-green-400 rounded-lg p-4 bg-green-50">
                <p className="text-green-700 text-sm mb-2">Drop living things here!</p>
                <div className="flex flex-wrap gap-2">
                  {selectedItems.filter(item => ['🌸', '🦋', '🐱', '🌿'].includes(item)).map(item => (
                    <span key={item} className="text-2xl">{item}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl p-6 border-4 border-gray-300">
              <h4 className="font-bold text-gray-800 mb-4 text-xl">🪨 Non-Living Things</h4>
              <div className="min-h-32 border-2 border-dashed border-gray-400 rounded-lg p-4 bg-gray-50">
                <p className="text-gray-700 text-sm mb-2">Drop non-living things here!</p>
                <div className="flex flex-wrap gap-2">
                  {selectedItems.filter(item => ['📱', '⚽', '🪨', '🏠'].includes(item)).map(item => (
                    <span key={item} className="text-2xl">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-6">
            {interactiveElements.map((item, index) => (
              <div 
                key={item} 
                className={`bg-white rounded-lg p-4 shadow-lg hover:scale-110 transition-transform cursor-pointer border-2 ${
                  selectedItems.includes(item) ? 'border-green-400 opacity-50' : 'border-purple-200 hover:border-purple-400'
                }`}
                onClick={() => !selectedItems.includes(item) && onInteraction(item, true)}
              >
                <div className="text-3xl">{item}</div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-teal-100 to-green-100 rounded-xl p-4">
            <p className="text-lg text-gray-700 font-medium">
              🎯 Sorted: {selectedItems.length}/{correctInteractions} items correctly placed!
            </p>
          </div>
        </div>
      );
    }

    // Default activity
    return (
      <div className="text-center">
        <h3 className="text-xl font-bold mb-6">Interactive Learning Activity</h3>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-lg text-gray-700 mb-4">
            Great job following along! Click on the elements to interact!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {interactiveElements?.map((item, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform ${
                  selectedItems.includes(item) ? 'border-2 border-green-400' : ''
                }`}
                onClick={() => onInteraction(item, true)}
              >
                <div className="text-3xl mb-2">{item}</div>
              </div>
            )) || []}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 mb-8 border-4 border-purple-200">
      {renderActivity()}
    </div>
  );
};

export default InteractiveActivity;
