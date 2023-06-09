import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import img_36 from "./img-36.png";
import img_45 from "./45.png";
import img_46 from "./46.PNG";
import Stack from "@mui/material/Stack";
import {
  Container,
  Segment,
  Item,
  Divider,
  Button,
  Icon,
  Message,
  Menu,
  Header,
  Modal,
  Checkbox,
} from "semantic-ui-react";
import he from "he";

import Countdown from "../Countdown";
import { getLetter } from "../../utils";

const Quiz = ({ data, countdownTime, endQuiz }) => {
  const [back, setBack] = useState(false);
  const [show, setShow] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userSlectedAns, setUserSlectedAns] = useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [ans, setans] = useState([]);
  const [noAns, setNoAns] = useState(true);
  const [disable, setDisabled] = useState(false);

  // useEffect(() => {
  //   setNot(questionsAndAnswers.filter((i) => i.user_answer == null));
  //   setNoAns(not.length + 1);
  //   setDataOptions((dataOptions) => [...dataOptions, data[noAns]]);
  // }, [questionIndex]);
  // console.log("length :" + noAns, dataOptions);
  const handleItemClick = (e, { name }) => {
    setUserSlectedAns(name);
    setNoAns(false);
    // setAgreed(true);
  };

  // useEffect(() => {
  //   setShow(false);
  // }, [agreed]);
  const d = JSON.parse(localStorage.getItem("userAnswer"));
  const ds = JSON.parse(localStorage.getItem("userSelectAnswer"));
  const handleNext = () => {
    let point = 0;
    if (!userSlectedAns) {
      point = 2;
      // setNoAns((prev) => [...prev, questionIndex]);
    } else if (
      userSlectedAns === he.decode(data[questionIndex].correct_answer)
    ) {
      point = 1;
    }

    const qna = questionsAndAnswers;
    qna.push({
      question: he.decode(data[questionIndex].question),
      options: (
        <Menu vertical fluid size="massive">
          {data[questionIndex].options.map((option, i) => {
            const letter = getLetter(i);
            const decodedOption = he.decode(option);

            return (
              <Menu.Item
                id={decodedOption}
                key={decodedOption}
                name={decodedOption}
                active={userSlectedAns === letter}
                // disabled={noAns==false && false}
                onClick={handleItemClick}
                style={{ fontSize: "13px", fontWeight: "bold" }}
              >
                <Checkbox
                  label={
                    <label style={{ width: "100%" }}>
                      {" "}
                      <b style={{ marginRight: "8px" }}>{letter}</b>
                      {decodedOption}
                    </label>
                  }
                />
              </Menu.Item>
            );
          })}
        </Menu>
      ),
      user_answer: userSlectedAns,
      correct_answer: he.decode(data[questionIndex].correct_answer),
      point,
    });
    localStorage.setItem(
      "userAnswer",
      JSON.stringify(qna.map((item) => item.user_answer))
    );
    localStorage.setItem("userSelectAnswer", JSON.stringify(userSlectedAns));

    console.log(qna.map((i) => i.user_answer));

    if (questionIndex === data.length - 1) {
      return endQuiz({
        totalQuestions: data.length,
        totalOptions: data.options,
        correctAnswers: correctAnswers + point,
        timeTaken,
        questionsAndAnswers: qna,
      });
    }

    // if (agreed) {
    setCorrectAnswers(correctAnswers + point);
    setQuestionIndex(questionIndex + 1);
    setShow(userSlectedAns);
    setUserSlectedAns(null);
    setQuestionsAndAnswers(qna);
    // }
  };
  const handleBack = () => {
    setUserSlectedAns(show);
    setQuestionIndex(questionIndex - 1);
  };
  const timeOver = (timeTaken) => {
    return endQuiz({
      totalQuestions: data.length,
      correctAnswers,
      timeTaken,
      questionsAndAnswers,
    });
  };
  useEffect(() => {
    if (questionIndex > 0) {
      setBack(true);
    } else {
      setBack(false);
    }
  });

  return (
    <Item.Header>
      <Container>
        <Segment>
          <Item.Group divided>
            <Item>
              <Item.Content>
                <Item.Extra>
                  <Header as="h1" block floated="left">
                    <Icon name="info circle" />
                    <Header.Content>
                      {`Question No.${questionIndex + 1} of ${data.length}`}
                    </Header.Content>
                  </Header>
                  <Countdown
                    countdownTime={countdownTime}
                    timeOver={timeOver}
                    setTimeTaken={setTimeTaken}
                  />
                </Item.Extra>
                <br />
                <Item.Meta>
                  <Message size="huge" floating>
                    <b>{`Q. ${he.decode(data[questionIndex].question)}`}</b>
                    {questionIndex == 36 && (
                      <img
                        src={img_36}
                        alt=""
                        style={{ width: "100%", height: "75px" }}
                      />
                    )}
                  </Message>
                  {questionIndex == 43 && (
                    <img
                      src={img_45}
                      alt=""
                      style={{
                        width: "50%",
                        height: "85px",
                        display: "flex",

                        margin: "auto",
                      }}
                    />
                  )}
                  {questionIndex == 48 && (
                    <img
                      src={img_46}
                      alt=""
                      style={{
                        width: "50%",
                        height: "85px",
                        display: "flex",

                        margin: "auto",
                      }}
                    />
                  )}
                  <br />
                  <Item.Description>
                    <h3>Please choose one of the following answers:</h3>
                  </Item.Description>
                  <Divider />

                  <Menu vertical fluid size="massive">
                    {data[questionIndex].options.map((option, i) => {
                      const letter = getLetter(i);
                      const decodedOption = he.decode(option);
                      const arr = new Set([decodedOption]);
                      console.log(Array.from(arr));
                      return (
                        <Menu.Item
                          key={decodedOption}
                          name={decodedOption}
                          active={userSlectedAns == decodedOption}
                          // disabled={noAns==false && false}
                          onClick={handleItemClick}
                        >
                          <b style={{ marginRight: "8px" }}>{letter}</b>
                          {decodedOption}
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                </Item.Meta>
                <Divider />
                {/* show ? (
                  <Stack
                    sx={{
                      width: "100%",
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      margin: "auto",
                      display: "flex",
                      alignItems: "center",
                      height: "79vh",

                      transform: "translateY(-50%)",
                    }}
                    spacing={2}
                  >
                    <Alert
                      sx={{
                        display: "flex",
                        width: "100%",
                        margin: "auto",
                      }}
                      severity="error"
                      action={
                        <Button
                          primary
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setAgreed(true);
                            setShow(false);
                          }}
                        >
                          Agree
                        </Button>
                      }
                    >
                      you didn't answer the question
                    </Alert>
                  </Stack>
                ) : (
                  ""
                ) */}
                <Item.Extra
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    style={{
                      marginRight: "74%",
                    }}
                    content="Back"
                    onClick={() => {
                      handleBack();
                    }}
                    floated="left"
                    size="big"
                    icon="left chevron"
                    labelPosition="left"
                    disabled={back ? false : true}
                  />

                  <Button
                    className="next-button"
                    style={{
                      backgroundColor: "#4350b0",
                      color: "#fff",
                      opacity: "0.85",
                    }}
                    content="Next"
                    onClick={() => {
                      handleNext();
                    }}
                    floated="right"
                    size="big"
                    icon="right chevron"
                    labelPosition="right"
                    // disabled={!userSlectedAns}
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <br />
      </Container>
    </Item.Header>
  );
};

Quiz.propTypes = {
  data: PropTypes.array.isRequired,
  countdownTime: PropTypes.number.isRequired,
  endQuiz: PropTypes.func.isRequired,
};

export default Quiz;
