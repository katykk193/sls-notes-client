import { Empty } from 'antd';

const EmptyCard = () => {
  return (
    <div className="card max-w-full rounded-md">
      <div className="h-full w-full flex justify-center items-center relative bg-white shadow-2xl rounded-md">
        <Empty />
      </div>
    </div>
  );
};

export default EmptyCard;
