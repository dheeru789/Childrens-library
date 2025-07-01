
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Sparkles, Star } from "lucide-react";
import ChildDashboard from "@/components/ChildDashboard";
import ParentDashboard from "@/components/ParentDashboard";
import SplashScreen from "@/components/SplashScreen";
import AgeSelector from "@/components/AgeSelector";

interface User {
  name: string;
  email: string;
  age?: string;
  type: 'child' | 'parent';
  childName?: string;
  progress?: {[subject: string]: {[lessonId: number]: number}};
}

const Index = () => {
  const [currentView, setCurrentView] = useState<"splash" | "auth" | "ageSelector" | "child" | "parent">("splash");
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleGetStarted = () => {
    setCurrentView("auth");
  };

  const handleUserRegistration = (userData: User) => {
    const newUser = { ...userData, progress: {} };
    setRegisteredUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    if (userData.type === 'child' && !userData.age) {
      setCurrentView("ageSelector");
    } else if (userData.type === 'child') {
      setCurrentView("child");
    } else {
      setCurrentView("parent");
    }
  };

  const handleUserLogin = (email: string, password: string, type: 'child' | 'parent') => {
    const user = registeredUsers.find(u => u.email === email && u.type === type);
    if (user) {
      setCurrentUser(user);
      if (type === 'child' && !user.age) {
        setCurrentView("ageSelector");
      } else if (type === 'child') {
        setCurrentView("child");
      } else {
        setCurrentView("parent");
      }
    } else {
      alert("User not found. Please register first.");
    }
  };

  const handleAgeSelection = (age: string) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, age };
      setCurrentUser(updatedUser);
      setRegisteredUsers(prev => 
        prev.map(u => u.email === currentUser.email && u.type === currentUser.type ? updatedUser : u)
      );
      setCurrentView("child");
    }
  };

  const handleProgressUpdate = (subject: string, lessonId: number, stars: number) => {
    if (currentUser) {
      const updatedProgress = {
        ...currentUser.progress,
        [subject]: {
          ...currentUser.progress?.[subject],
          [lessonId]: stars
        }
      };
      
      const updatedUser = { ...currentUser, progress: updatedProgress };
      setCurrentUser(updatedUser);
      setRegisteredUsers(prev => 
        prev.map(u => u.email === currentUser.email && u.type === currentUser.type ? updatedUser : u)
      );
    }
  };

  if (currentView === "splash") {
    return <SplashScreen onGetStarted={handleGetStarted} />;
  }

  if (currentView === "ageSelector") {
    return (
      <AgeSelector 
        childName={currentUser?.name || ""} 
        onAgeSelect={handleAgeSelection}
        onBack={() => setCurrentView("auth")}
      />
    );
  }

  if (currentView === "child") {
    return (
      <ChildDashboard 
        childName={currentUser?.name || ""} 
        childAge={currentUser?.age || "5"} 
        onLogout={() => setCurrentView("auth")}
        onProgressUpdate={handleProgressUpdate}
      />
    );
  }

  if (currentView === "parent") {
    return (
      <ParentDashboard 
        parentName={currentUser?.name || ""}
        childName={currentUser?.childName || ""}
        onLogout={() => setCurrentView("auth")} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 animate-bounce text-2xl">📚</div>
        <div className="absolute top-20 right-20 animate-pulse text-2xl">🎨</div>
        <div className="absolute bottom-20 left-20 animate-bounce text-2xl" style={{ animationDelay: '1s' }}>🧸</div>
        <div className="absolute bottom-10 right-10 animate-pulse text-2xl" style={{ animationDelay: '2s' }}>🌈</div>
        <div className="absolute top-1/2 left-1/4 animate-bounce text-2xl" style={{ animationDelay: '0.5s' }}>⭐</div>
        <div className="absolute top-1/3 right-1/3 animate-pulse text-2xl" style={{ animationDelay: '1.5s' }}>🎪</div>
        <div className="absolute top-3/4 left-1/2 animate-bounce text-2xl" style={{ animationDelay: '2.5s' }}>🎈</div>
        <div className="absolute top-1/4 left-3/4 animate-pulse text-2xl" style={{ animationDelay: '3s' }}>🌟</div>
      </div>

      <div className="relative z-10 flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-md">
          {/* Enhanced Logo and Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white rounded-full p-4 shadow-xl">
                <BookOpen className="h-10 w-10 text-purple-600" />
              </div>
              <Sparkles className="h-8 w-8 text-yellow-400 ml-3 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">Children's Library</h1>
            <p className="text-white/90 text-lg font-medium">Where Learning Becomes an Amazing Adventure!</p>
            <p className="text-white/80 text-sm mt-2">Join thousands of children exploring the world of knowledge</p>
          </div>

          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95 animate-scale-in">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-gray-800">
                {authMode === "login" ? "Welcome Back! 🎉" : "Join Our Learning Family! 🌟"}
              </CardTitle>
              <CardDescription className="text-base">
                {authMode === "login" ? "Continue your amazing learning journey" : "Start your educational adventure today"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex gap-2 mb-6">
                <Button
                  variant={authMode === "register" ? "default" : "outline"}
                  onClick={() => setAuthMode("register")}
                  className="flex-1 font-medium"
                >
                  {authMode === "register" ? "✨ Register" : "Register"}
                </Button>
                <Button
                  variant={authMode === "login" ? "default" : "outline"}
                  onClick={() => setAuthMode("login")}
                  className="flex-1 font-medium"
                >
                  {authMode === "login" ? "🚀 Login" : "Login"}
                </Button>
              </div>

              <Tabs defaultValue="child" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="child" className="flex items-center gap-2 font-medium">
                    <Star className="h-4 w-4" />
                    Young Learner
                  </TabsTrigger>
                  <TabsTrigger value="parent" className="flex items-center gap-2 font-medium">
                    <Users className="h-4 w-4" />
                    Parent/Guardian
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="child" className="space-y-4">
                  <ChildAuthForm 
                    mode={authMode} 
                    onRegister={handleUserRegistration}
                    onLogin={handleUserLogin}
                  />
                </TabsContent>

                <TabsContent value="parent" className="space-y-4">
                  <ParentAuthForm 
                    mode={authMode} 
                    onRegister={handleUserRegistration}
                    onLogin={handleUserLogin}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              Safe, engaging, and educational content designed by experts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChildAuthForm = ({ 
  mode, 
  onRegister, 
  onLogin 
}: { 
  mode: "login" | "register"; 
  onRegister: (user: User) => void;
  onLogin: (email: string, password: string, type: 'child') => void;
}) => {
  const [childName, setChildName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      if (mode === "register") {
        if (childName) {
          onRegister({ name: childName, email, type: 'child' });
        }
      } else {
        onLogin(email, password, 'child');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "register" && (
        <div className="space-y-2">
          <Label htmlFor="childName" className="text-base font-medium">What's your name?</Label>
          <Input
            id="childName"
            placeholder="Enter your wonderful name"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="text-lg py-3 border-2"
            required
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="childEmail" className="text-base font-medium">Email Address</Label>
        <Input
          id="childEmail"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-lg py-3 border-2"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="childPassword" className="text-base font-medium">Password</Label>
        <Input
          id="childPassword"
          type="password"
          placeholder={mode === "register" ? "Create a secure password" : "Enter your password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-lg py-3 border-2"
          required
        />
      </div>

      <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all">
        {mode === "login" ? "🚀 Start Learning Adventure!" : "✨ Create My Learning Account!"}
      </Button>
    </form>
  );
};

const ParentAuthForm = ({ 
  mode, 
  onRegister, 
  onLogin 
}: { 
  mode: "login" | "register"; 
  onRegister: (user: User) => void;
  onLogin: (email: string, password: string, type: 'parent') => void;
}) => {
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [childName, setChildName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      if (mode === "register") {
        if (parentName) {
          onRegister({ name: parentName, email, type: 'parent', childName: childName || undefined });
        }
      } else {
        onLogin(email, password, 'parent');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "register" && (
        <div className="space-y-2">
          <Label htmlFor="parentName" className="text-base font-medium">Parent/Guardian Name</Label>
          <Input
            id="parentName"
            placeholder="Enter your full name"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            className="text-lg py-3 border-2"
            required
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="parentEmail" className="text-base font-medium">Email Address</Label>
        <Input
          id="parentEmail"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-lg py-3 border-2"
          required
        />
      </div>

      {mode === "register" && (
        <div className="space-y-2">
          <Label htmlFor="childNameReg" className="text-base font-medium">Child's Name (Optional)</Label>
          <Input
            id="childNameReg"
            placeholder="Enter your child's name"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="text-lg py-3 border-2"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="parentPassword" className="text-base font-medium">Password</Label>
        <Input
          id="parentPassword"
          type="password"
          placeholder={mode === "register" ? "Create a secure password" : "Enter your password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-lg py-3 border-2"
          required
        />
      </div>

      <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all">
        {mode === "login" ? "📊 Access Parent Dashboard" : "🏠 Create Family Account"}
      </Button>
    </form>
  );
};

export default Index;
