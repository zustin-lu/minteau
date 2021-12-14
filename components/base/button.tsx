import { FC, ComponentPropsWithoutRef } from 'react';
import cn from 'classnames';

const variants = {
  dark: 'bg-gray-400 text-gray-600',
  info: 'bg-blue-400 text-blue-600',
  error: 'bg-red-400 text-red-600',
  warning: 'bg-yellow-400 text-yellow-600',
  success: 'bg-green-400 text-green-600',
};

type VariantKeys = keyof typeof variants;

type Props = ComponentPropsWithoutRef<'button'> & {
  variant?: VariantKeys;
};

const Button: FC<Props> = ({
  variant = 'dark',
  children,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cn(
        'block px-4 py-2 text-sm font-medium rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none disabled:cursor-not-allowed disabled:grayscale',
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
