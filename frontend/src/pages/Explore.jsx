import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Play,
  Code,
  Terminal,
  Copy,
  Download,
  Trash2,
  Settings,
  Maximize2,
  Save,
  RefreshCw,
} from "lucide-react";
import MonacoEditor from "@monaco-editor/react";

const IconButton = ({ icon: Icon, label, onClick, variant = "default" }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`p-2 rounded-lg backdrop-blur-sm flex items-center space-x-2 transition-all
      ${
        variant === "default"
          ? "bg-white/5 hover:bg-white/10 border border-white/10"
          : variant === "primary"
          ? "bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30"
          : "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
      }`}
    title={label}
  >
    <Icon className="w-4 h-4" />
    <span className="text-sm hidden md:inline">{label}</span>
  </motion.button>
);

const Explore = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [codeSnippet, setCodeSnippet] = useState(
    `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello world!" << endl;\n  return 0;\n}`
  );
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("Ready to execute...");
  const [isRunning, setIsRunning] = useState(false);

  // Define the languageOptions object here
  const languageOptions = {
    "C++": `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello world!" << endl;\n  return 0;\n}`,
    Python: `print("Hello world!")`,
    JavaScript: `console.log("Hello world!");`,
    Java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello world!");\n  }\n}`,
  };

  const languageIds = {
    "C++": 54,
    Python: 71,
    JavaScript: 63,
    Java: 62,
  };

  const monacoLanguages = {
    "C++": "cpp",
    Python: "python",
    JavaScript: "javascript",
    Java: "java",
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCodeSnippet(languageOptions[lang]);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Running...");

    try {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          source_code: codeSnippet,
          language_id: languageIds[selectedLanguage],
          stdin: input,
        },
        {
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key":
              "YOUR_RAPIDAPI_KEY", // Replace with your actual RapidAPI key
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = response.data;

      // Poll the API to get the result
      const checkStatus = async () => {
        const result = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
          {
            headers: {
              "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
              "x-rapidapi-key":
                "YOUR_RAPIDAPI_KEY", // Replace with your actual RapidAPI key
            },
          }
        );
        if (result.data.status.id <= 2) {
          setTimeout(checkStatus, 1000); // Retry if still processing
        } else {
          setOutput(result.data.stdout || result.data.stderr || "No output");
          setIsRunning(false);
        }
      };

      checkStatus();
    } catch (error) {
      setOutput("Error occurred while executing code");
      setIsRunning(false);
    }
  };

  // Handle code download
  const handleDownloadCode = () => {
    const extensions = {
      "C++": "cpp",
      Python: "py",
      JavaScript: "js",
      Java: "java",
    };
    const extension = extensions[selectedLanguage] || "txt";
    const filename = `code.${extension}`;

    const blob = new Blob([codeSnippet], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mt-[40px]"
          >
            <Code className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-400 text-sm">Code Editor</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Write, Run, and
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              {" "}
              Debug
            </span>
          </motion.h1>
        </div>

        {/* Main Editor Section */}
        <div className="rounded-2xl backdrop-blur-lg bg-black/30 border border-white/10 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="bg-black/50 text-white px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-md"
              >
                {Object.keys(languageOptions).map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <IconButton icon={Copy} label="Copy" variant="primary" />
              <IconButton icon={Save} label="Save" variant="primary" />
              <IconButton
                icon={Download}
                label="Download"
                variant="primary"
                onClick={handleDownloadCode} // Add this line
              />
              <IconButton icon={Settings} label="Settings" variant="primary" />
              <IconButton icon={Maximize2} label="Fullscreen" variant="primary" />
            </div>
          </div>

          {/* Editor Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
            {/* Code Input using Monaco Editor */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-purple-400 font-semibold flex items-center">
                    <Code className="w-4 h-4 mr-2" />
                    Source Code
                  </h2>
                  <IconButton
                    icon={RefreshCw}
                    label="Reset"
                    variant="danger"
                    onClick={() => setCodeSnippet(languageOptions[selectedLanguage])}
                  />
                </div>
                <MonacoEditor
                  height="400px"
                  language={monacoLanguages[selectedLanguage]}
                  value={codeSnippet}
                  onChange={(value) => setCodeSnippet(value || "")}
                  theme="vs-dark"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                  }}
                />
              </div>
            </div>

            {/* Input/Output Section */}
            <div className="space-y-4">
              {/* Input */}
              <div className="rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-blue-400 font-semibold flex items-center">
                    <Terminal className="w-4 h-4 mr-2" />
                    Input (STDIN)
                  </h2>
                  <IconButton
                    icon={Trash2}
                    label="Clear"
                    variant="danger"
                    onClick={() => setInput("")}
                  />
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full h-32 bg-black/30 text-white p-4 rounded-lg border border-white/10 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  placeholder="Enter your input here..."
                />
              </div>

              {/* Output */}
              <div className="rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 p-4">
                <h2 className="text-green-400 font-semibold mb-4 flex items-center">
                  <Terminal className="w-4 h-4 mr-2" />
                  Output (STDOUT)
                </h2>
                <div className="w-full h-32 bg-black/30 text-gray-400 p-4 rounded-lg border border-white/10 font-mono text-sm">
                  {output}
                </div>
              </div>

              {/* Run Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRunCode}
                disabled={isRunning}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-purple-500/25 transition-shadow disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Run Code</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Explore;
