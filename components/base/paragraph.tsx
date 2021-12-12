import { FC } from 'react';

const Paragraph: FC = ({ children }) => {
  return <p className="text-gray-800 leading-7 mb-3">{children}</p>;
};

export default Paragraph;
