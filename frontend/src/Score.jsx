import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
const Score = () => {
  const location = useLocation();
  const userId = location.state.userId;
  const score = location.state.score;
  let totalScore = Math.floor((score.rightAnswer / score.totalQuestion) * 100);
  const minutes = Math.floor(score.timeLeft / 60);
  const seconds = score.timeLeft % 60;
  const timeLeftInMMSS = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const [scoreDetails, setscoreDetails] = useState({
    totalQuestion: score.totalQuestion,
    timeLeft: timeLeftInMMSS,
    correctAnswer: score.rightAnswer,
    percentage: totalScore,
  });

  useEffect(() => {
    const submittedKey = `submitted_${userId}`;
    const alreadySubmitted = sessionStorage.getItem(submittedKey);

    if (!alreadySubmitted) {
      const handleDataSubmit = async () => {
        try {
          const res = await fetch(
            `http://localhost:8080/assessment/score?userId=${userId}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(scoreDetails),
            }
          );
          const result = await res.json();
          console.log("Score submitted:", result);

          const emailRes = await fetch(
            `http://localhost:8080/assessment/sendEmail?userId=${userId}`
          );
          const emailResult = await emailRes.json();
          console.log("Email sent:", emailResult);

          sessionStorage.setItem(submittedKey, "true"); // Mark as submitted
        } catch (error) {
          console.error("Error submitting data:", error);
        }
      };

      handleDataSubmit();
    }
  }, [userId, scoreDetails]);

  return (
    <>
      <div>
        <p>Congratulation Your Assessment was submited</p>
        <p>Total Questions {score.totalQuestion}</p>
        <p>Total Correct Answers {score.rightAnswer}</p>
        <p>Your Score is {totalScore}%</p>
        <Link to={"/"}>Go to Dashbord</Link>
      </div>
    </>
  );
};

export default Score;
