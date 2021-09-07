import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Input, Spin } from 'antd';
import { getCard, editCard } from '../../services';
import useCrash from '../../components/useCrash';
import { buttonHover } from '../../animations';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const EditCard = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState({});

  const router = useRouter();
  const setCrash = useCrash();

  useEffect(() => {
    loadCard();
  }, []);

  const loadCard = async () => {
    const res = await getCard(router.query.id);
    if (res.errMsg) {
      setCrash(true);
    }
    setQuestion(res.title);
    setAnswer(res.content);
    setCard(res);
    setLoading(false);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };
  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newCard = { ...card, title: question, content: answer };

    setCard(newCard);

    const res = await editCard(newCard);
    if (res.errMsg) {
      setCrash(true);
    }

    setLoading(false);
    Router.push('/');
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="flex justify-center items-center font-semibold mb-5 text-white">
        <h1 className="text-3xl text-white">Edit Card</h1>
        <Link href="/">
          <motion.button
            variants={buttonHover}
            whileHover="hover"
            className="border rounded-full w-10 h-10 ml-3 text-xl flex justify-center items-center rounded-xl "
          >
            <CloseOutlined />
          </motion.button>
        </Link>
      </div>
      <Spin spinning={loading}>
        <div className="flex flex-col text-lg mb-5">
          <label htmlFor="question" className="mb-2 font-semibold text-white">
            Question
          </label>
          <Input
            id="question"
            value={question}
            placeholder="Enter question..."
            onChange={handleQuestionChange}
            className="rounded text-lg font-semibold shadow-xl text-gray-700 p-5"
            required
          ></Input>
        </div>

        <div className="flex flex-col text-lg mb-12">
          <label htmlFor="answer" className="mb-2 font-semibold text-white">
            Answer
          </label>
          <Input.TextArea
            rows={4}
            id="answer"
            value={answer}
            placeholder="Enter Answer..."
            onChange={handleAnswerChange}
            className="rounded text-lg font-semibold shadow-xl text-gray-700 p-5"
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
            <CheckOutlined />
            <div className="ml-2">Update Card</div>
          </motion.button>
        </div>
      </Spin>
    </form>
  );
};

export default EditCard;
