import { FC, ComponentPropsWithRef, forwardRef } from 'react';
import cn from 'classnames';

type Props = ComponentPropsWithRef<'p'>;

const Paragraph: FC<Props> = ({ children, className }) => {
  return (
    <p className={cn('text-gray-800 leading-7 mb-3', className)}>{children}</p>
  );
};

export default Paragraph;
