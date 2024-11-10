import React, { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import screenfull from "screenfull";
import {
  Play,
  Code,
  Copy,
  Download,
  Fullscreen,
  X as ExitFullscreen,
  Save,
} from "lucide-react";
import MonacoEditor from "@monaco-editor/react";

// API configuration
const API_CONFIG = {
  baseURL: 'https://judge0-ce.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': 'b9e140a6camsh2ba37e668a9dfbep1f407bjsn27de22535a1e',
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  }
};

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
  const [selectedLanguage, setSelectedLanguage] = useState("Python");
  const [codeSnippet, setCodeSnippet] = useState(
    `print("Hello world!")\na=5\nprint("\\n\\t a : ",a)`
  );
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("Ready to execute...");
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef(null);

  const languageOptions = {
    "C++": `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello world!" << endl;\n  return 0;\n}`,
    Python: `print("Hello world!")\na=5\nprint("\\n\\t a : ",a)`,
    JavaScript: `console.log("Hello world!");\nlet a = 5;\nconsole.log("\\n\\t a : ", a);`,
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

  // Function to format the output properly
  const formatOutput = (output) => {
    if (!output) return "";
    
    // Replace escaped newlines and tabs with actual newlines and tabs
    return output
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      // Remove any extra quotes that might be wrapping the output
      .replace(/^"(.*)"$/s, '$1')
      // Remove any escaped quotes
      .replace(/\\"/g, '"');
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Running...");

    try {
      // Create submission
      const submissionResponse = await axios.post(
        `${API_CONFIG.baseURL}/submissions`,
        {
          source_code: codeSnippet,
          language_id: languageIds[selectedLanguage],
          stdin: input,
        },
        { headers: API_CONFIG.headers }
      );

      const { token } = submissionResponse.data;

      // Poll for results
      const getResult = async () => {
        try {
          const response = await axios.get(
            `${API_CONFIG.baseURL}/submissions/${token}`,
            { headers: API_CONFIG.headers }
          );

          const { status, stdout, stderr, compile_output } = response.data;

          if (status?.id <= 2) {
            // Still processing
            setTimeout(getResult, 1000);
            return;
          }

          // Handle different types of output
          if (stderr) {
            setOutput(`Error: ${formatOutput(stderr)}`);
          } else if (compile_output) {
            setOutput(`Compilation Error: ${formatOutput(compile_output)}`);
          } else if (stdout) {
            setOutput(formatOutput(stdout));
          } else {
            setOutput("Program executed with no output");
          }

          setIsRunning(false);
        } catch (error) {
          console.error("Error checking submission:", error);
          setOutput(`Error checking submission: ${error.message}`);
          setIsRunning(false);
        }
      };

      // Start polling
      await getResult();
    } catch (error) {
      console.error("Error submitting code:", error);
      setOutput(`Error submitting code: ${error.message}`);
      setIsRunning(false);
    }
  };

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

  const toggleFullscreen = () => {
    if (screenfull.isEnabled && editorRef.current) {
      screenfull.toggle(editorRef.current);
      setIsFullscreen(!isFullscreen);
    }
  };

  return (
    <div ref={editorRef} className={`min-h-screen ${isFullscreen ? "fullscreen" : ""} bg-gradient-to-b from-black via-purple-900/10 to-black py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="rounded-2xl backdrop-blur-lg bg-black/30 border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
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
                onClick={handleDownloadCode}
              />
              <IconButton
                icon={isFullscreen ? ExitFullscreen : Fullscreen}
                label="Fullscreen"
                variant="primary"
                onClick={toggleFullscreen}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 p-4">
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

            <div className="space-y-4">
              <div className="rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 p-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full h-32 bg-black/30 text-white p-4 rounded-lg border border-white/10 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  placeholder="Enter your input here..."
                />
              </div>

              <div className="rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 p-4">
                <pre className="w-full h-32 bg-black/30 text-gray-400 p-4 rounded-lg border border-white/10 font-mono text-sm overflow-auto whitespace-pre-wrap">
                  {output}
                </pre>
              </div>

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