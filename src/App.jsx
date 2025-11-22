import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, User, Phone, SkipForward, Send } from 'lucide-react';

export default function QuizApp() {
  const [step, setStep] = useState('form'); // form, quiz, result
  const [userInfo, setUserInfo] = useState({ name: '', phone: '' });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      question: "React kya hai?",
      options: ["Programming Language", "JavaScript Library", "Database", "Operating System"],
      correct: 1
    },
    {
      question: "JSX ka full form kya hai?",
      options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"],
      correct: 0
    },
    {
      question: "React mein state ko update karne ke liye kya use hota hai?",
      options: ["setState()", "updateState()", "changeState()", "modifyState()"],
      correct: 0
    },
    {
      question: "Component ko reuse karne ka kya fayda hai?",
      options: ["Code slow hota hai", "Code complex hota hai", "Code reusable aur maintainable hota hai", "Koi fayda nahi"],
      correct: 2
    },
    {
      question: "React mein props ka kya kaam hai?",
      options: ["Styling ke liye", "Data pass karne ke liye", "Animation ke liye", "Routing ke liye"],
      correct: 1
    },
    {
      question: "useState hook kya return karta hai?",
      options: ["Ek value", "Ek array with value aur function", "Ek object", "Kuch nahi"],
      correct: 1
    },
    {
      question: "React mein virtual DOM ka kya use hai?",
      options: ["Styling ke liye", "Performance improve karne ke liye", "Database ke liye", "API calls ke liye"],
      correct: 1
    },
    {
      question: "Component lifecycle mein pehla method kaun sa hai?",
      options: ["componentDidMount", "render", "constructor", "componentWillUnmount"],
      correct: 2
    },
    {
      question: "React mein event handling kaise hoti hai?",
      options: ["onclick", "onClick", "onCLICK", "Onclick"],
      correct: 1
    },
    {
      question: "React ko kisne banaya?",
      options: ["Google", "Microsoft", "Facebook (Meta)", "Amazon"],
      correct: 2
    }
  ];

  const handleFormSubmit = () => {
    if (userInfo.name && userInfo.phone.length === 10) {
      setStep('quiz');
    } else {
      alert('Kripya naam aur 10 digit ka mobile number enter karein');
    }
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setAnswers({ ...answers, [currentQuestion]: selectedAnswer });
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] ?? null);
    }
  };

  const handleSkip = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] ?? null);
    }
  };

  const handleSubmitQuiz = () => {
    if (selectedAnswer !== null) {
      setAnswers({ ...answers, [currentQuestion]: selectedAnswer });
    }
    setStep('result');
  };

  const calculateScore = () => {
    let score = 0;
    Object.keys(answers).forEach((key) => {
      if (answers[key] === questions[key].correct) {
        score++;
      }
    });
    return score;
  };

  const restartQuiz = () => {
    setStep('form');
    setUserInfo({ name: '', phone: '' });
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer(null);
  };

  // Form Screen
  if (step === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">React Quiz</h1>
            <p className="text-gray-600">Apni details fill karein</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Your Name
              </label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Naam enter karein"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Mobile Number
              </label>
              <input
                type="tel"
                value={userInfo.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 10) {
                    setUserInfo({ ...userInfo, phone: value });
                  }
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="10 digit mobile number"
                maxLength="10"
              />
            </div>

            <button
              onClick={handleFormSubmit}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition"
            >
               Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  if (step === 'quiz') {
    const answeredCount = Object.keys(answers).length + (selectedAnswer !== null ? 1 : 0);
    const isLastQuestion = currentQuestion === questions.length - 1;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                Question {currentQuestion + 1}/{questions.length}
              </span>
              <span className="text-sm font-semibold text-gray-600">
                Answered: {answeredCount}/{questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-3 mb-6">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg font-medium transition-all duration-300 ${
                  selectedAnswer === index
                    ? 'bg-purple-100 border-2 border-purple-500'
                    : 'bg-white hover:bg-gray-50 border-2 border-gray-300'
                }`}
              >
                <span className="flex items-center">
                  <span className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswer === index
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-400'
                  }`}>
                    {selectedAnswer === index && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </span>
                  {option}
                </span>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            {!isLastQuestion && (
              <button
                onClick={handleSkip}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center gap-2"
              >
                <SkipForward className="w-5 h-5" />
                Skip
              </button>
            )}
            
            {isLastQuestion ? (
              <button
                onClick={handleSubmitQuiz}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  selectedAnswer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                }`}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Result Screen
  if (step === 'result') {
    const score = calculateScore();
    const percentage = ((score / questions.length) * 100).toFixed(1);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full">
          <div className="text-center mb-8">
            {score >= 7 ? (
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
            ) : (
              <XCircle className="w-24 h-24 text-orange-500 mx-auto mb-4" />
            )}
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600">Quiz Result</p>
          </div>

          {/* User Details */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Student Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <p className="text-lg font-semibold text-gray-800">{userInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Mobile Number</p>
                <p className="text-lg font-semibold text-gray-800">{userInfo.phone}</p>
              </div>
            </div>
          </div>

          {/* Score Details */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Score Details</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-green-600">{score}</p>
                <p className="text-sm text-gray-600">Correct</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-600">{questions.length - score}</p>
                <p className="text-sm text-gray-600">Wrong</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">{percentage}%</p>
                <p className="text-sm text-gray-600">Percentage</p>
              </div>
            </div>
          </div>

          {/* Answers Review */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6 max-h-96 overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Answers Review</h3>
            {questions.map((q, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === q.correct;
              const isSkipped = userAnswer === undefined;

              return (
                <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-0">
                  <p className="font-semibold text-gray-800 mb-2">
                    {index + 1}. {q.question}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    {isSkipped ? (
                      <span className="text-gray-500">⊝ Skipped</span>
                    ) : isCorrect ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">Correct: {q.options[q.correct]}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="text-red-600">
                         Your answer: {q.options[userAnswer]} | Sahi: {q.options[q.correct]}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={restartQuiz}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Start New Quiz
          </button>
        </div>
      </div>
    );
  }
}