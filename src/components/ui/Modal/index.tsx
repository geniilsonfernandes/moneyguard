import * as Dialog from '@radix-ui/react-dialog';

type ModalProps = {};
const Modal = () => {
  return (
    <Dialog.Root open={true} onOpenChange={() => {}}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title />
          <Dialog.Description />
          <Dialog.Close>x</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
