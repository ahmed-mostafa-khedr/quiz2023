import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, Container, Menu, Modal } from "semantic-ui-react";

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
  const [activeTab, setActiveTab] = useState("QNA");
  const [agreed, setAgreed] = useState(false);
  const [agreed_, setAgreed_] = useState(false);
  const [thanx, setThanx] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handle = useFullScreenHandle();
  const handleTabClick = (e, { name }) => {
    setActiveTab(name);
  };
  useEffect(() => {
    handle.exit();
  });
  return (
    <Container style={{ paddingBottom: "25px" }}>
      {!thanx ? (
        <>
          {" "}
          <Menu fluid widths={1}>
            <Menu.Item
              name="You did not answer these questions "
              active={activeTab === "QNA"}
            />
          </Menu>
          <QNA questionsAndAnswers={questionsAndAnswers} />
          <br />
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
              <Button
                style={{
                  cursor: "pointer",
                  width: "200px",
                  margin: " auto",
                  display: "block",
                  padding: "15px",
                  backgroundColor: "#4350b0",
                  color: "#fff",
                  fontSize: "20px",
                }}
              >
                Submit
              </Button>
            }
          >
            <Modal.Header>Reminder !</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "start",
                    margin: "50px 0",
                  }}
                >
                  <div>
                    <div className="text-center">
                      <p>
                        We've send the link to your inbox. Lorem ipsum dolor
                        sit,Lorem ipsum dolor sit{" "}
                      </p>
                      <Checkbox
                        label="I Have Agreed & Send Me ....."
                        onChange={() => setAgreed(!agreed)}
                      />
                    </div>
                    {!agreed && agreed_ && (
                      <span
                        style={{
                          paddingLeft: "30px",
                          color: "#b52e31",
                          opacity: "1",
                          fontSize: "12px",
                        }}
                      >
                        <u>please ......... to confirm ......... !!!.</u>
                      </span>
                    )}
                  </div>
                </div>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                style={{
                  backgroundColor: "#4350b0",
                }}
                onClick={() => {
                  setAgreed_(true);
                  if (agreed) {
                    setTimeout(() => {
                      setOpen(false);
                      // window.location = "/";
                      setThanx(true);
                    }, 1000);
                  } else {
                    setOpen(true);
                  }
                }}
                positive
              >
                Ok
              </Button>
            </Modal.Actions>
          </Modal>
        </>
      ) : (
        <>
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
        </>
      )}

      {/*
      
         <Modal
        onClose={() => {setOpen(false);setAgreed(false);setThanx(false)}}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button
            style={{
              cursor: "pointer",
              width: "200px",
              margin: " auto",
              display: "block",
              padding: "15px",
              backgroundColor: "#4350b0",
              color: "#fff",
              fontSize: "20px",
            }}
          >
            Submit
          </Button>
        }
      >
        <Modal.Header>Reminder !</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
          <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            margin: "50px 0",
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
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            style={{
              backgroundColor: "#4350b0",
            }}
            onClick={() => {
              
              setTimeout(() => {
                setOpen(false);
                window.location = "/"
              }, 1000);
            }}
            positive
          >
            Ok
          </Button>
        </Modal.Actions>
      </Modal>













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
