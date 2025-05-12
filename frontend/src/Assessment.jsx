import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const Assessment = () => {
  const [selected, setSelected] = useState({});
  const [submited, setSubmited] = useState({});
  const [currcount, setcurrcount] = useState(0);
  const [questions, setquestions] = useState(null);
  const location = useLocation();
  const userId = location.state.id;

  // timer;
  const [timeLeft, settimeLeft] = useState(60 * 60);
  let timer;
  useEffect(() => {
    if (timeLeft <= 0) return;

    timer = setInterval(() => {
      settimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Convert seconds to mm:ss format
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // questions get
  useEffect(() => {
    let Questions = async () => {
      let data = await fetch(
        `http://localhost:8080/questions?userId=${userId}`
      );
      let result = await data.json();
      setquestions(result.questions);
    };
    Questions();
  }, [userId]);

  // how mnay submitted
  useEffect(() => {
    const newSubmitted = {};
    if (questions != null) {
      questions.forEach((_, index) => {
        newSubmitted[index] = false;
      });
      setSubmited(newSubmitted);
    }
  }, []);

  // handle option change
  const handleOptionChange = (qIndex, option) => {
    setSelected((prev) => ({
      ...prev,
      [qIndex]: option,
    }));
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSubmitted = { ...submited };
    if (questions != null) {
      questions.forEach((_, index) => {
        if (selected[index]) {
          updatedSubmitted[index] = true;
        }
      });
    }
    setSubmited(updatedSubmitted);
    let cnt = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correctAns === selected[i]) {
        cnt = cnt + 1;
      }
    }
    setcurrcount(cnt);
    clearInterval(timer);
    // time left
    console.log("total questions ",questions.length);
    console.log(timeLeft);
  };

  // no of right answers
  useEffect(() => {
    console.log("this is no of right ans", currcount);
  }, [currcount]);

  return (
    <div>
      <p className="bg-blue-200 mb-10">These are your questions</p>

      <h1>Countdown: {formatTime()}</h1>
      <form onSubmit={handleSubmit}>
        {questions != null &&
          questions.map((qui, qIndex) => (
            <div key={qIndex} className="px-3 my-3">
              <p>
                Q{qIndex + 1}. {qui.question}
              </p>
              {qui.options.map((option, optIndex) => (
                <label key={optIndex} className="block">
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    value={option}
                    checked={selected[qIndex] === option}
                    onChange={() => handleOptionChange(qIndex, option)}
                    disabled={submited[qIndex]}
                    required
                  />{" "}
                  {option}
                </label>
              ))}
            </div>
          ))}
        <button
          className="bg-blue-400 py-2 px-4 mx-4 rounded-md font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Assessment;
