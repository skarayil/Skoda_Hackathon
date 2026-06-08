import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Brain, 
  Users, 
  TrendingUp, 
  Target, 
  Shield, 
  Sparkles, 
  BarChart3, 
  MessageSquare, 
  Award, 
  Zap,
  Play,
  Pause,
  SkipForward,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const SkillCoachPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(180); // 3 minutes timer

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isPlaying && currentSlide < slides.length - 1) {
      interval = setInterval(() => {
        setCurrentSlide(prev => prev + 1);
      }, 15000); // Change slide every 15 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSlide]);

  // Timer countdown
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => prev < slides.length - 1 ? prev + 1 : prev);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev > 0 ? prev - 1 : prev);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const slides = [
    // Slide 1: Title
    {
      title: "AI Skill Coach",
      subtitle: "AI-Powered Talent Intelligence Platform for Škoda Auto",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <div className="relative">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-3xl shadow-2xl animate-pulse">
              <Brain className="w-32 h-32 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">
              LIVE
            </div>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            AI Skill Coach
          </h1>
          <p className="text-3xl text-gray-600 text-center">Revolutionizing Workforce Development at Škoda Auto</p>
          <div className="flex items-center space-x-6 text-lg text-gray-500">
            <span>Škoda Auto Hackathon 2024</span>
            <span>•</span>
            <span>42 Prague</span>
          </div>
          <div className="flex items-center space-x-4 mt-8">
            <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-green-600 rounded-full animate-ping"></div>
              <span className="text-green-800 font-semibold">Ready for Demo</span>
            </div>
          </div>
        </div>
      )
    },
    
    // Slide 2: Problem Statement
    {
      title: "The Challenge at Škoda Auto",
      subtitle: "Transforming Workforce Development in Automotive Industry",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg transform hover:scale-105 transition-transform">
              <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Current Pain Points
              </h3>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  Manual skill tracking across 30,000+ employees
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  Reactive approach to EV/software training needs
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  Difficulty identifying skill gaps in new technologies
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  Limited succession planning for technical roles
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  Fragmented data from multiple legacy systems
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg transform hover:scale-105 transition-transform">
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                <Target className="w-6 h-6 mr-2" />
                Our Strategic Vision
              </h3>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Proactive skill development for automotive 4.0
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  AI-driven personalized learning paths
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Predictive analytics for future mobility needs
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Data-driven technical succession planning
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Culture of continuous innovation & learning
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 rounded-2xl text-center transform hover:scale-105 transition-transform">
            <p className="text-2xl font-semibold">
              "Connecting Škoda employee skills with future automotive requirements through artificial intelligence"
            </p>
            <div className="flex justify-center space-x-8 mt-4 text-sm">
              <span>⚡ Electric Vehicles</span>
              <span>🤖 Autonomous Driving</span>
              <span>📱 Digital Mobility</span>
              <span>☁️ Cloud & Software</span>
            </div>
          </div>
        </div>
      )
    },

    // Slide 3: Solution Overview
    {
      title: "Our AI-Powered Solution",
      subtitle: "Comprehensive Talent Intelligence Platform",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white border-2 border-green-500 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Manager Dashboard</h3>
              <p className="text-gray-600">Real-time team skill visibility, gap analysis, and intervention alerts</p>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +40% efficiency in skill management
              </div>
            </div>

            <div className="bg-white border-2 border-blue-500 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Predictive Analytics</h3>
              <p className="text-gray-600">AI forecasts future skill needs based on automotive trends</p>
              <div className="mt-4 flex items-center text-sm text-blue-600">
                <Zap className="w-4 h-4 mr-1" />
                6-month early gap detection
              </div>
            </div>

            <div className="bg-white border-2 border-purple-500 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Assistant</h3>
              <p className="text-gray-600">Conversational AI for personalized career guidance</p>
              <div className="mt-4 flex items-center text-sm text-purple-600">
                <Sparkles className="w-4 h-4 mr-1" />
                24/7 instant support
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-yellow-500" />
              Key Capabilities for Škoda Auto
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">EV Technology Skill Tracking</p>
                    <p className="text-sm text-gray-600">Battery systems, power electronics, charging infrastructure</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Software-Defined Vehicle Skills</p>
                    <p className="text-sm text-gray-600">Embedded systems, OTA updates, vehicle software</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Digital Factory Skills</p>
                    <p className="text-sm text-gray-600">Industry 4.0, IoT, smart manufacturing</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Succession Planning</p>
                    <p className="text-sm text-gray-600">Identify high-potential technical successors</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Training ROI Analysis</p>
                    <p className="text-sm text-gray-600">Measure course effectiveness and impact</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Compliance Monitoring</p>
                    <p className="text-sm text-gray-600">Automated certification and qualification tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 4: Manager Dashboard
    {
      title: "Manager Dashboard",
      subtitle: "Real-time Team Skill Intelligence",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  Team Skill Readiness
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">EV Battery Systems</span>
                      <span className="text-sm text-green-600">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Autonomous Driving SW</span>
                      <span className="text-sm text-yellow-600">73%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '73%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cloud Vehicle Platform</span>
                      <span className="text-sm text-orange-600">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '68%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cybersecurity</span>
                      <span className="text-sm text-red-600">63%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: '63%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  High-Priority Interventions
                </h3>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                    <p className="font-semibold text-gray-900">Jana Nováková</p>
                    <p className="text-sm text-gray-600">3 mandatory EV certifications expired</p>
                    <span className="inline-block mt-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded font-bold">High Risk</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
                    <p className="font-semibold text-gray-900">Petr Dvořák</p>
                    <p className="text-sm text-gray-600">Cloud skills gap vs role requirements</p>
                    <span className="inline-block mt-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded font-bold">Medium Risk</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                  AI-Predicted Skill Gaps
                </h3>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-900">EV Cloud Architecture</span>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded font-bold">Critical</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Expected Q1 2025 • Impact: 2 EV projects</p>
                    <p className="text-xs text-gray-500">Forecast: -12 positions short of requirement</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-900">AI/ML for Autonomous</span>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded font-bold">Critical</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Expected Q2 2025 • Impact: audit risk</p>
                    <p className="text-xs text-gray-500">Forecast: -8 positions short of requirement</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-900">Vehicle Security</span>
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded font-bold">High</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Expected Q1 2025</p>
                    <p className="text-xs text-gray-500">Forecast: -15 positions short of requirement</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💡 AI Recommendation</h3>
                <div className="bg-white p-4 rounded-lg mb-3">
                  <p className="text-sm text-gray-700 mb-3">
                    Enroll 4 team members in "AWS Cloud for Vehicles" course by Dec 15 to prevent Q1 2025 bottleneck.
                  </p>
                  <p className="text-xs text-gray-500">Estimated cost: 24,000 CZK • ROI: High</p>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                    Schedule Training
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 5: Team Skills Heatmap
    {
      title: "Team Skills Heatmap",
      subtitle: "EV & Software Competency Matrix - Engineering Team",
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Employee</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">EV Systems</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Autonomous SW</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Cloud Platform</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Cybersecurity</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Data Science</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Agile/Scrum</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Leadership</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">Jana Nováková</div>
                      <div className="text-xs text-gray-500">Senior EV Developer</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-600 text-white w-8 h-8 rounded font-bold flex items-center justify-center">4</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-600 text-white w-8 h-8 rounded font-bold flex items-center justify-center">5</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-200 text-gray-800 w-8 h-8 rounded font-bold flex items-center justify-center">3</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-600 text-white w-8 h-8 rounded font-bold flex items-center justify-center">4</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-200 text-gray-800 w-8 h-8 rounded font-bold flex items-center justify-center">3</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-600 text-white w-8 h-8 rounded font-bold flex items-center justify-center">4</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-200 text-gray-800 w-8 h-8 rounded font-bold flex items-center justify-center">3</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">Petr Dvořák</div>
                      <div className="text-xs text-gray-500">Team Lead</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-600 text-white w-8 h-8 rounded font-bold flex items-center justify-center">4</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-600 text-white w-8 h-8 rounded font-bold flex items-center justify-center">4</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-600 text-white w-8 h-8 rounded font-bold flex items-center justify-center">4</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-200 text-gray-800 w-8 h-8 rounded font-bold flex items-center justify-center">3</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-600 text-white w-8 h-8 rounded font-bold flex items-center justify-center">4</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-600 text-white w-8 h-8 rounded font-bold flex items-center justify-center">5</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-600 text-white w-8 h-8 rounded font-bold flex items-center justify-center">5</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">Martin Černý</div>
                      <div className="text-xs text-gray-500">Full Stack Dev</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-600 text-white w-8 h-8 rounded font-bold flex items-center justify-center">5</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-600 text-white w-8 h-8 rounded font-bold flex items-center justify-center">5</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-600 text-white w-8 h-8 rounded font-bold flex items-center justify-center">4</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-600 text-white w-8 h-8 rounded font-bold flex items-center justify-center">5</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-200 text-gray-800 w-8 h-8 rounded font-bold flex items-center justify-center">3</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-200 text-gray-800 w-8 h-8 rounded font-bold flex items-center justify-center">3</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-orange-300 text-gray-800 w-8 h-8 rounded font-bold flex items-center justify-center">2</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">Tomáš Novák</div>
                      <div className="text-xs text-gray-500">Junior Developer</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-200 text-gray-800 w-8 h-8 rounded font-bold flex items-center justify-center">3</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-orange-300 text-gray-800 w-8 h-8 rounded font-bold flex items-center justify-center">2</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-red-300 text-gray-800 w-8 h-8 rounded font-bold flex items-center justify-center">1</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-orange-300 text-gray-800 w-8 h-8 rounded font-bold flex items-center justify-center">2</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-orange-300 text-gray-800 w-8 h-8 rounded font-bold flex items-center justify-center">2</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-green-200 text-gray-800 w-8 h-8 rounded font-bold flex items-center justify-center">3</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-block bg-red-300 text-gray-800 w-8 h-8 rounded font-bold flex items-center justify-center">1</div>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-4 py-3 text-gray-900">Team Average</td>
                    <td className="px-4 py-3 text-center text-gray-900">3.9</td>
                    <td className="px-4 py-3 text-center text-gray-900">3.8</td>
                    <td className="px-4 py-3 text-center text-gray-900">3.4</td>
                    <td className="px-4 py-3 text-center text-gray-900">3.6</td>
                    <td className="px-4 py-3 text-center text-gray-900">3.5</td>
                    <td className="px-4 py-3 text-center text-gray-900">3.8</td>
                    <td className="px-4 py-3 text-center text-gray-900">3.3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 transform hover:scale-105 transition-transform">
              <h4 className="font-bold text-green-800 mb-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Strongest Skills
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• EV Systems (4.0 avg)</li>
                <li>• Autonomous SW (3.9 avg)</li>
                <li>• Agile/Scrum (3.8 avg)</li>
              </ul>
            </div>
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 transform hover:scale-105 transition-transform">
              <h4 className="font-bold text-orange-800 mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Critical Gaps
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Cybersecurity (3.0 avg - target: 4)</li>
                <li>• Cloud Platform (3.3 avg - target: 5)</li>
                <li>• Leadership (3.3 avg - target: 4)</li>
              </ul>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 transform hover:scale-105 transition-transform">
              <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Top Performers
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Martin Černý (4.3 avg)</li>
                <li>• Jana Nováková (4.0 avg)</li>
                <li>• Petr Dvořák (4.1 avg)</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },

    // Slide 6: Employee Profile
    {
      title: "Employee Development Dashboard",
      subtitle: "Individual Career Path & Skill Development",
      content: (
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
                  JN
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Jana Nováková</h3>
                  <p className="text-gray-600">Senior EV Software Developer</p>
                  <p className="text-sm text-gray-500">EV Powertrain Team • 4y 7m at Škoda</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Skill Coverage</p>
                  <div className="flex items-end space-x-2">
                    <span className="text-3xl font-bold text-gray-900">78%</span>
                    <span className="text-green-600 text-sm mb-1">+6% YoY</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Mandatory Compliance</p>
                  <div className="flex items-end space-x-2">
                    <span className="text-3xl font-bold text-gray-900">87%</span>
                    <span className="text-green-600 text-sm mb-1">+3% YoY</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-green-800">Career Readiness</p>
                    <p className="text-xs text-gray-600">Ready for L5 promotion</p>
                  </div>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    L4 → L5 Ready
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Qualifications & Certifications
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-900">EV Systems Architect</p>
                      <p className="text-xs text-gray-500">Valid until Jun 2025</p>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded font-semibold">Mandatory</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Scrum Master Certified</p>
                      <p className="text-xs text-gray-500">No expiry</p>
                    </div>
                  </div>
                  <span className="text-xs bg-white px-2 py-1 rounded border font-semibold">Optional</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-900">ISO 27001 Security</p>
                      <p className="text-xs text-red-600">Expired Oct 2024</p>
                    </div>
                  </div>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded font-bold">Expired</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Leadership Foundations</p>
                      <p className="text-xs text-orange-600">Required for L5</p>
                    </div>
                  </div>
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded font-bold">Missing</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h4 className="text-lg font-bold text-gray-900 mb-4">📊 Skill Levels</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">EV Systems Development</span>
                    <span className="text-sm font-bold text-green-600">5/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Technical</p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Cloud Platform (AWS)</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-orange-600">4/5</span>
                      <span className="text-xs text-gray-500">Target: 5</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Technical</p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Autonomous Driving SW</span>
                    <span className="text-sm font-bold text-green-600">4/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Technical</p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Team Leadership</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-yellow-600">3/5</span>
                      <span className="text-xs text-gray-500">Target: 4</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Leadership</p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Vehicle Cybersecurity</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-red-600">2/5</span>
                      <span className="text-xs text-gray-500">Target: 4</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Compliance</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                AI Career Path Prediction
              </h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">EV Engineering Manager</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">72%</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">12-18 months</p>
                  <p className="text-xs text-gray-500">Gaps: Leadership, Budget Mgmt</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">Principal EV Architect</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">85%</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">8-12 months</p>
                  <p className="text-xs text-gray-500">Gaps: System Design, Mentoring</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">Solution Architect</span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">68%</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">15-20 months</p>
                  <p className="text-xs text-gray-500">Gaps: Enterprise Architecture</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h4 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                AI Coaching Recommendations
              </h4>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border-l-4 border-red-500">
                  <p className="text-sm font-semibold text-gray-900 mb-1">High Priority • 8 hours</p>
                  <p className="text-sm text-gray-700">Renew ISO 27001 Security Training</p>
                  <p className="text-xs text-gray-500 mt-1">Mandatory expired. Complete by Dec 15</p>
                  <button className="mt-2 text-xs bg-green-600 text-white px-3 py-1 rounded font-semibold hover:bg-green-700 transition-colors">
                    Enroll in Course
                  </button>
                </div>

                <div className="bg-white p-3 rounded-lg border-l-4 border-orange-500">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Medium Priority • 16 hours</p>
                  <p className="text-sm text-gray-700">AWS Advanced Networking</p>
                  <p className="text-xs text-gray-500 mt-1">Close cloud gap. Aligns with Q1 2025 project</p>
                  <button className="mt-2 text-xs bg-white border border-gray-300 px-3 py-1 rounded font-semibold hover:bg-gray-50 transition-colors">
                    View Course
                  </button>
                </div>

                <div className="bg-white p-3 rounded-lg border-l-4 border-yellow-500">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Medium Priority • 24 hours</p>
                  <p className="text-sm text-gray-700">Leadership Skills Workshop</p>
                  <p className="text-xs text-gray-500 mt-1">Required for L5 promotion. Next cohort: Jan 2025</p>
                  <button className="mt-2 text-xs bg-white border border-gray-300 px-3 py-1 rounded font-semibold hover:bg-gray-50 transition-colors">
                    Reserve Spot
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 7: Succession Planning
    {
      title: "Succession Planning & Readiness",
      subtitle: "High-Potential Successor Identification",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Key Roles Tracked</h3>
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">12</div>
              </div>
              <p className="text-sm text-gray-600">Critical positions monitored</p>
              <p className="text-xs text-green-600 mt-2 font-semibold">✓ Good coverage</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Ready Successors</h3>
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">8</div>
              </div>
              <p className="text-sm text-gray-600">Candidates ready now</p>
              <p className="text-xs text-blue-600 mt-2 font-semibold">+3 since Q3 2024</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">High-Risk Roles</h3>
                <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">3</div>
              </div>
              <p className="text-sm text-gray-600">Insufficient bench strength</p>
              <p className="text-xs text-orange-600 mt-2 font-semibold">⚠ Urgent attention needed</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Critical Role Coverage
              </h3>
              <div className="space-y-4">
                <div className="border-2 border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">EV Engineering Manager</h4>
                      <p className="text-sm text-gray-500">Current: Martin Kovář • Est. Vacancy: Aug 2026</p>
                    </div>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-bold">Medium Risk</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ready Now</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">2 candidates</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">In Pipeline</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">3 developing</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Bench Strength</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{width: '74%'}}></div>
                        </div>
                        <span className="text-sm font-bold">74%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">Principal EV Architect</h4>
                      <p className="text-sm text-gray-500">Current: Jan Horáček • Est. Vacancy: Mar 2028</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Low Risk</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ready Now</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">3 candidates</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">In Pipeline</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">2 developing</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Bench Strength</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                        </div>
                        <span className="text-sm font-bold">100%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">DevOps Lead</h4>
                      <p className="text-sm text-gray-500">Current: Lucie Procházková • Est. Vacancy: Dec 2025</p>
                    </div>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">High Risk</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ready Now</span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">0 candidates</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">In Pipeline</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">2 developing</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Bench Strength</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{width: '0%'}}></div>
                        </div>
                        <span className="text-sm font-bold text-red-600">0%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  High-Potential Successors
                </h3>
                <p className="text-sm text-gray-600 mb-4">Candidates for critical roles</p>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold">JN</div>
                        <div>
                          <p className="font-bold text-gray-900">Jana Nováková</p>
                          <p className="text-xs text-gray-600">Senior Developer → EV Engineering Manager</p>
                        </div>
                      </div>
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">85%</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">Ready in: 8 months</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-white px-2 py-1 rounded text-xs border font-semibold">Technical</span>
                      <span className="bg-white px-2 py-1 rounded text-xs border font-semibold">Communication</span>
                    </div>
                    <p className="text-xs text-orange-600 mt-2 font-semibold">Gap: Leadership training needed</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold">PD</div>
                        <div>
                          <p className="font-bold text-gray-900">Petr Dvořák</p>
                          <p className="text-xs text-gray-600">Team Lead → EV Engineering Manager</p>
                        </div>
                      </div>
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">78%</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">Ready in: 12 months</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-white px-2 py-1 rounded text-xs border font-semibold">Leadership</span>
                      <span className="bg-white px-2 py-1 rounded text-xs border font-semibold">Agile</span>
                    </div>
                    <p className="text-xs text-orange-600 mt-2 font-semibold">Gap: Budget mgmt, strategic planning</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold">MC</div>
                        <div>
                          <p className="font-bold text-gray-900">Martin Černý</p>
                          <p className="text-xs text-gray-600">Full Stack Dev → Principal EV Architect</p>
                        </div>
                      </div>
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">88%</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">Ready in: 6 months</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-white px-2 py-1 rounded text-xs border font-semibold">System Design</span>
                      <span className="bg-white px-2 py-1 rounded text-xs border font-semibold">Mentoring</span>
                    </div>
                    <p className="text-xs text-green-600 mt-2 font-semibold">✓ Strong technical foundation</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-6 transform hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Succession Risk Analysis
                </h3>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                    <p className="font-semibold text-gray-900 text-sm mb-1">Critical: DevOps Lead</p>
                    <p className="text-xs text-gray-600 mb-2">No ready successors • Vacancy in 12 months</p>
                    <p className="text-xs text-red-600 font-bold">⚠ Begin emergency succession planning</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
                    <p className="font-semibold text-gray-900 text-sm mb-1">Medium: Security Lead</p>
                    <p className="text-xs text-gray-600 mb-2">1 successor at 65% readiness</p>
                    <p className="text-xs text-orange-600 font-bold">→ Accelerate development plan</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
                <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI Recommendation
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Based on skill trajectories and project pipeline, prioritize DevOps training for 2 senior engineers. Estimated time to readiness: 6-8 months with intensive mentoring.
                </p>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Generate Action Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 8: HR Analytics
    {
      title: "HR Predictive Analytics",
      subtitle: "Organization-wide Skill Intelligence",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-sm text-gray-600 mb-2">Total Employees</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">2,847</div>
              <p className="text-sm text-green-600 font-semibold">+124 YoY (4.6%)</p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-sm text-gray-600 mb-2">Skill Coverage</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">84.2%</div>
              <p className="text-sm text-green-600 font-semibold">+6.8% YoY</p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-sm text-gray-600 mb-2">Qualification Rate</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">88.5%</div>
              <p className="text-sm text-green-600 font-semibold">+3.2% YoY</p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-sm text-gray-600 mb-2">Critical Shortages</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">41</div>
              <p className="text-sm text-red-600 font-semibold">+8 vs Q3 2024</p>
            </div>
          </div>
  
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                12-Year Skill Evolution
              </h3>
              <p className="text-sm text-gray-600 mb-4">Skill adoption rates across Škoda Auto (2013-2024)</p>
              <div className="h-48 flex items-end justify-around space-x-2">
                <div className="flex-1 flex flex-col items-center">
                  <div className="bg-green-500 rounded-t w-full transition-all duration-1000" style={{height: '60%'}}></div>
                  <p className="text-xs text-center mt-2 font-semibold">EV Systems</p>
                  <p className="text-xs text-green-600">+420%</p>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="bg-blue-500 rounded-t w-full transition-all duration-1000" style={{height: '85%'}}></div>
                  <p className="text-xs text-center mt-2 font-semibold">AI/ML</p>
                  <p className="text-xs text-blue-600">+680%</p>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="bg-purple-500 rounded-t w-full transition-all duration-1000" style={{height: '95%'}}></div>
                  <p className="text-xs text-center mt-2 font-semibold">Software</p>
                  <p className="text-xs text-purple-600">+320%</p>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="bg-gray-400 rounded-t w-full transition-all duration-1000" style={{height: '25%'}}></div>
                  <p className="text-xs text-center mt-2 font-semibold">Legacy</p>
                  <p className="text-xs text-gray-600">-65%</p>
                </div>
              </div>
            </div>
  
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Emerging Skills
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Generative AI</span>
                    <span className="text-sm font-bold text-green-600">+245%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Vehicle Cybersecurity</span>
                    <span className="text-sm font-bold text-green-600">+180%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Science</span>
                    <span className="text-sm font-bold text-green-600">+165%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cloud Platform</span>
                    <span className="text-sm font-bold text-green-600">+142%</span>
                  </div>
                </div>
              </div>
  
              <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold text-orange-800 mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Declining Skills
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Legacy Systems</span>
                    <span className="text-sm font-bold text-orange-600">-65%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Manual Testing</span>
                    <span className="text-sm font-bold text-orange-600">-48%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Waterfall PM</span>
                    <span className="text-sm font-bold text-orange-600">-42%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Traditional Mech</span>
                    <span className="text-sm font-bold text-orange-600">-38%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
  
    // Slide 9: AI Assistant
    {
      title: "AI Assistant",
      subtitle: "Conversational Intelligence for Skill Management",
      content: (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Škoda AI Coach</h3>
                <p className="text-sm text-gray-600">Powered by predictive intelligence</p>
              </div>
            </div>
  
            <div className="bg-white rounded-lg p-4 mb-4 shadow-lg">
              <p className="text-sm text-gray-700 mb-2">
                Hello! I'm your Škoda AI Skill Coach assistant. I can help you analyze team skills, predict future gaps, compare departments, and identify candidates for specific roles. What would you like to know?
              </p>
              <p className="text-xs text-gray-400">10:23</p>
            </div>
  
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Suggested Queries
              </h4>
              <div className="space-y-2">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                  <p className="text-sm font-semibold text-gray-900">What are the critical skill gaps in EV Engineering team?</p>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                  <p className="text-sm font-semibold text-gray-900">Show me employees at risk of qualification expiry</p>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                  <p className="text-sm font-semibold text-gray-900">Which team members are ready for promotion to L5?</p>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                  <p className="text-sm font-semibold text-gray-900">Forecast skill needs for Q2 2025 autonomous projects</p>
                </div>
              </div>
            </div>
          </div>
  
          <div className="space-y-6">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                AI Capabilities
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 text-lg">📊</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Team Analysis</p>
                    <p className="text-sm text-gray-600">Ask about skill gaps, readiness scores, and team comparisons</p>
                  </div>
                </div>
  
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 text-lg">🔮</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Predictive Insights</p>
                    <p className="text-sm text-gray-600">Forecast future skill shortages and attrition risks</p>
                  </div>
                </div>
  
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 text-lg">🎓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Learning Recommendations</p>
                    <p className="text-sm text-gray-600">Get personalized course suggestions based on career goals</p>
                  </div>
                </div>
  
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 text-lg">👥</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Candidate Matching</p>
                    <p className="text-sm text-gray-600">Find best-fit candidates for specific roles or projects</p>
                  </div>
                </div>
  
                <div className="flex items-start space-x-3">
                  <div className="bg-pink-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 text-lg">📈</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Career Path Planning</p>
                    <p className="text-sm text-gray-600">Simulate career progressions and identify development needs</p>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Recent AI Insights
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border-l-4 border-red-500">
                  <p className="text-sm font-semibold text-gray-900">EV Cloud Architecture Shortage</p>
                  <p className="text-xs text-gray-600 mt-1">12 positions short of Q1 2025 requirements</p>
                  <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
                </div>
                <div className="bg-white rounded-lg p-3 border-l-4 border-orange-500">
                  <p className="text-sm font-semibold text-gray-900">Leadership Development Opportunity</p>
                  <p className="text-xs text-gray-600 mt-1">Jana Nováková is 85% ready for Engineering Manager role</p>
                  <p className="text-xs text-gray-400 mt-2">5 hours ago</p>
                </div>
                <div className="bg-white rounded-lg p-3 border-l-4 border-yellow-500">
                  <p className="text-sm font-semibold text-gray-900">Qualification Compliance Alert</p>
                  <p className="text-xs text-gray-600 mt-1">8 mandatory certifications expiring in next 30 days</p>
                  <p className="text-xs text-gray-400 mt-2">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 10: Conclusion & Next Steps
    {
      title: "Ready for Škoda Auto",
      subtitle: "Implementation Roadmap & Expected Impact",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Phase 1</h3>
              <p className="text-sm text-gray-600 mb-4">Pilot Implementation (Q1 2025)</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  EV Engineering Department
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Basic Analytics & Dashboards
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Manager Training
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📈 Phase 2</h3>
              <p className="text-sm text-gray-600 mb-4">Scale & Integrate (Q2-Q3 2025)</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  All R&D Departments
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  AI Assistant Integration
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  HR System Integration
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Phase 3</h3>
              <p className="text-sm text-gray-600 mb-4">Enterprise Rollout (Q4 2025)</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Full Organization
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Advanced Predictive Features
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Mobile App Launch
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Expected Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Training Cost Reduction</span>
                  <span className="text-lg font-bold text-green-600">-35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Time to Fill Critical Roles</span>
                  <span className="text-lg font-bold text-green-600">-60%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Employee Skill Coverage</span>
                  <span className="text-lg font-bold text-green-600">+42%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Project Delivery Speed</span>
                  <span className="text-lg font-bold text-green-600">+28%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Employee Retention</span>
                  <span className="text-lg font-bold text-green-600">+25%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Call to Action</h3>
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  Let's transform Škoda Auto's workforce development together and build the future of automotive talent.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">+420 123 456 789</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">ai-coach@skoda-auto.cz</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">Škoda Auto HQ, Mladá Boleslav</span>
                  </div>
                </div>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-white px-4 py-2 rounded-lg shadow-lg border-2 border-green-200">
            <span className="text-sm font-semibold text-gray-600">Škoda Auto Hackathon</span>
          </div>
          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
            LIVE DEMO
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-white px-4 py-2 rounded-lg shadow-lg border-2 border-blue-200">
            <span className="text-sm font-semibold text-gray-600">{formatTime(timer)}</span>
          </div>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slide Container */}
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 p-8 min-h-[75vh]">
        <div className="slide-content">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {slides[currentSlide].title}
            </h2>
            <p className="text-xl text-gray-600">
              {slides[currentSlide].subtitle}
            </p>
          </div>
          
          <div className="slide-main-content">
            {slides[currentSlide].content}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
            currentSlide === 0 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
            currentSlide === slides.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Navigation */}
      <div className="fixed bottom-8 right-8 bg-white rounded-lg shadow-lg border-2 border-gray-200 p-4">
        <div className="space-y-2">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                index === currentSlide
                  ? 'bg-green-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {index + 1}. {slide.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillCoachPresentation;
