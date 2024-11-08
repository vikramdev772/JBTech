import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  XCircle, 
  Clock,
  Award,
  AlertCircle,
  Flag,
  Save,
  RefreshCw
} from 'lucide-react';
import questionsData from '../components/text.json';

const QuizProgress = ({ current, total, answeredQuestions }) => {
  const progress = (answeredQuestions.length / total) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-500">
        <span>Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-700"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{answeredQuestions.length} Answered</span>
        <span>{total - answeredQuestions.length} Remaining</span>
      </div>
    </div>
  );
};

const Test = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  React.useEffect(() => {
    if (timeLeft > 0 && !quizSubmitted) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, quizSubmitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    setShowAnswer(true);
    setUserAnswers({ ...userAnswers, [currentQuestion]: index });
    
    if (!answeredQuestions.includes(currentQuestion)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    }

    if (!quizSubmitted) {
      setTimeout(() => {
        setShowAnswer(false);
        if (currentQuestion < questionsData.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        }
      }, 1500);
    }
  };

  const handleNavigation = (direction) => {
    const newQuestion = currentQuestion + direction;
    if (newQuestion >= 0 && newQuestion < questionsData.length) {
      setCurrentQuestion(newQuestion);
      setSelectedOption(userAnswers[newQuestion] ?? null);
      setShowAnswer(false);
    }
  };

  const handleSubmit = () => {
    setQuizSubmitted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(userAnswers).forEach(([question, answer]) => {
      if (answer === questionsData[question].answer) correct++;
    });
    return {
      score: correct,
      total: questionsData.length,
      percentage: Math.round((correct / questionsData.length) * 100)
    };
  };

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quiz Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-8 mt-[50px]"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 border border-gray-700">
            <Clock className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-blue-400 text-sm">Time Left: {formatTime(timeLeft)}</span>
          </span>
          <h1 className="text-3xl font-bold">
            Programming
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              {' '}Quiz
            </span>
          </h1>
        </motion.div>

        {/* Quiz Container */}
        <div className="shadow-lg bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
          {/* Progress Bar */}
          <div className="p-6 border-b border-gray-700">
            <QuizProgress
              current={currentQuestion + 1}
              total={questionsData.length}
              answeredQuestions={answeredQuestions}
            />
          </div>

          {quizSubmitted ? (
            // Results View
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center space-y-6"
            >
              <Award className="w-16 h-16 text-blue-400 mx-auto" />
              <h2 className="text-2xl font-bold">Quiz Completed!</h2>
              {(() => {
                const result = calculateScore();
                return (
                  <div className="space-y-4">
                    <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                      {result.percentage}%
                    </p>
                    <p className="text-gray-400">
                      You got {result.score} out of {result.total} questions correct
                    </p>
                  </div>
                );
              })()}
              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Try Again</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg bg-blue-600 border border-blue-700 text-white flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Result</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            // Question View
            <div className="p-8 space-y-6">
              {/* Question */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Question {currentQuestion + 1} of {questionsData.length}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-red-400 hover:bg-gray-700"
                  >
                    <Flag className="w-4 h-4" />
                  </motion.button>
                </div>
                <h3 className="text-xl font-medium text-white">{questionsData[currentQuestion].question}</h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {questionsData[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    className={`w-full p-4 rounded-lg border transition-all shadow-sm 
                      ${selectedOption === index
                        ? showAnswer
                          ? index === questionsData[currentQuestion].answer
                            ? 'bg-green-500/20 border-green-500/30 text-green-400'
                            : 'bg-red-500/20 border-red-500/30 text-red-400'
                          : 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={showAnswer}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm">{String.fromCharCode(65 + index)}.</span>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation(-1)}
                  disabled={currentQuestion === 0}
                  className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 flex items-center space-x-2 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </motion.button>

                {answeredQuestions.length === questionsData.length ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold"
                  >
                    Submit Quiz
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavigation(1)}
                    disabled={currentQuestion === questionsData.length - 1}
                    className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 flex items-center space-x-2 disabled:opacity-50"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
