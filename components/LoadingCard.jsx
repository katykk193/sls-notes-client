import { Spin } from 'antd';

const LoadingCard = () => {
  return (
    <Spin>
      <div className="card max-w-full rounded-md"></div>
    </Spin>
  );
};

export default LoadingCard;
