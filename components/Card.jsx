import { SyncOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { buttonHover } from '../animations';

const Card = ({ showAnswer, content, timestamp }) => {
  console.log(timestamp);
  const handleDelete = async () => {
    const options = {
      headers: {
        app_user_id: 'test_user',
        app_user_name: 'Test User'
      }
    };
    try {
      const response = await axios.delete(
        `${process.env.API}/note/t/${timestamp}`,
        options
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card max-w-full">
      <div
        onClick={showAnswer}
        className="cursor-pointer h-full w-full flex justify-center items-center relative bg-white shadow-2xl rounded-md"
      >
        <div className="flex absolute right-0 top-0 m-2 justify-center items-center font-bold text-gray-400 text-lg">
          <SyncOutlined />
          <div className="ml-1">Flip</div>
        </div>
        <p className="sm:text-2xl">{content}</p>
        <motion.button
          variants={buttonHover}
          whileHover="hover"
          className="absolute left-0 bottom-0 mx-4 my-3 text-2xl"
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faTrash} />
        </motion.button>
      </div>
    </div>
  );
};

export default Card;
