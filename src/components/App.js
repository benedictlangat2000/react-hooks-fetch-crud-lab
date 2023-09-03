// App.js
import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

function App() {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    prompt: '',
    answers: [],
    correctIndex: 0,
  });

  useEffect(() => {
    // Fetch questions from the server when the component mounts
    fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error(error));
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Make a POST request to create a new question
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newQuestion) => {
        // Update the state with the new question
        setQuestions([...questions, newQuestion]);

        // Clear the form data
        setFormData({
          prompt: '',
          answers: [],
          correctIndex: 0,
        });
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteQuestion = (id) => {
    // Make a DELETE request to remove the question from the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Update the state to remove the question
        const updatedQuestions = questions.filter((question) => question.id !== id);
        setQuestions(updatedQuestions);
      })
      .catch((error) => console.error(error));
  };

  const handleUpdateCorrectAnswer = (id, correctIndex) => {
    // Make a PATCH request to update the correct answer on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then(() => {
        // Update the state with the new correctIndex
        const updatedQuestions = questions.map((question) => {
          if (question.id === id) {
            return { ...question, correctIndex };
          }
          return question;
        });
        setQuestions(updatedQuestions);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Questions</h1>
      <QuestionForm
        formData={formData}
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
      <QuestionList
        questions={questions}
        onDeleteQuestion={handleDeleteQuestion}
        onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
      />
    </div>
  );
}

export default App;
