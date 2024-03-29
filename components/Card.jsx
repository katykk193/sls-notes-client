import { useState, useContext } from 'react';
import Router from 'next/router';
import { SyncOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { buttonHover } from '../animations';
import { GlobalContext } from '../context/GlobalState';
import { getCards, deleteCard } from '../services';
import { Modal, Spin } from 'antd';
import {
  ExclamationCircleOutlined,
  DeleteFilled,
  EditFilled
} from '@ant-design/icons';

const { confirm } = Modal;

const Card = ({
  showAnswer,
  question,
  card: { title, content, timestamp, note_id }
}) => {
  const [loading, setLoading] = useState(false);

  const { updateCards } = useContext(GlobalContext);

  const showConfirm = (e) => {
    e.stopPropagation();
    confirm({
      title: 'Do you want to delete this card?',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      onOk() {
        handleOk(e);
      },
      onCancel() {
        handleCancel(e);
      },
      okText: 'Confirm',
      cancelText: 'Cancel'
    });
  };

  const handleOk = async (e) => {
    e.stopPropagation();
    setLoading(true);
    await deleteCard(timestamp);
    const res = await getCards();
    updateCards(res);
    setLoading(false);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    Router.push(`/edit/${note_id}`);
  };

  return (
    <Spin spinning={loading}>
      <div className="card h-full w-full">
        <div
          onClick={showAnswer}
          className="my-5 p-8 cursor-pointer h-full w-full flex justify-center items-center relative bg-white shadow-2xl rounded-md"
        >
          <div className="flex absolute right-0 top-0 m-2 justify-center items-center font-bold text-gray-400 text-lg">
            <SyncOutlined />
            <div className="ml-1">Flip</div>
          </div>

          <div className="text-sm md:text-lg lg:text-xl h-full ">
            <p className="h-full overflow-y-auto flex items-center">
              {question ? title : content}
            </p>
          </div>

          {question ? (
            <motion.button
              variants={buttonHover}
              whileHover="hover"
              className="absolute left-0 bottom-0 mx-4 my-3 text-2xl text-gray-700"
              onClick={showConfirm}
            >
              <DeleteFilled />
            </motion.button>
          ) : null}
          {question ? (
            <motion.button
              variants={buttonHover}
              whileHover="hover"
              className="absolute right-0 bottom-0 mx-4 my-3 text-2xl text-gray-700"
              onClick={handleEdit}
            >
              <EditFilled />
            </motion.button>
          ) : null}
        </div>
      </div>
    </Spin>
  );
};

export default Card;
