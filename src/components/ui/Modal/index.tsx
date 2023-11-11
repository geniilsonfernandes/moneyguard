import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import Button from '../Button';

type ModalProps = {
  children: React.ReactNode;
  title: string;
  footer?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
};
const Modal = ({ children, title, footer, isOpen, onClose }: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md bg-slate-50 -translate-x-1/2 -translate-y-1/2 rounded-md p-4 sm:p-8">
          <Dialog.Title className="flex justify-between text-zinc-950 text-lg font-medium items-center">
            {title}
            <Button
              variant="outline"
              width="auto"
              size="md"
              padding="none"
              display="flex"
              onClick={onClose}
            >
              <X size={16} />
            </Button>
          </Dialog.Title>
          <Dialog.Description className="py-14">{children}</Dialog.Description>
          {footer}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
