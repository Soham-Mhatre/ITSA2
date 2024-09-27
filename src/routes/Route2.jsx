import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const islands = [
  {
    id: 1,
    name: "Whiskey Peak",
    questions: [
      {
        id: "whiskey1",
        question: 'Which temple in Chennai, known for its intricate Dravidian architecture and vibrant festivals, is a focal point for both devotees and tourists?',
        options: ['The Ornate Kapaleeshwarar Temple', 'The Historic Fort St. George', 'The Peaceful Marina Beach', 'The Serene Santhome Basilica'],
        correctAnswer: 'The Ornate Kapaleeshwarar Temple',
      }
    ]
  },
  {
    id: 2,
    name: "Little Garden",
    questions: [
      {
        id: "garden1",
        question: 'Which beach in Chennai, famous not just for its length but also for its cultural significance, has been a witness to various historical events?',
        options: ['The Lively Besant Nagar Beach', 'The Iconic Marina Beach', 'The Tranquil Elliot\'s Beach', 'The Scenic Covelong Beach'],
        correctAnswer: 'The Iconic Marina Beach',
      }
    ]
  },
  {
    id: 3,
    name: "Drum Island",
    questions: [
      {
        id: "drum1",
        question: 'In the context of database management, which SQL statement is essential for retrieving specific data from a table?',
        options: ['SELECT', 'UPDATE', 'INSERT', 'DELETE'],
        correctAnswer: 'SELECT',
      }
    ]
  },
  {
    id: 4,
    name: "Alabasta",
    questions: [
      {
        id: "alabasta1",
        question: 'What is the key advantage of using an open-source operating system like Linux compared to proprietary systems?',
        options: ['Lower initial cost', 'Limited customization options', 'Inherent security vulnerabilities', 'Frequent updates with community support'],
        correctAnswer: 'Frequent updates with community support',
      }
    ]
  }
];

const Route2 = () => {
  const [currentIsland, setCurrentIsland] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLocked) return;

    const allCorrect = islands[currentIsland].questions.every(q => answers[q.id] === q.correctAnswer);
    setIsCorrect(allCorrect);

    if (allCorrect) {
      if (currentIsland < islands.length - 1) {
        setCurrentIsland(currentIsland + 1);
        setAnswers({});
        setIsCorrect(false);
      }
    } else {
      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);
      if (newWrongAttempts >= 3) {
        setIsLocked(true);
        setTimeLeft(180); // 3 minutes countdown
      }
    }
  };

  useEffect(() => {
    let timer;
    if (isLocked && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsLocked(false);
            setWrongAttempts(0);
            setTimeLeft(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, timeLeft]);

  return (
    <div>
      <Link to="/" className="text-blue-500 mb-4 inline-block fall-back">&larr; Back to Map</Link>
      <h2 className="text-xl mb-2 font-bold">Route 2</h2>
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-300 transform -translate-y-1/2"></div>
        <div className="flex justify-between text-white items-center relative z-10">
          {islands.map((island, index) => (
            <div key={island.id} className={`flex flex-col items-center cursor-pointer ${index <= currentIsland ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${index === currentIsland ? 'bg-yellow-300' : index < currentIsland ? 'bg-green-300' : 'bg-gray-300'}`}>
                <MapPin size={24} className="text-gray-700" />
              </div>
              <span className="text-sm mt-1">{island.name}</span>
            </div>
          ))}
        </div>
      </div>
      {currentIsland < islands.length && (
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold mb-2">{islands[currentIsland].name}</h3>
          <form onSubmit={handleSubmit}>
            {islands[currentIsland].questions.map(q => (
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
            <button className="custom-button" type="submit" disabled={isLocked}>
              <span className="button_top">Submit</span>
            </button>
          </form>
          {isCorrect && currentIsland < islands.length - 1 && <p className="mt-4 text-green-500">Correct! You can move to the next island.</p>}
          {isCorrect && currentIsland === islands.length - 1 && <p className="mt-4 text-green-500">Congratulations! You've completed Route 2!</p>}
          {!isCorrect && <p className="mt-4 text-red-500">.</p>}
        </div>
      )}
      {isLocked && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold text-red-600">You’ve put 3 wrong inputs!</h2>
            <p className="text-gray-700">Now wait for:</p>
            <p className="text-2xl font-bold text-blue-500">{`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Route2;
