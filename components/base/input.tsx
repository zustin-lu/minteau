import { FC, ComponentPropsWithRef, forwardRef } from 'react';
import cn from 'classnames';

type Props = ComponentPropsWithRef<'input'> & {
  errorMessage?: string;
};

const Input: FC<Props> = forwardRef(
  ({ children, className, errorMessage, ...rest }, ref) => {
    return (
      <>
        <input
          ref={ref}
          {...rest}
          className={cn(
            'p-2 border border-gray-300 outline-none rounded-md w-full',
            className
          )}
        />
        {errorMessage && (
          <span className="text-sm text-red-500 col-span-full">{errorMessage}</span>
        )}
      </>
    );
  }
);

export default Input;
