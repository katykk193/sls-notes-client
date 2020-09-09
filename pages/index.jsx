import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Link from 'next/link';
import Card from '../components/Card';
import ReactCardFlip from 'react-card-flip';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { fadeInUp, fadeInRight, fadeInLeft, buttonHover } from '../animations';
import { getCards } from '../services';
import LoadingCard from '../components/LoadingCard';
import EmptyCard from '../components/EmptyCard';
import useCrash from '../components/useCrash';

const Home = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [variants, setVariants] = useState(0);
  const [cardAnimation, setCardAnimation] = useState('');
  const [loading, setLoading] = useState(true);

  const { currentNo, updateCurrentNo, cards, updateCards } = useContext(
    GlobalContext
  );

  const setCrash = useCrash();

  useEffect(() => {
    loadCards();
  }, [cards.length]);

  useEffect(() => {
    // setVariants(0);
    return () => {
      console.log(variants);
      // setVariants(0);
    };
  }, [currentNo]);

  const loadCards = async () => {
    const res = await getCards();
    if (res.errMsg) {
      setCrash(true);
    }
    updateCards(res);
    setLoading(false);
  };

  const showAnswer = () => {
    setIsFlipped(!isFlipped);
  };

  const handleClickLeft = () => {
    setIsFlipped(false);
    const newCurrentNo = currentNo === 1 ? cards.length : currentNo - 1;
    updateCurrentNo(newCurrentNo);
    // setTranslation(translation - 60);
    setVariants(variants - 5);
    console.log(variants);
    // setCardAnimation('left');
  };

  const handleClickRight = () => {
    setIsFlipped(false);
    const newCurrentNo = currentNo === cards.length ? 1 : currentNo + 1;
    updateCurrentNo(newCurrentNo);
    // setTranslation(translation + 60);
    setVariants(variants + 5);
    console.log(variants);
    // setCardAnimation('right');
  };

  return (
    <>
      <div className="container flex sm:justify-center items-center relative mb-8 text-white">
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

      {loading ? (
        <LoadingCard />
      ) : cards.length ? (
        <>
          <motion.div
          // exit={{ opacity: 0 }}
          // initial="initial"
          // animate="animate"
          // variants={variants}
          >
            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
              <Card
                showAnswer={showAnswer}
                card={cards[currentNo - 1]}
                question
              />
              <Card showAnswer={showAnswer} card={cards[currentNo - 1]} />
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
            <motion.div
              exit={{ opacity: 1 }}
              initial={{ translateX: variants - variants }}
              animate={{
                translateX: variants,
                opacity: 0
              }}
            >
              {currentNo}
            </motion.div>
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
      ) : (
        <EmptyCard />
      )}
    </>
  );
};

export default Home;
