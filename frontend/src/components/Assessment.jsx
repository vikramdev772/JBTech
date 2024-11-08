import React, { useState, useEffect } from 'react';
import test from './text.json';
import { BookOpen, Clock, CheckCircle, XCircle, Award } from 'lucide-react';

const Assessment = () => {
  const [questions] = useState(test);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per question
  const [showResults, setShowResults] = useState(false);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showResults) {
      // Automatically move to the next question when time runs out
      handleNextQuestion();
    }
  }, [timeLeft, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption
    }));
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setScore(null);
    setShowResults(false);
    setCurrentQuestion(0);
    setTimeLeft(60); // Reset timer to 60 seconds
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(60); // Reset timer to 60 seconds for the next question
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setTimeLeft(60); // Reset timer to 60 seconds for the previous question
    }
  };

  const QuestionCard = ({ question, index }) => (
    <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl text-white flex-1">
          <span className="text-purple-400 font-bold mr-2">Q{index + 1}.</span>
          {question.question}
        </h3>
      </div>

      <div className="space-y-3">
        {question.options.map((option, optionIndex) => {
          const isCorrect = question.answer === optionIndex;
          const isSelected = answers[index] === optionIndex;
          const bgColor = isSelected
            ? isCorrect
              ? 'bg-green-500/20 border-green-500'
              : 'bg-red-500/20 border-red-500'
            : 'bg-white/5 border-white/10';

          return (
            <div key={optionIndex} className={`transition-all ${bgColor}`}>
              <label className="flex items-center p-4 rounded-xl cursor-pointer">
                <input
                  type="radio"
                  name={`question_${index}`}
                  value={optionIndex}
                  checked={isSelected}
                  onChange={() => handleAnswerChange(index, optionIndex)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center
                  ${
                    isSelected
                      ? isCorrect
                        ? 'border-green-500 bg-green-500/20'
                        : 'border-red-500 bg-red-500/20'
                      : 'border-white/30'
                  }
                `}
                >
                  {isSelected && (
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-base ${
                    isSelected
                      ? isCorrect
                        ? 'text-green-400'
                        : 'text-red-400'
                      : 'text-gray-300'
                  }`}
                >
                  {option}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Award className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-purple-400">Quiz Complete!</span>
            </div>

            <h2 className="text-4xl font-bold text-white">
              Your Score:
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                {" "}
                {score}/{questions.length}
              </span>
            </h2>

            <p className="text-gray-400">
              {score === questions.length
                ? "Perfect score! Excellent work!"
                : "Keep practicing to improve your score!"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-start space-x-2">
                    {answers[index] === question.answer ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-1" />
                    )}
                    <div>
                      <p className="text-gray-300 mb-2">{question.question}</p>
                      <p className="text-sm text-gray-400">
                        Your answer: {question.options[answers[index]]}
                      </p>
                      {answers[index] !== question.answer && (
                        <p className="text-sm text-green-400">
                          Correct answer: {question.options[question.answer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={resetQuiz}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium mt-8 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <BookOpen className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-400">Assessment Quiz</span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Programming
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              {" "}
              Quiz
            </span>
          </h1>
        </div>

        {/* Progress and Timer */}
        <div className="mb-8 space-y-4">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{Math.round(progress)}% Complete</span>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{formatTime(timeLeft)} remaining</span>
            </div>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              style={{ width: `${progress}%`, transition: 'width 0.5s' }}
            />
          </div>
        </div>

        {/* Questions */}
        <QuestionCard question={questions[currentQuestion]} index={currentQuestion} />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 disabled:opacity-50"
          >
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== questions.length}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium disabled:opacity-50"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
            >
              Next
            </button>
          )}
        </div>

        {/* Question Navigation */}
        <div className="mt-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentQuestion(index);
                  setTimeLeft(60); // Reset timer to 60 seconds when changing question
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm
                  ${
                    currentQuestion === index
                      ? 'bg-purple-500 text-white'
                      : answers[index] !== undefined
                      ? 'bg-white/10 text-purple-400 border border-purple-500/30'
                      : 'bg-white/5 text-gray-400 border border-white/10'
                  }
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
