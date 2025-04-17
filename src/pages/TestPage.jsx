import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import questionsData from '../lib/questions';
import {
  initializeStorage,
  updateAnswer,
  resetAnswers,
  getAllAnswers,
} from '../utils/sessionStorageManager';
import { useSession } from '../context/sessionContext';

const TestPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [testId, setTestId] = useState('');
  const [token, setToken] = useState('');
  const [validTest, setValidTest] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useSession();

  const QUESTIONS_PER_PAGE = 8;

  const allQuestions = questionsData.flatMap(section =>
    section.subsections.flatMap(subsection => subsection.questions)
  );

  const totalPages = Math.ceil(allQuestions.length / QUESTIONS_PER_PAGE);
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = allQuestions.slice(startIndex, endIndex);

  useEffect(() => {
    const search = window.location.search;
    if (!search) return;

    try {
      const encoded = search.substring(1);
      const decoded = atob(encoded);
      const params = new URLSearchParams(decoded);

      const tokenParam = params.get('token');
      const testIdParam = params.get('testId');
      const testDate = params.get('date');

      if (!tokenParam || !testIdParam || !testDate) return;
      const today = new Date().toISOString().split('T')[0];
      if (testDate < today) return;

      setToken(tokenParam);
      setTestId(testIdParam);
      setValidTest(true);
      initializeStorage(testIdParam);
      login(tokenParam, testIdParam);
    } catch (err) {
      console.error('Invalid test link.', err);
    }
  }, []);

  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions(prev => {
      const question = allQuestions.find(q => q.id === questionId);
      let newSelection;

      if (question?.multiple) {
        const currentSelections = prev[questionId] || [];
        newSelection = currentSelections.includes(option)
          ? currentSelections.filter(item => item !== option)
          : [...currentSelections, option].slice(0, 3);
      } else {
        newSelection = option;
      }

      updateAnswer(testId, currentPage, questionId, newSelection);
      return { ...prev, [questionId]: newSelection };
    });
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const calculateScore = async () => {
    let correctAnswers = 0;
    allQuestions.forEach((question) => {
      const selected = selectedOptions[question.id];
      if (question.answer && selected === question.answer) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);
    setShowScore(true);

    const submissionData = getAllAnswers(testId);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_TS_URL}/api/v1/contest/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            sessiontoken: token,
          },
          body: JSON.stringify({
            data: submissionData,
            contestId: testId,
          }),
        }
      );

      const result = await res.json();
      if (result.success) {
        alert('Submission queued successfully');
        resetAnswers(testId);
        navigate('/student');
      } else {
        alert(`Submission error: ${result.message}`);
      }
    } catch (err) {
      alert('Something went wrong during submission');
    }
  };

  const resetTest = () => {
    setSelectedOptions({});
    setShowScore(false);
    setScore(0);
    setCurrentPage(0);
    resetAnswers(testId);
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(question.id, option)}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors text-sm sm:text-base ${(question.multiple
                  ? selectedOptions[question.id]?.includes(option)
                  : selectedOptions[question.id] === option)
                  ? 'bg-blue-50 border border-blue-200'
                  : 'hover:bg-gray-50 border border-gray-100'
                  }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${(question.multiple
                    ? selectedOptions[question.id]?.includes(option)
                    : selectedOptions[question.id] === option)
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-400'
                    }`}
                >
                  {(question.multiple
                    ? selectedOptions[question.id]?.includes(option)
                    : selectedOptions[question.id] === option) && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                </div>
                <span>{option}</span>
              </div>
            ))}
          </div>
        );

      case 'rating-scale':
        return (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Rate according to your interest.</p>
            <div className="flex justify-between items-center gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <div key={rating} className="flex flex-col items-center text-xs">
                  <button
                    onClick={() => handleOptionSelect(question.id, rating)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${selectedOptions[question.id] === rating
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                  >
                    {rating}
                  </button>
                  {rating === 1 && <span className="mt-1">Low</span>}
                  {rating === 5 && <span className="mt-1">High</span>}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Unsupported question type</div>;
    }
  };

  if (!validTest) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Invalid or expired test link.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-2 sm:px-4">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Student Assessment</h1>

          {showScore ? (
            <div className="text-center py-10">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Assessment Complete!
              </h2>
              {/* Removed Because we have to submit only (result we be generated soon).  
              <button
                onClick={resetTest}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retake Assessment
              </button> 
              */}
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {currentQuestions.map((q) => (
                  <div key={q.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-3">
                      {q.text}
                      {q.multiple && (
                        <span className="text-sm text-gray-500 ml-2">(Select up to 3)</span>
                      )}
                    </h3>
                    {renderQuestion(q)}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 0}
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg ${currentPage === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                  Previous
                </button>

                <span className="text-gray-600">
                  Page {currentPage + 1} of {totalPages}
                </span>

                {currentPage==18 ? (
                  <button
                    onClick={calculateScore}
                    className="w-full sm:w-auto px-6 py-2 rounded-lg text-white font-medium bg-green-600 hover:bg-green-700"
                  >
                    Submit Assessment
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
