import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '../components/Card';
import ReactCardFlip from 'react-card-flip';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    const response = await axios.get(`${API}/notes`, {
      headers: {
        app_user_id: `test_user`,
        app_user_name: `test user`,
        contentType: 'application/json'
      }
    });
    console.log(response.data);
    setCards(response.data);
  };

  const showAnswer = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <>
      <Button className="flex justify-between items-center absolute left-0 bottom-0 m-10 shadow-2xl rounded font-semibold">
        <FontAwesomeIcon icon={faTrash} />
        <div className="ml-2">Clear Cards</div>
      </Button>
      <div className="flex sm:justify-center items-center relative mb-5">
        <h1 className="font-bold text-xl sm:text-4xl">Flash Cards</h1>

        <Link href="/new">
          <Button className="absolute right-0 shadow-2xl rounded flex justify-between items-center font-semibold">
            <FontAwesomeIcon icon={faPlus} />
            <div className="ml-2">New Card</div>
          </Button>
        </Link>
      </div>

      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="vertical"
        className="w-full"
      >
        <Card showAnswer={showAnswer} content="What is PHP" />
        <Card showAnswer={showAnswer} content="A programming language" />
      </ReactCardFlip>
    </>
  );
};

export default Home;
