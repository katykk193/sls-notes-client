import { useState, useContext } from 'react';
import Link from 'next/link';
import { SyncOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { buttonHover } from '../animations';
import { GlobalContext } from '../context/GlobalState';
import { loadCards, deleteCard } from '../services';
import { Modal, Spin } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const Card = ({
  showAnswer,
  question,
  card: { title, content, timestamp }
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
    const res = await loadCards();
    updateCards(res);
    setLoading(false);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
  };

  return (
    <Spin spinning={loading}>
      <div className="card max-w-full">
        <div
          onClick={showAnswer}
          className="cursor-pointer h-full w-full flex justify-center items-center relative bg-white shadow-2xl rounded-md"
        >
          <div className="flex absolute right-0 top-0 m-2 justify-center items-center font-bold text-gray-400 text-lg">
            <SyncOutlined />
            <div className="ml-1">Flip</div>
          </div>

          <p className="sm:text-2xl">{question ? title : content}</p>

          {question ? (
            <motion.button
              variants={buttonHover}
              whileHover="hover"
              className="absolute left-0 bottom-0 mx-4 my-3 text-2xl"
              onClick={(e) => showConfirm(e)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </motion.button>
          ) : null}
          {question ? (
            <Link href="/edit">
              <motion.button
                variants={buttonHover}
                whileHover="hover"
                className="absolute right-0 bottom-0 mx-4 my-3 text-2xl"
              >
                <FontAwesomeIcon icon={faEdit} />
              </motion.button>
            </Link>
          ) : null}
        </div>
      </div>
    </Spin>
  );
};

export default Card;
