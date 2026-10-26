
import { useState } from "react";
import "./index.css";

const questionBank = [
  {
    question: "Which programming language do you prefer?",
    options: ["Java", "Python", "C++", "JavaScript"],
  },
  {
    question: "How do you prefer learning?",
    options: ["Videos", "Books", "Projects", "Classroom"],
  },
  {
    question: "How many hours do you study daily?",
    options: ["Less than 1 hour", "1-2 hours", "3-4 hours", "More than 4 hours"],
  },
  {
    question: "Which technology interests you most?",
    options: ["AI", "Web Development", "Cybersecurity", "Cloud Computing"],
  },
  {
    question: "How often do you use the internet for learning?",
    options: ["Daily", "Weekly", "Sometimes", "Rarely"],
  },
  {
    question: "Which device do you use for studying?",
    options: ["Laptop", "Desktop", "Mobile", "Tablet"],
  },
  {
    question: "What is your career goal?",
    options: ["Software Developer", "Data Analyst", "Entrepreneur", "Government Job"],
  },
  {
    question: "How do you prefer working?",
    options: ["Individually", "In a team", "Both", "Depends on task"],
  },
  {
    question: "Which skill do you want to improve?",
    options: ["Communication", "Programming", "Problem Solving", "Leadership"],
  },
  {
    question: "How satisfied are you with online learning?",
    options: ["Very satisfied", "Satisfied", "Neutral", "Not satisfied"],
  },
];

function getRandomQuestions() {
  return [...questionBank]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
}

function App() {
  const [questions, setQuestions] = useState(getRandomQuestions);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.keys(answers).length !== 5) {
      setError("Please answer all 5 questions!");
      return;
    }

    setSubmitted(true);
    setError("");
  }

  function restartSurvey() {
    setQuestions(getRandomQuestions());
    setAnswers({});
    setSubmitted(false);
    setError("");
  }

  return (
    <div className="page">
      <header className="header">
        <div className="logo">S</div>
        <div>
          <h1>SurveySpace</h1>
          <p>Every opinion matters.</p>
        </div>
      </header>

      <main className="survey-card">
        {!submitted ? (
          <>
            <span className="tag">ONLINE SURVEY</span>
            <h2>We'd love to hear from you!</h2>
            <p className="description">
              Answer these 5 randomly selected questions.
            </p>

            <div className="progress-info">
              <span>Survey Progress</span>
              <strong>{Object.keys(answers).length} / 5 answered</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${Object.keys(answers).length * 20}%`,
                }}
              />
            </div>

            <form onSubmit={handleSubmit}>
              {questions.map((item, index) => (
                <section className="question" key={item.question}>
                  <h3>
                    <span className="number">{index + 1}</span>
                    {item.question}
                  </h3>

                  <div className="options">
                    {item.options.map((option) => (
                      <label
                        key={option}
                        className={
                          answers[index] === option
                            ? "option selected"
                            : "option"
                        }
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          checked={answers[index] === option}
                          onChange={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              [index]: option,
                            }))
                          }
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </section>
              ))}

              {error && <p className="error">{error}</p>}

              <button className="submit-button" type="submit">
                Submit Survey →
              </button>
            </form>
          </>
        ) : (
          <div className="success">
            <div className="success-icon">✓</div>
            <h2>Thank you!</h2>
            <p>Your survey was submitted successfully.</p>

            <h3>Your Answers</h3>

            {questions.map((item, index) => (
              <div className="result" key={item.question}>
                <p>
                  <strong>{index + 1}. {item.question}</strong>
                </p>
                <p className="answer">{answers[index]}</p>
              </div>
            ))}

            <button
              className="submit-button"
              onClick={restartSurvey}
              type="button"
            >
              Take Another Survey ↻
            </button>
          </div>
        )}
      </main>

      <footer>© 2026 SurveySpace | Your opinion matters</footer>
    </div>
  );
}

export default App;
