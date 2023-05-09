import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./main.css";
import {
  Container,
  Segment,
  Item,
  Dropdown,
  Divider,
  Button,
  Message,
} from "semantic-ui-react";
import mindImg from "../../logo.png";
import {
  CATEGORIES,
  NUM_OF_QUESTIONS,
  DIFFICULTY,
  QUESTIONS_TYPE,
  COUNTDOWN_TIME,
} from "../../constants";
import { shuffle } from "../../utils";
import TextField from "@mui/material/TextField";
import Offline from "../Offline";
import mock from "../Quiz/mock.json";
import { Form } from "semantic-ui-react";
import { Formik } from "formik";
import * as Yup from "yup";
const Main = ({ startQuiz }) => {
  let emailInLocal = localStorage.getItem("email");
  let passwordInLocal = localStorage.getItem("password");
  const [category, setCategory] = useState("0");
  const [numOfQuestions, setNumOfQuestions] = useState(50);
  const [difficulty, setDifficulty] = useState("0");
  const [questionsType, setQuestionsType] = useState("0");
  const [countdownTime, setCountdownTime] = useState({
    hours: 3482,
    minutes: 59,
    seconds: 59,
  });
  const inputElement = useRef();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  let allFieldsSelected = false;
  useEffect(() => {
    inputElement.current.firstChild.click();
  }, []);
  if (
    category &&
    numOfQuestions &&
    difficulty &&
    questionsType &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
  ) {
    allFieldsSelected = true;
  }

  const fetchData = () => {
    setProcessing(true);

    if (error) setError(null);

    const API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionsType}`;

    fetch(API)
      .then((respone) => respone.json())
      .then((data) =>
        setTimeout(() => {
          console.log(data);
          const { response_code, results } = mock;

          if (response_code === 1) {
            const message = (
              <p>
                The API doesn't have enough questions for your query. (Ex.
                Asking for 50 Questions in a Category that only has 20.)
                <br />
                <br />
                Please change the <strong>No. of Questions</strong>,{" "}
                <strong>Difficulty Level</strong>, or{" "}
                <strong>Type of Questions</strong>.
              </p>
            );

            setProcessing(false);
            setError({ message });

            return;
          }

          results.forEach((element) => {
            element.options = shuffle([
              element.correct_answer,
              ...element.incorrect_answers,
            ]);
          });

          setProcessing(false);
          startQuiz(
            results,
            countdownTime.hours + countdownTime.minutes + countdownTime.seconds
          );
        }, 1000)
      )
      .catch((error) =>
        setTimeout(() => {
          if (!navigator.onLine) {
            setOffline(true);
          } else {
            setProcessing(false);
            setError(error);
          }
        }, 1000)
      );
  };

  if (offline) return <Offline />;

  return (
    <Container>
      <Segment
        style={{
          marginTop: "100px",
          overflow: "hidden",
        }}
      >
        <Item.Group divided>
          <Item>
            <img
              style={{
                width: "300px",
                marginRight: "20px",
                height: "260px",
                borderRadius: "20px",
              }}
              alt="logo"
              src={mindImg}
            />
            <Item.Content>
              <Item.Header>
                <h1> Quiz 2023 </h1>
                <h6
                  style={{
                    padding: "0",
                    margin: "0",
                    color: "rgb(0,0,0,0.6)",
                  }}
                >
                  <u> Please Enter Your Valid Email and Start .</u>
                </h6>
              </Item.Header>
              {/*error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )*/}
              <Divider />
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email(" Invalid Email")
                    .required("Email Required"),
                  password: Yup.string().required("Password Required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    if (
                      values.email === "test@email.com" &&
                      values.password === "@12345"
                    ) {
                      // fetchData();
                      setTimeout((data) => {
                        console.log(data);
                        const { response_code, results } = mock;

                        if (response_code === 1) {
                          const message = (
                            <p>
                              The API doesn't have enough questions for your
                              query. (Ex. Asking for 50 Questions in a Category
                              that only has 20.)
                              <br />
                              <br />
                              Please change the{" "}
                              <strong>No. of Questions</strong>,{" "}
                              <strong>Difficulty Level</strong>, or{" "}
                              <strong>Type of Questions</strong>.
                            </p>
                          );

                          setProcessing(false);
                          setError({ message });

                          return;
                        }

                        results.forEach((element) => {
                          element.options = shuffle([
                            element.correct_answer,
                            ...element.incorrect_answers,
                          ]);
                        });

                        setProcessing(false);
                        startQuiz(
                          results,
                          countdownTime.hours +
                            countdownTime.minutes +
                            countdownTime.seconds
                        );
                      }, 1000);
                      setSubmitting(false);
                    } else {
                      alert("Invalid Email Or Password");
                    }
                  }, 1500);
                }}
              >
                {(formik) => (
                  <Form onSubmit={formik.handleSubmit}>
                    <div
                      style={{ display: "flex", marginBottom: "20px" }}
                      class="form-inp"
                    >
                      <div>
                        <Form.Field required>
                          <label>Email</label>
                          <TextField
                            ref={inputElement}
                            error={
                              formik.touched.email && formik.errors.email
                                ? true
                                : false
                            }
                            id="email"
                            helperText={formik.errors.email}
                            style={{
                              opacity: "0.6",
                              width: "378px",
                              marginRight: "20px",
                            }}
                            type="email"
                            placeholder="example@example.com"
                            {...formik.getFieldProps("email")}
                          />
                        </Form.Field>
                        {/*formik.touched.email && formik.errors.email ? (
                        <p style={{ color: "#e60000" }}>
                      {formik.errors.email
                        </p>
                        ) : null}
                      */}
                      </div>
                      <div>
                        <Form.Field required>
                          <label>Password</label>
                          <TextField
                            error={
                              formik.touched.password && formik.errors.password
                                ? true
                                : false
                            }
                            id="password"
                            helperText={formik.errors.password}
                            style={{ opacity: "0.6", width: "378px" }}
                            type="password"
                            placeholder="***********"
                            {...formik.getFieldProps("password")}
                          />
                        </Form.Field>{" "}
                        {/*formik.touched.password && formik.errors.password ? (
                          <p style={{ color: "#e60000" }}>
                            {formik.errors.password}
                          </p>
                        ) : null*/}
                      </div>
                    </div>
                    <Divider />

                    <Button
                      className="next-button"
                      style={{
                        opacity: "0.97",
                        marginTop: "10px",
                        width: "200px",
                        height: "50px",
                        backgroundColor: "#4350af",
                        boxShadow: "2px 2px 5px #000",

                        // left: "50%",
                        // transform: "translateX(-50%)",
                      }}
                      type="submit"
                      primary
                      size="big"
                      icon="play"
                      labelPosition="left"
                      content={processing ? "Processing..." : "Start"}
                      disabled={
                        (formik.touched.email && formik.errors.email) ||
                        (formik.touched.password && formik.errors.password) ||
                        processing
                          ? true
                          : false
                      }
                    />
                  </Form>
                )}
              </Formik>

              <Item.Meta>
                {/* 
              <Dropdown
                fluid
                selection
                name="category"
                placeholder="Third Level"
                onChange={(e, { value }) => setCategory(value)}
                disabled={true}
              />
              <br />
              <Dropdown
                fluid
                selection
                name="numOfQ"
                placeholder=" No. of Questions"
                header=" No. of Questions"
                options={NUM_OF_QUESTIONS}
                value={50}
                onChange={(e, { value }) => setNumOfQuestions(value)}
                disabled={true}
              />
              <br />
              <Dropdown
                     fluid
                    selection
                     name="difficulty"
                     placeholder="Select Difficulty Level"
                     header="Select Difficulty Level"
                   options={DIFFICULTY}
                     value={difficulty}
                    onChange={(e, { value }) => setDifficulty(value)}
                     disabled={processing}
                   />
                  <Dropdown
                    fluid
                    selection
                    name="type"
                    placeholder="Select Questions Type"
                    header="Select Questions Type"
                    options={QUESTIONS_TYPE}
                    value={questionsType}
                    onChange={(e, { value }) => setQuestionsType(value)}
                    disabled={processing}
                  />
                 <br />

                <br />
                <Dropdown
                  search
                  selection
                  name="hours"
                  placeholder="1 Hour"
                  header="Select Hours"
                  // options={COUNTDOWN_TIME.hours}
                  value={1}
                  // onChange={handleTimeChange}
                  disabled={true}
                />
                <Dropdown
                  search
                  selection
                  name="minutes"
                  placeholder="0 Minutes"
                  header="Select Minutes"
                  options={COUNTDOWN_TIME.minutes}
                  onChange={handleTimeChange}
                  disabled={true}
                />
                <Dropdown
                  search
                  selection
                  name="seconds"
                  placeholder="0 Seconds"
                  header="Select Seconds"
                  options={COUNTDOWN_TIME.seconds}
                  onChange={handleTimeChange}
                  disabled={true}
                />
                */}
              </Item.Meta>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <br />
    </Container>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;
