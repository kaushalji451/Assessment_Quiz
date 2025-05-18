import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Assessment = () => {
  const location = useLocation();
  const userId = location.state.id;
  const navigate = useNavigate();
  const [selected, setselected] = useState({});
  const [submited, setsubmited] = useState({});
  const [currcount, setcurrcount] = useState(0);
  const [questions, setquestions] = useState(null);
  const [score, setscore] = useState({
    totalQuestion: null,
    timeLeft: null,
    rightAnswer: null,
  });

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
      try {
        let data = await fetch(
          `http://localhost:3001/questions?userId=${userId}`
        );
        if (data.status !== 200) {
          throw new Error("Failed to fetch questions");
        }
        let result = await data.json();
        setquestions(result.questions);
      } catch (error) {
        console.log(error);
        setquestions([]);
      }
    };
    Questions();
  }, [userId]);

  // how many questions submitted
  useEffect(() => {
    const newSubmitted = {};
    if (questions != null) {
      questions.forEach((_, index) => {
        newSubmitted[index] = false;
      });
      setsubmited(newSubmitted);
    }
  }, []);

  // handle option change
  const handleOptionChange = (qIndex, option) => {
    setselected((prev) => ({
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
    setsubmited(updatedSubmitted);
    let cnt = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correctAns === selected[i]) {
        cnt = cnt + 1;
      }
    }
    setcurrcount(cnt);
    clearInterval(timer);
  };

  useEffect(() => {
    if (currcount != 0) {
      handleScore();
    }
  }, [currcount]);

  let handleScore = () => {
    setscore({
      totalQuestion: questions.length,
      timeLeft: timeLeft,
      rightAnswer: currcount != 0 && currcount,
    });
  };

  if (score.rightAnswer != null) {
    navigate("/score", { state: { score: score, userId: userId } });
  }

  return (
    <div className=" flex justify-center">
      <div className=" absolute fixed w-full bg-white border border-zinc-400 flex justify-center">
        <div className="flex justify-between w-[90%] mb-2 py-2 px-2">
          <h1 className="text-xl font-semibold flex justify-center items-center">
            Assessment Quiz
          </h1>
          <h1 className="bg-zinc-100 py-2 px-4 rounded-lg font-semibold">
            {formatTime()}
          </h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className=" mb-8  w-[90%] h-full rounded-lg pb-4 mt-20"
      >
        {/* questions */}
        {questions != null &&
          questions.map((qui, qIndex) => (
            <div
              key={qIndex}
              className="p-4 border rounded-md border-zinc-400 my-6 mt-2"
            >
              <p className="font-bold">
                <span className="bg-black text-white  px-1 rounded-xs">?</span>{" "}
                Question {qIndex + 1}*
              </p>

              <div className="bg-zinc-100 my-2 px-4 py-4 rounded-lg">
                <p>{qui.question}</p>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                {qui.options.map((option, optIndex) => {
                  const inputId = `question-${qIndex}-option-${optIndex}`;
                  return (
                    <label key={optIndex} className="flex items-center">
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={option}
                        checked={selected[qIndex] === option}
                        onChange={() => handleOptionChange(qIndex, option)}
                        disabled={submited[qIndex]}
                        required
                        className="size-3 me-4"
                      />
                      <div className="w-full bg-zinc-100 py-1 rounded-lg px-3">
                        {option}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

        <div className="flex justify-center">
          <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Assessment;
