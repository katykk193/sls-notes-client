import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import { Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const NewCard = () => {
  const [state, setState] = useState({
    question: '',
    answer: ''
  });

  const { question, answer } = state;

  const handleChange = (value) => (e) => {
    setState({
      [value]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      headers: {
        app_user_id: 'test_user',
        app_user_name: 'Test User'
      }
    };

    try {
      const response = await axios.post(
        `${process.env.API}/note`,
        {
          Item: {
            title: question,
            content: answer,
            cat: 'general'
          }
        },
        options
      );
    } catch (err) {
      console.log(err);
    }

    Router.push('/');
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="flex justify-center items-center font-bold mb-5">
        <h1 className="text-3xl">Add New Card</h1>
        <Link href="/">
          <button className="ml-3 text-xl flex justify-center items-center rounded-xl ">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </Link>
      </div>

      <div className="flex flex-col text-lg mb-5">
        <label htmlFor="question" className="mb-2">
          Question
        </label>
        <Input.TextArea
          id="question"
          value={question}
          placeholder="Enter question..."
          onChange={handleChange('question')}
          className="rounded text-lg font-semibold shadow-xl"
        ></Input.TextArea>
      </div>

      <div className="flex flex-col text-lg mb-12">
        <label htmlFor="answer" className="mb-2">
          Answer
        </label>
        <Input.TextArea
          rows={4}
          id="answer"
          value={answer}
          placeholder="Enter Answer..."
          onChange={handleChange('answer')}
          className="rounded text-lg font-semibold shadow-xl"
        ></Input.TextArea>
      </div>

      <div className="flex justify-center">
        <Button
          htmlType="submit"
          className="shadow-2xl rounded flex justify-between items-center font-semibold"
        >
          <FontAwesomeIcon icon={faPlus} />
          <div className="ml-2">Add Card</div>
        </Button>
      </div>
    </form>
  );
};

export default NewCard;
