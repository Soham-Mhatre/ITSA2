import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import devilSmile from "../components/devilsmile.png";
import ship from "../components/ship.png";
import marines from "../components/marines.png";
import pirate from "../components/pirate.png";

const islands = [
  {
    id: 1,
    name: "Sabaody Archipelago",
    questions: [
      {
        id: "sabaody1",
        question:
        "I rise above the landscape, reflecting the sun's first light, A symbol of sacrifice, shining so bright. In the heart of India, I stand with pride, Honoring those who bravely died. What am I, a monument to the nation's might?",
      options: [
        "Amar Jawan Jyoti",
        "Statue of Unity",
        "India Gate",
        "Jallianwala Bagh Memorial"
      ],
      correctAnswer: "India Gate"
,
      },
    ],
  },
  {
    id: 2,
    name: "Amazon Lily",
    questions: [
      {
        id: "amazon1",
        question:
          "Which famous sea-facing promenade in Mumbai is known for its stunning views and is a popular spot for evening strolls?",
        options: [
          "Juhu Beach",
          "Marine Drive",
          "Worli Seaface",
          "Versova Beach",
        ],
        correctAnswer: "Marine Drive",
      },
    ],
  },
  {
    id: 3,
    name: "Impel Down",
    questions: [
      {
        id: "impel1",
        question:
          "In the city of dreams, I stand tall, A gateway for many, I welcome all. With arches that echo stories of yore, What am I, opening India's door?",
        options: [
          "Charminar",
          "Victoria Memorial",
          "India Gate",
          "Gateway of India",
        ],
        correctAnswer: "Gateway of India",
      },
    ],
  },
  {
    id: 4,
    name: "Marineford",
    questions: [
      {
        id: "marine1",
        question:
          "The code 'VSZZC KZE' (Caesar cipher with shift 5) points to something essential for their travels.",
        options: ["FIREWALL", "ENCRYPTION", "DATA CODE", "NETWORK"],
        correctAnswer: "ENCRYPTION",
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
          "Q1-B, Q2-D, Q3-A, Q4-B",
          "Q1-C, Q2-B, Q3-D, Q4-B",
          "Q1-A, Q2-B, Q3-D, Q4-B",
          "Q1-A, Q2-B, Q3-D, Q4-B",
        ],
        correctAnswer: "Q1-C, Q2-B, Q3-D, Q4-B",
      },
    ],
  },
];

const Route4 = () => {
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
        setTimeLeft(180); // Start the 3 minutes countdown
      }
    }
  };

  useEffect(() => {
    let timer;
    if (isLocked) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
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
    <div className="overflow-hidden h-screen">
      <Link to="/" className="text-blue-500 mb-4 inline-block fall-back">
        &larr; Back to Map
      </Link>
      <h2 className="text-xl mb-2 font-bold rotating-text">West Blue</h2>
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-300 transform -translate-y-1/2"></div>
        <div className="flex justify-between text-white items-center relative z-10">
          {islands.map((island, index) => (
            <div
              key={island.id}
              className={`flex flex-col items-center cursor-pointer ${
                index <= currentIsland ? "opacity-100" : "opacity-50"
              }`}
            >
              <div
                className={`w-15 h-12 rounded-full flex items-center justify-center`}
              >
                {index === currentIsland ? (
                  <img src={ship} alt="Ship" className="w-50 h-20" />
                ) : index < currentIsland ? (
                  <img src={pirate} alt="Pirate" className="w-50 h-20 " />
                ) : (
                  <img src={marines} alt="Marines" className="w-20 h-20 bg-gray-300" />
                )}
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
              alt="Devil Smile"
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

export default Route4;
