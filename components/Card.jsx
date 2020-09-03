import { SyncOutlined } from '@ant-design/icons';

const Card = ({ showAnswer, content }) => {
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
      </div>
    </div>
  );
};

export default Card;
