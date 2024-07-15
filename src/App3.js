import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/analyze", {
        text: input,
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while analyzing the text. Please try again.");
    }
    setIsLoading(false);
  };

  const renderFeedbackSection = (title, feedback) => (
    <div className="feedback-section">
      <h3>{title}</h3>
      <p>Score: {feedback.score.toFixed(2)}</p>
      <p>
        <strong>Strengths:</strong> {feedback.strengths}
      </p>
      <p>
        <strong>Areas for Improvement:</strong> {feedback.improvements}
      </p>
    </div>
  );

  const renderGrammarFeedback = (grammar) => (
    <div className="feedback-section">
      <h3>Grammar:</h3>
      <p>Score: {grammar.score.toFixed(2)}</p>
      {grammar.strengths && (
        <p>
          <strong>Strengths:</strong> {grammar.strengths}
        </p>
      )}
      {grammar.improvements.length > 0 && (
        <div>
          <p>
            <strong>Areas for Improvement:</strong>
          </p>
          <ul>
            {grammar.improvements.map((error, index) => (
              <li key={index}>
                <strong>Issue:</strong> {error.message}
                <br />
                <strong>Context:</strong> "...{error.context}..."
                <br />
                {error.replacements.length > 0 && (
                  <>
                    <strong>Suggestions:</strong>{" "}
                    {error.replacements.join(", ")}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="App">
      <h1>Interview Response Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter interview response here"
          rows="10"
          cols="50"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
      {result && (
        <div className="results">
          <h2>Analysis Results:</h2>
          {renderFeedbackSection(
            "Technical Content",
            result.technical_feedback
          )}
          {renderFeedbackSection("Confidence", result.confidence_feedback)}
          {renderGrammarFeedback(result.grammar_feedback)}
        </div>
      )}
    </div>
  );
}

export default App;
