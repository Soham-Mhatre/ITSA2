import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import devilSmile from "../components/devilsmile.png";

const islands = [
  {
    id: 1,
    name: "Foosha Village",
    questions: [
      {
        id: "foosha1",
        question:
          "With red sandstone walls, I stand proud and tall, A symbol of power, I’ve witnessed it all. My history is rich, my beauty profound, What am I, where emperors were crowned?",
        options: [
          "The Fatehpur Sikri",
          "The Grand Red Fort",
          "The Timeless Humayun's Tomb",
          "The Historic Qutub Minar",
        ],
        correctAnswer: "The Grand Red Fort",
      },
    ],
  },
  {
    id: 2,
    name: "Shells Town",
    questions: [
      {
        id: "shells1",
        question:
          "In the context of Delhi's cultural landscape, which market is famous for its street food and has roots dating back to the Mughal era?",
        options: [
          "The Grand Connaught Place",
          "The Historic Chandni Chowk",
          "The Vibrant Dilli Haat",
          "The Bustling Sarojini Nagar Market",
        ],
        correctAnswer: "The Historic Chandni Chowk",
      },
    ],
  },
  {
    id: 3,
    name: "Orange Town",
    questions: [
      {
        id: "orange1",
        question:
          "What historical fort in Chennai was built by the British in the 17th century and now houses the Tamil Nadu Legislative Assembly?",
        options: [
          "Fort St. George",
          "Fort St. David",
          "Fort Williams",
          "Fort Charles",
        ],
        correctAnswer: "Fort St. George",
      },
    ],
  },
  {
    id: 4,
    name: "Syrup Village",
    questions: [
      {
        id: "syrup1",
        question:
          "Zoro decodes the message: 'Lipps Asvph!' (Caesar cipher with shift 4).",
        options: [
          "Hello Pirate!",
          "Find the crew!",
          "Hello World!",
          "Meet at Dawn!",
        ],
        correctAnswer: "Hello World!",
      },
    ],
  },
  {
    id: 5,
    name: "Laugh Tale",
    questions: [
      {
        id: "Laugh1",
        question:
          "What is the correct order of the answers for the above questions?",
        options: [
          "Q1-B, Q2-B, Q3-C, Q4-D",
          "Q1-B, Q2-B, Q3-A, Q4-C",
          "Q1-A, Q2-B, Q3-A, Q4-C",
          "Q1-A, Q2-B, Q3-B, Q4-D",
        ],
        correctAnswer: "Q1-B, Q2-B, Q3-A, Q4-C",
      },
    ],
  },
];

const EastBlue = () => {
  const [currentIsland, setCurrentIsland] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes countdown

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLocked) return;

    const allCorrect = islands[currentIsland].questions.every(
      (q) => answers[q.id] === q.correctAnswer
    );
    setIsCorrect(allCorrect);

    if (allCorrect && currentIsland < islands.length - 1) {
      setCurrentIsland(currentIsland + 1);
      setAnswers({});
      setIsCorrect(false);
    } else if (!allCorrect) {
      setWrongAttempts((prev) => prev + 1);
      if (wrongAttempts + 1 >= 2) {
        setIsLocked(true);
        setTimeLeft(180); // Start the 2 minutes countdown
      }
    }
  };

  useEffect(() => {
    if (isLocked) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsLocked(false);
            setTimeLeft(180); // Reset time
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLocked]);

  useEffect(() => {
    let timer;
    if (isLocked && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsLocked(false);
      setWrongAttempts(0);
    }
    return () => clearInterval(timer);
  }, [isLocked, timeLeft]);

  // isko at the end pura code hone pr uncomment krna hai

  // Security Measures
  useEffect(() => {
    // Disable Right-Click
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Disable Key Combinations (F12, Ctrl+Shift+I, etc.)
    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "U") ||
        e.key === "F5" ||
        (e.ctrlKey && e.key === "r") ||
        e.key === "Backspace" ||
        (e.altKey && (e.key === "ArrowLeft" || e.key === "ArrowRight"))
      ) {
        e.preventDefault();
      }
    };

    // Prevent Back/Forward Navigation with History API
    history.pushState(null, null, window.location.href);
    const handlePopState = () => {
      history.pushState(null, null, window.location.href);
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div>
      <Link to="/" className="text-blue-500 mb-4 inline-block fall-back">
        &larr; Back to Map
      </Link>
      <h2 className="text-xl mb-2 font-bold text-4c5eba rotating-text">
        East Blue
      </h2>
      <div className="relative">
        <div className="absolute top-1/2 left-0  right-0 h-1 bg-blue-300 transform -translate-y-1/2"></div>
        <div className="flex justify-between text-white items-center relative z-10">
          {islands.map((island, index) => (
            <div
              key={island.id}
              className={`flex flex-col items-center cursor-pointer ${
                index <= currentIsland ? "opacity-100" : "opacity-50"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index === currentIsland
                    ? "bg-yellow-300"
                    : index < currentIsland
                    ? "bg-green-300"
                    : "bg-gray-300"
                }`}
              >
                <MapPin size={24} className="text-gray-700" />
              </div>
              <span className="text-sm mt-1">{island.name}</span>
            </div>
          ))}
        </div>
      </div>
      {currentIsland < islands.length && (
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold mb-2">
            {islands[currentIsland].name}
          </h3>
          <form onSubmit={handleSubmit}>
            {islands[currentIsland].questions.map((q) => (
              <div key={q.id} className="mb-4">
                <p className="font-medium">{q.question}</p>
                {q.options.map((option) => (
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
            <p className="mt-4 text-green-500">
              Correct! You can move to the next island.
            </p>
          )}
          {isCorrect && currentIsland === islands.length - 1 && (
            <p className="mt-4 text-black-500">
            Arrgh! Booty be hidin' in the swashbucklin' Boxing arena, next to
            the grog-filled V Lounge! Keep yer wits sharp and yer cutlass
            ready, matey!🏴‍☠️🍻"
          </p>
          )}
          {!isCorrect && !isLocked && <p className="mt-4 text-red-500"></p>}
        </div>
      )}
      {isLocked && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <img
              src={devilSmile}
              alt="BlackBeard"
              className="w-25 h-27 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-red-600">
              You’ve put 2 wrong inputs!
            </h2>
            <p className="text-gray-700">Now wait for:</p>
            <p className="text-2xl font-bold text-blue-500">{`${Math.floor(
              timeLeft / 60
            )}:${timeLeft % 60 < 10 ? "0" : ""}${timeLeft % 60}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EastBlue;
