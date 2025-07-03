import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChatBot = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessages = [...chatMessages, { text: trimmed, sender: "user" }];
    setChatMessages(newMessages);
    setInput("");

    const apiKey = "AIzaSyBXNnpL8o1SPCda4040gUMGmgzYpVuPBsY";
    const prompt = {
      contents: [{ parts: [{ text: trimmed }] }],
    };

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(prompt),
        }
      );

      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand the response. Please try again.";

      setChatMessages([...newMessages, { text: reply, sender: "bot" }]);
    } catch (err) {
      setChatMessages([
        ...newMessages,
        {
          text: "An error occurred while fetching the response.",
          sender: "bot",
        },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <motion.div
      className="bg-gray-100 text-gray-800 min-h-screen font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero */}
      <motion.div
        className="text-center py-16 px-4 bg-gray-800 text-white mb-12 rounded-b-[50px] shadow-lg"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold mb-4">Your Ai Assistant</h1>
        <p className="text-lg mb-6">
          Welcome to your ultimate conversational assistant, available to chat anytime.
        </p>
        <img
          src="https://images.pexels.com/photos/18069814/pexels-photo-18069814/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-piece-explores-the-prediction-method-used-in-large-language-models-it-was-created-by-artist-wes-cockx-as-part-of-the-visuali.png?auto=compress&cs=tinysrgb&w=600"
          alt="Chatbot Logo"
          className="w-40 rounded-full mx-auto shadow-md"
        />
      </motion.div>

      {/* Chat Section */}
      <motion.div
        className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 space-y-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold text-center">Start Learning</h2>

        <div className="flex flex-col h-96 border border-gray-800 rounded-lg overflow-hidden">
          {/* Chat Window */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4 text-sm">
            <AnimatePresence initial={false}>
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[85%] rounded px-4 py-2 ${
                    msg.sender === "user"
                      ? "bg-gray-800 text-white self-end text-right"
                      : "bg-gray-200 text-gray-800 self-start text-left"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <motion.div
            className="flex gap-2 p-4 bg-gray-200 border-t border-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
            >
              Send
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <br />
    </motion.div>
  );
};

export default ChatBot;