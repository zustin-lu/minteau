import { useState } from 'react';

import { ModalProps } from 'components/base/modal';

type HookInput =
  | (Partial<Omit<ModalProps, 'isOpen' | 'onClose'>> &
      Partial<{
        beforeHide: () => void;
      }>)
  | undefined;
type ModalActions = {
  open: () => void;
  hide: () => void;
  toggle: () => void;
};
type HookOutput = {
  props: ModalProps;
  actions: ModalActions;
};

export default function useModal(opt: HookInput): HookOutput {
  const [open, setOpen] = useState<boolean>(false);

  const handleBeforeHide = () => {
    setOpen(false);
    opt.beforeHide?.();
  };

  return {
    props: {
      isOpen: open,
      onClose: handleBeforeHide,
      title: opt.title,
    },
    actions: {
      open: () => setOpen(true),
      hide: () => setOpen(false),
      toggle: () => setOpen(!open),
    },
  };
}
