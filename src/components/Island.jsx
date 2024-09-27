import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const Island = ({ id, name, details, questions, isActive, isCompleted, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allCorrect = questions.every(q => answers[q.id] === q.correctAnswer);
    setIsCorrect(allCorrect);
    if (allCorrect) {
      onComplete();
    }
  };

  return (
    <div className={`flex flex-col items-center ${isActive ? 'opacity-100' : 'opacity-50' } `}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
        isCompleted ? 'bg-green-300' : isActive ? 'bg-yellow-300' : 'bg-gray-300'
      }`}>
        <MapPin size={24} className="text-gray-700" />
      </div>
      <span className="text-sm mt-1">{name}</span>
      {isActive && (
        <div className="mt-4 p-4 bg-gray-100 rounded w-full max-w-md">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <p className="mb-4">{details}</p>
          <form onSubmit={handleSubmit}>
            {questions.map(q => (
              <div key={q.id} className="mb-4">
                <p className="font-medium">{q.question}</p>
                {q.options.map(option => (
                  <label key={option} className="block mt-2">
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      onChange={() => handleAnswerChange(q.id, option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
          {isCorrect && <p className="mt-4 text-green-500">Correct! You can move to the next island.</p>}
          {!isCorrect && <p className="mt-4 text-red-500">Some answers are incorrect. Try again!</p>}
        </div>
      )}
    </div>
  );
};

export default Island;