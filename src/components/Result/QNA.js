import React from "react";
import PropTypes from "prop-types";
import { Button, Table } from "semantic-ui-react";

const QNA = ({ questionsAndAnswers }) => {
  // questionsAndAnswers.length = 10;
  return (
    <>
      <Table celled striped selectable size="large">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No.</Table.HeaderCell>
            <Table.HeaderCell>Questions</Table.HeaderCell>
            {/*<Table.HeaderCell>Your Answers</Table.HeaderCell>*/}
            {<Table.HeaderCell>Choose The Correct Answer</Table.HeaderCell>}
            {/*<Table.HeaderCell>Points</Table.HeaderCell>*/}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {questionsAndAnswers.map(
            (item, i) =>
              item.point === 2 && (
                <Table.Row key={i + 1}>
                  <Table.Cell>{i + 1}</Table.Cell>
                  <Table.Cell>{item.question} </Table.Cell>
                  {/*<Table.Cell>{item.user_answer}</Table.Cell>*/}
                  <Table.Cell>
                    <span>
                      <u>choose one of the following ans.</u>
                    </span>
                    {item.options}
                  </Table.Cell>
                  {/*<Table.Cell></Table.Cell>*/}
                </Table.Row>
              )
          )}
        </Table.Body>
      </Table>
    </>
  );
};

QNA.propTypes = {
  questionsAndAnswers: PropTypes.array.isRequired,
};

export default QNA;
