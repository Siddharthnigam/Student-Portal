import React, { useState, useEffect } from "react";

const quizBank = {
  JavaScript: [
    {
      question: "💻 What does 'this' keyword refer to?",
      options: ["Global object", "Calling object", "Window", "Current scope"],
      answer: "Calling object",
      hint: "In methods, it refers to the object owning the method.",
    },
    {
      question: "🌀 How to debounce a function?",
      options: ["setTimeout + clearTimeout", "setInterval", "onload", "loop()"],
      answer: "setTimeout + clearTimeout",
      hint: "Prevents excessive calls during rapid events.",
    },
  ],
  SQL: [
    {
      question: "⚙️ What does SQL stand for?",
      options: ["Simple Query Logic", "Structured Query Language", "Sorted Queue List", "Server Question Language"],
      answer: "Structured Query Language",
      hint: "Used to query and manage relational databases.",
    },
    {
      question: "🔑 Which keyword creates a primary key?",
      options: ["KEY", "PRIMARY", "UNIQUE", "INDEX"],
      answer: "PRIMARY",
      hint: "Ensures uniqueness in a table.",
    },
  ],
  Git: [
    {
      question: "🔍 What does `git status` show?",
      options: ["Commits", "Remote repos", "Branches", "Staged/unstaged changes"],
      answer: "Staged/unstaged changes",
      hint: "Tells what’s ready to commit and what's not.",
    },
    {
      question: "🚀 What does `git push` do?",
      options: ["Pull code", "Save locally", "Send commits to remote", "Delete branch"],
      answer: "Send commits to remote",
      hint: "It makes your changes visible on GitHub.",
    },
  ],
};

const QuizGame = () => {
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(15);
  const [name, setName] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (category) {
      setQuestions(quizBank[category] || []);
      setCurrentQ(0);
      setScore(0);
      setSelected("");
      setShowResult(false);
      setTimer(15);
    }
  }, [category]);

  useEffect(() => {
    if (category && !showResult) {
      const interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            handleTimeout();
            return 15;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentQ, category, showResult]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    setLeaderboard(saved.slice(0, 5));
  }, []);

  const handleAnswer = (option) => {
    setSelected(option);
    if (questions[currentQ]?.answer === option) {
      setScore((s) => s + 1);
    }
    setTimeout(nextQuestion, 700);
  };

  const handleTimeout = () => {
    setSelected("⏱️ Time's up!");
    setTimeout(nextQuestion, 700);
  };

  const nextQuestion = () => {
    setTimer(15);
    setSelected("");
    if (currentQ + 1 < questions.length) {
      setCurrentQ((q) => q + 1);
    } else {
      setShowResult(true);
    }
  };

  const saveScore = () => {
    if (!name.trim()) return;
    const newEntry = { name, score, date: new Date().toLocaleString() };
    const updated = [newEntry, ...leaderboard].sort((a, b) => b.score - a.score).slice(0, 5);
    localStorage.setItem("leaderboard", JSON.stringify(updated));
    setLeaderboard(updated);
    setName("");
  };

  const resetGame = () => {
    setCategory("");
    setQuestions([]);
    setCurrentQ(0);
    setScore(0);
    setSelected("");
    setShowResult(false);
    setTimer(15);
  };

  const progress = questions.length > 0 ? ((currentQ + (showResult ? 1 : 0)) / questions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-6 flex flex-col items-center justify-center">
      {!category ? (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center space-y-6 max-w-md w-full">
          <h2 className="text-2xl font-bold text-indigo-700">📚 Choose Quiz Category</h2>
          {Object.keys(quizBank).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              {cat}
            </button>
          ))}
        </div>
      ) : (
        <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-6 space-y-6">
          {questions.length > 0 && !showResult ? (
            <>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Category: <strong>{category}</strong></span>
                <span>⏱️ Time left: {timer}s</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-indigo-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <h2 className="text-xl font-semibold text-indigo-700">{questions[currentQ]?.question || "Loading..."}</h2>
              <p className="text-sm italic text-gray-600">{questions[currentQ]?.hint || ""}</p>
              <div className="space-y-3">
                {questions[currentQ]?.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selected}
                    className={`w-full px-4 py-2 rounded border font-medium ${
                      selected === option
                        ? option === questions[currentQ]?.answer
                          ? "bg-green-200 border-green-500"
                          : "bg-red-200 border-red-500"
                        : "bg-white border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 text-center">
                Question {currentQ + 1} of {questions.length}
              </p>
            </>
          ) : (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-green-600">🎉 Quiz Completed</h2>
              <p className="text-lg">Your Score: <strong>{score}</strong> / {questions.length}</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name for leaderboard"
                className="w-full px-4 py-2 border rounded"
              />
              <button onClick={saveScore} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Save Score
              </button>
              <button onClick={resetGame} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                Play Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* 🏆 Leaderboard */}
      {leaderboard.length > 0 && (
        <div className="mt-8 max-w-xl w-full bg-white p-6 rounded shadow text-sm space-y-2">
          <h3 className="text-lg font-semibold text-indigo-700">🏆 Top Scores</h3>
          {leaderboard.map((entry, idx) => (
            <div key={idx}>
              {idx + 1}. {entry.name} — {entry.score} pts <span className="text-xs text-gray-500">({entry.date})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizGame;