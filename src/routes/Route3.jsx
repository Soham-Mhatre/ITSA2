import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import devilSmile from '../components/devilsmile.png'; // Add your image here

const islands = [
  {
    id: 1,
    name: "Jaya",
    questions: [
      {
        id: "jaya1",
        question: 'Which grand structure in Kolkata, built in memory of Queen Victoria, is surrounded by beautiful gardens and is a popular tourist attraction?',
        options: ['Howrah Bridge', 'Victoria Memorial', 'Marble Palace', 'Dakshineswar Kali Temple'],
        correctAnswer: 'Victoria Memorial',
      }
    ]
  },
  {
    id: 2,
    name: "Skypiea",
    questions: [
      {
        id: "skypiea1",
        question: 'What is the name of the famous sweet treat originating from Kolkata, made from paneer and soaked in syrup?',
        options: ['Gulab Jamun', 'Rasgulla', 'Sandesh', 'Mishti Doi'],
        correctAnswer: 'Rasgulla',
      }
    ]
  },
  {
    id: 3,
    name: "Upper Yard",
    questions: [
      {
        id: "upper1",
        question: 'In programming, what is the concept called where a function can call itself to solve a problem?',
        options: ['Recursion', 'Iteration', 'Compilation', 'Inheritance'],
        correctAnswer: 'Recursion',
      }
    ]
  },
  {
    id: 4,
    name: "Angel Beach",
    questions: [
      {
        id: "angel1",
        question: 'Which protocol is used for secure data transmission over the Internet?',
        options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
        correctAnswer: 'HTTPS',
      }
    ]
  }
];

const Route3 = () => {
  const [currentIsland, setCurrentIsland] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes countdown

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLocked) return;

    const allCorrect = islands[currentIsland].questions.every(
      q => answers[q.id] === q.correctAnswer
    );
    setIsCorrect(allCorrect);

    if (allCorrect && currentIsland < islands.length - 1) {
      setCurrentIsland(currentIsland + 1);
      setAnswers({});
      setIsCorrect(false);
    } else if (!allCorrect) {
      setWrongAttempts(prev => prev + 1);
      if (wrongAttempts + 1 >= 3) {
        setIsLocked(true);
        setTimeLeft(180); // Start the 3 minutes countdown
      }
    }
  };

  useEffect(() => {
    let timer;
    if (isLocked) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsLocked(false);
            setWrongAttempts(0);
            setTimeLeft(180); // Reset time
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked]);

  return (
    <div className="overflow-hidden h-screen">
    <Link to="/" className="text-blue-500 mb-4 inline-block fall-back">
      &larr; Back to Map
      </Link>
      <h2 className="text-xl mb-2 font-bold">Route 3</h2>
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-300 transform -translate-y-1/2"></div>
        <div className="flex justify-between text-white items-center relative z-10">
          {islands.map((island, index) => (
            <div
              key={island.id}
              className={`flex flex-col items-center cursor-pointer ${
                index <= currentIsland ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                index === currentIsland
                  ? 'bg-yellow-300'
                  : index < currentIsland
                  ? 'bg-green-300'
                  : 'bg-gray-300'
              }`}>
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
          {isCorrect && currentIsland < islands.length - 1 && (
            <p className="mt-4 text-green-500">Correct! You can move to the next island.</p>
          )}
          {isCorrect && currentIsland === islands.length - 1 && (
            <p className="mt-4 text-green-500">Congratulations! You've completed Route 3!</p>
          )}
          {!isCorrect && !isLocked && <p className="mt-4 text-red-500"></p>}
        </div>
      )}
      {isLocked && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <img src={devilSmile} alt="Devil Smile" className="w-25 h-27 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-600">You’ve put 3 wrong inputs!</h2>
            <p className="text-gray-700">Now wait for:</p>
            <p className="text-2xl font-bold text-blue-500">{`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Route3;
