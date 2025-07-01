
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, TrendingUp, MessageSquare, Phone, Star, Trophy, Clock, LogOut, BarChart, Award } from "lucide-react";

interface ParentDashboardProps {
  parentName: string;
  childName: string;
  onLogout: () => void;
}

const ParentDashboard = ({ parentName, childName, onLogout }: ParentDashboardProps) => {
  const [childProgress, setChildProgress] = useState([
    { subject: "English", progress: 25, stars: 8, timeSpent: "2h 30m", lessonsCompleted: 3, totalLessons: 12 },
    { subject: "Telugu", progress: 20, stars: 6, timeSpent: "1h 45m", lessonsCompleted: 2, totalLessons: 10 },
    { subject: "Hindi", progress: 15, stars: 4, timeSpent: "1h 20m", lessonsCompleted: 1, totalLessons: 8 },
    { subject: "Science", progress: 30, stars: 12, timeSpent: "3h 15m", lessonsCompleted: 4, totalLessons: 13 },
    { subject: "Social", progress: 22, stars: 7, timeSpent: "2h 10m", lessonsCompleted: 2, totalLessons: 9 },
    { subject: "Arts", progress: 35, stars: 15, timeSpent: "2h 45m", lessonsCompleted: 5, totalLessons: 14 },
    { subject: "Fun", progress: 40, stars: 18, timeSpent: "4h 20m", lessonsCompleted: 6, totalLessons: 15 },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    { activity: "Completed 'ABC Letters' in English", time: "2 hours ago", stars: 3, subject: "English" },
    { activity: "Finished 'అక్షరమాల' lesson in Telugu", time: "Yesterday", stars: 2, subject: "Telugu" },
    { activity: "Drew beautiful shapes in Arts", time: "2 days ago", stars: 3, subject: "Arts" },
    { activity: "Learned about Living Things in Science", time: "3 days ago", stars: 3, subject: "Science" },
    { activity: "Played interactive puzzle in Fun", time: "4 days ago", stars: 2, subject: "Fun" },
  ]);

  // Calculate total statistics
  const totalStars = childProgress.reduce((sum, subject) => sum + subject.stars, 0);
  const totalLessonsCompleted = childProgress.reduce((sum, subject) => sum + subject.lessonsCompleted, 0);
  const totalTimeSpent = childProgress.reduce((sum, subject) => {
    const hours = parseFloat(subject.timeSpent.replace('h', '').replace('m', '').split(' ')[0]);
    const minutes = subject.timeSpent.includes('m') ? parseFloat(subject.timeSpent.split(' ')[1]?.replace('m', '') || '0') : 0;
    return sum + hours + (minutes / 60);
  }, 0);
  const averageProgress = Math.round(childProgress.reduce((sum, subject) => sum + subject.progress, 0) / childProgress.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 animate-bounce text-2xl">👨‍👩‍👧‍👦</div>
        <div className="absolute top-20 right-20 animate-pulse text-2xl">📊</div>
        <div className="absolute bottom-20 left-20 animate-bounce text-2xl" style={{ animationDelay: '1s' }}>📈</div>
        <div className="absolute bottom-10 right-10 animate-pulse text-2xl" style={{ animationDelay: '2s' }}>🏆</div>
        <div className="absolute top-1/2 left-1/4 animate-bounce text-2xl" style={{ animationDelay: '0.5s' }}>⭐</div>
        <div className="absolute top-1/3 right-1/3 animate-pulse text-2xl" style={{ animationDelay: '1.5s' }}>📚</div>
        <div className="absolute top-3/4 left-1/2 animate-bounce text-2xl" style={{ animationDelay: '2.5s' }}>🎯</div>
        <div className="absolute top-1/4 left-3/4 animate-pulse text-2xl" style={{ animationDelay: '3s' }}>🌟</div>
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm border-b relative z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-full p-2">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-800 font-bold text-xl">Children's Library - Parent Portal</h1>
              <p className="text-gray-600 text-sm">
                Welcome {parentName} - Tracking {childName || "your child's"} learning journey
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-gray-600 hover:bg-gray-100">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Stars Earned</p>
                  <p className="text-3xl font-bold">{totalStars}</p>
                  <p className="text-blue-200 text-xs mt-1">Across all subjects</p>
                </div>
                <Star className="h-10 w-10 text-yellow-300 fill-current animate-pulse" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Lessons Completed</p>
                  <p className="text-3xl font-bold">{totalLessonsCompleted}</p>
                  <p className="text-green-200 text-xs mt-1">Great progress!</p>
                </div>
                <Trophy className="h-10 w-10 text-yellow-300 animate-pulse" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Learning Time</p>
                  <p className="text-3xl font-bold">{Math.round(totalTimeSpent)}h</p>
                  <p className="text-purple-200 text-xs mt-1">This week</p>
                </div>
                <Clock className="h-10 w-10 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Avg. Performance</p>
                  <p className="text-3xl font-bold">{averageProgress}%</p>
                  <p className="text-orange-200 text-xs mt-1">Excellent work!</p>
                </div>
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Subject Progress */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-blue-600" />
                Detailed Subject Progress
              </CardTitle>
              <CardDescription>
                {childName || "Your child's"} learning progress across all subjects with detailed metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {childProgress.map((subject) => (
                  <div key={subject.subject} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 text-lg">{subject.subject}</span>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          {subject.stars}
                        </span>
                        <span className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded">
                          <Clock className="h-4 w-4 text-blue-500" />
                          {subject.timeSpent}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Progress value={subject.progress} className="flex-1 h-3" />
                      <span className="text-sm font-medium text-gray-600 w-12">
                        {subject.progress}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{subject.lessonsCompleted} of {subject.totalLessons} lessons completed</span>
                      <span>
                        {subject.progress >= 80 ? "🌟 Excellent!" :
                         subject.progress >= 60 ? "👍 Good progress" :
                         subject.progress >= 40 ? "📈 Making progress" :
                         "🚀 Just getting started"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Recent Activities */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-green-600" />
                Recent Learning Activities
              </CardTitle>
              <CardDescription>
                Latest achievements and learning milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg hover:shadow-md transition-shadow">
                    <div className="bg-green-100 rounded-full p-2 mt-1">
                      <Award className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{activity.activity}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {activity.subject}
                        </span>
                        <span className="text-sm text-gray-600">{activity.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(activity.stars)].map((_, starIndex) => (
                        <Star key={starIndex} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                      <span className="text-sm font-medium ml-1">{activity.stars}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Learning insights */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  Learning Insights
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>🎯 <strong>Strongest Subject:</strong> {childProgress.sort((a, b) => b.progress - a.progress)[0].subject} ({childProgress.sort((a, b) => b.progress - a.progress)[0].progress}%)</p>
                  <p>⏰ <strong>Most Active Subject:</strong> {childProgress.sort((a, b) => parseFloat(b.timeSpent) - parseFloat(a.timeSpent))[0].subject}</p>
                  <p>🌟 <strong>Recent Focus:</strong> Great consistency in completing lessons!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Ask Learning Questions</h3>
              <p className="text-sm text-gray-600">Get personalized insights about your child's learning progress and recommendations</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6 text-center">
              <Phone className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Contact Support</h3>
              <p className="text-sm text-gray-600">Connect with our education experts for guidance and support</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6 text-center">
              <BarChart className="h-10 w-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Detailed Analytics</h3>
              <p className="text-sm text-gray-600">View comprehensive learning reports and progress analytics</p>
            </CardContent>
          </Card>
        </div>

        {/* Learning Recommendations */}
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Personalized Learning Recommendations
            </CardTitle>
            <CardDescription>
              Based on {childName || "your child's"} current progress and learning patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-gray-800 mb-2">💡 Focus Areas</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Continue building {childProgress.sort((a, b) => a.progress - b.progress)[0].subject} foundations</li>
                  <li>• Practice more interactive activities in weaker subjects</li>
                  <li>• Maintain excellent progress in {childProgress.sort((a, b) => b.progress - a.progress)[0].subject}</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-gray-800 mb-2">🎯 Next Goals</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Complete 2 more lessons this week</li>
                  <li>• Earn 5 more stars across all subjects</li>
                  <li>• Try creative projects in Arts subject</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentDashboard;
