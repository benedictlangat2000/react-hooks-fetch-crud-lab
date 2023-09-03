import React from 'react';

function QuestionList({ questions, onDeleteQuestion, onUpdateCorrectAnswer }) {
  return (
    <div>
      <h2>Question List</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <div>
              <strong>Question: </strong>
              {question.prompt}
            </div>
            <div>
              <strong>Answers:</strong>
              <ul>
                {question.answers.map((answer, index) => (
                  <li key={index}>{answer}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Correct Index:</strong> {question.correctIndex}
            </div>
            <div>
              <button onClick={() => onDeleteQuestion(question.id)}>
                Delete
              </button>
              <label htmlFor={`correctAnswer${question.id}`}>
                Correct Answer:
              </label>
              <select
                id={`correctAnswer${question.id}`}
                onChange={(e) =>
                  onUpdateCorrectAnswer(question.id, parseInt(e.target.value))
                }
                value={question.correctIndex}
              >
                {question.answers.map((_, index) => (
                  <option key={index} value={index}>
                    {index}
                  </option>
                ))}
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
