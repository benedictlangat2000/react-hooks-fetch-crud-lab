// QuestionForm.js
import React from 'react';

function QuestionForm({ formData, onFormChange, onFormSubmit }) {
  return (
    <form onSubmit={onFormSubmit}>
      <h2>New Question</h2>
      <div>
        <label htmlFor="prompt">Prompt</label>
        <input
          type="text"
          id="prompt"
          name="prompt"
          value={formData.prompt}
          onChange={onFormChange}
        />
      </div>
      <div>
        <label htmlFor="answers">Answers</label>
        <input
          type="text"
          id="answers"
          name="answers"
          value={formData.answers}
          onChange={onFormChange}
        />
      </div>
      <div>
        <label htmlFor="correctIndex">Correct Index</label>
        <input
          type="number"
          id="correctIndex"
          name="correctIndex"
          value={formData.correctIndex}
          onChange={onFormChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionForm;
