import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '../components/Card';
import ReactCardFlip from 'react-card-flip';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { fadeInRight, buttonHover } from '../animations';

const Home = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentNo, setCurrentNo] = useState(1);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    const response = await axios.get(`${process.env.API}/notes`, {
      headers: {
        app_user_id: `test_user`,
        app_user_name: `test user`,
        contentType: 'application/json'
      }
    });
    setCards(response.data.Items);
  };

  const showAnswer = () => {
    setIsFlipped(!isFlipped);
  };

  const handleClickLeft = () => {
    const newCurrentNo = currentNo === 1 ? cards.length : currentNo - 1;
    setCurrentNo(newCurrentNo);
  };

  const handleClickRight = () => {
    const newCurrentNo = currentNo === cards.length ? 1 : currentNo + 1;
    setCurrentNo(newCurrentNo);
  };

  return (
    <>
      <div className="flex sm:justify-center items-center relative mb-8 text-white">
        <h1 className="font-semibold text-xl sm:text-4xl text-white">
          Flash Cards
        </h1>

        <Link href="/new">
          <motion.button
            variants={buttonHover}
            whileHover="hover"
            className="border absolute right-0 px-4 py-2 rounded-full flex justify-center items-center font-semibold"
          >
            <FontAwesomeIcon icon={faPlus} />
            <div className="ml-2">New Card</div>
          </motion.button>
        </Link>
      </div>

      <motion.div
        exit={{ opacity: 0 }}
        initial="initial"
        animate="animate"
        variants={fadeInRight}
      >
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          <Card
            showAnswer={showAnswer}
            content={cards.length ? cards[currentNo - 1].title : 'No cards'}
            noteId={cards.length ? cards[currentNo - 1].timestamp : ''}
          />
          <Card
            showAnswer={showAnswer}
            content={cards.length ? cards[currentNo - 1].content : 'No cards'}
            noteId={cards.length ? cards[currentNo - 1].note_id : ''}
          />
        </ReactCardFlip>
      </motion.div>

      <div className="mt-8 flex justify-center items-center text-xl text-white">
        <motion.button
          variants={buttonHover}
          whileHover="hover"
          className="mr-5 border rounded-full h-10 w-10 text-white text-md"
          onClick={handleClickLeft}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </motion.button>
        <div>{currentNo}</div>
        <div>/</div>
        <div>{cards.length}</div>
        <motion.button
          variants={buttonHover}
          whileHover="hover"
          className="ml-5 border rounded-full h-10 w-10 text-white text-md"
          onClick={handleClickRight}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </motion.button>
      </div>
    </>
  );
};

export default Home;
