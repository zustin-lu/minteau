import { FC, ComponentPropsWithoutRef } from 'react';
import cn from 'classnames';

const variants = {
  head1: 'text-3xl font-medium leading-6 text-gray-900 mb-5',
  head2: 'text-2xl font-medium leading-6 text-gray-900 mb-4',
  head3: 'text-xl font-medium leading-6 text-gray-900 mb-3',
  head4: 'text-lg font-medium leading-6 text-gray-900 mb-2',
};

type VariantKeys = keyof typeof variants;

type Props = ComponentPropsWithoutRef<'h1'> & {
  variant?: VariantKeys;
};

const Header: FC<Props> = ({
  variant = 'head1',
  children,
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={cn(variants[variant], className)}>
      {children}
    </div>
  );
};

export default Header;
