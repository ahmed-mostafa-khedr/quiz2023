import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Menu } from "semantic-ui-react";

import Stats from "./Stats";
import QNA from "./QNA";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const Result = ({
  totalQuestions,
  correctAnswers,
  timeTaken,
  questionsAndAnswers,
  replayQuiz,
  resetQuiz,
}) => {
  const [activeTab, setActiveTab] = useState("Stats");
  const handle = useFullScreenHandle();
  const handleTabClick = (e, { name }) => {
    setActiveTab(name);
  };
  useEffect(() => {
    handle.exit();
  });
  return (
    <Container>
      <Menu fluid widths={2}>
        <Menu.Item
          name="Stats"
          active={activeTab === "Stats"}
          onClick={handleTabClick}
        />
        <Menu.Item
          name="QNA"
          active={activeTab === "QNA"}
          onClick={handleTabClick}
        />
      </Menu>
      {activeTab === "Stats" && (
        <Stats
          totalQuestions={totalQuestions}
          correctAnswers={correctAnswers}
          timeTaken={timeTaken}
          replayQuiz={replayQuiz}
          resetQuiz={resetQuiz}
        />
      )}
      {activeTab === "QNA" && <QNA questionsAndAnswers={questionsAndAnswers} />}
      <br />
      {/*  
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        <div>
          <div className="" style={{ marginBottom: "20px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="bi bi-check-circle-fill ui green"
              width="75"
              height="75"
              fill="#000"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </div>
          <div className="text-center">
            <h1 style={{ fontSize: "40px", fontFamily: "para" }}>
              Thank You !
            </h1>
            <p>
              We've send the link to your inbox. Lorem ipsum dolor sit,Lorem
              ipsum dolor sit{" "}
            </p>
          </div>
        </div>
      </div>
    */}
    </Container>
  );
};

Result.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  questionsAndAnswers: PropTypes.array.isRequired,
  replayQuiz: PropTypes.func.isRequired,
  resetQuiz: PropTypes.func.isRequired,
};

export default Result;
