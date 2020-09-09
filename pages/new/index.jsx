import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Input, Spin } from 'antd';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { addCard } from '../../services';
import useCrash from '../../components/useCrash';
import { buttonHover } from '../../animations';

const NewCard = () => {
  const [state, setState] = useState({
    question: '',
    answer: '',
    loading: false
  });

  const { question, answer, loading } = state;

  const setCrash = useCrash();

  const handleChange = (value) => (e) => {
    setState({
      ...state,
      [value]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      loading: true
    });

    const res = await addCard(question, answer);
    if (res.errMsg) {
      setCrash(true);
    }

    setState({
      ...state,
      loading: false
    });

    Router.push('/');
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="flex justify-center items-center font-semibold mb-5 text-white">
        <h1 className="text-3xl text-white">Add New Card</h1>
        <Link href="/">
          <motion.button
            variants={buttonHover}
            whileHover="hover"
            className="border rounded-full w-10 h-10 ml-3 text-xl flex justify-center items-center rounded-xl "
          >
            <FontAwesomeIcon icon={faTimes} />
          </motion.button>
        </Link>
      </div>
      <Spin spinning={loading}>
        <div className="flex flex-col text-lg mb-5">
          <label htmlFor="question" className="mb-2 font-semibold">
            Question
          </label>
          <Input
            id="question"
            value={question}
            placeholder="Enter question..."
            onChange={handleChange('question')}
            className="py-3 rounded text-lg font-semibold shadow-xl text-gray-700"
            required
          ></Input>
        </div>

        <div className="flex flex-col text-lg mb-12">
          <label htmlFor="answer" className="mb-2 font-semibold">
            Answer
          </label>
          <Input.TextArea
            rows={4}
            id="answer"
            value={answer}
            placeholder="Enter answer..."
            onChange={handleChange('answer')}
            className="rounded text-lg font-semibold shadow-xl text-gray-700"
            required
          ></Input.TextArea>
        </div>

        <div className="flex justify-center text-white">
          <motion.button
            variants={buttonHover}
            whileHover="hover"
            htmlType="submit"
            className="border px-4 py-2 rounded-full flex justify-center items-center font-semibold"
          >
            <FontAwesomeIcon icon={faPlus} />
            <div className="ml-2">Add Card</div>
          </motion.button>
        </div>
      </Spin>
    </form>
  );
};

export default NewCard;
