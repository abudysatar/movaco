import { Close } from "@carbon/icons-react";
import * as Dialog from "@radix-ui/react-dialog";

const DialogDemo = ({ author, content }) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="text-[16px] tracking-wider text-main-red hover:underline cursor-pointer">
        Read Full review
      </button>
    </Dialog.Trigger>

    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay fixed inset-0  bg-black/60 z-[999]" />

      <Dialog.Content
        className=" DialogContent fixed top-[50%] left-[50%] max-w-lg w-[100%] md:w-[90%] max-h-[80vh] overflow-y-scroll
        translate-x-[-50%] translate-y-[-50%] bg-neutral-900 text-white 
        rounded-2xl p-6 shadow-lg focus:outline-none z-[1000] "
      >
        <Dialog.Title className="text-lg  font-semibold mb-2">
          Review by {author}
        </Dialog.Title>

        <Dialog.Description className="text-gray-300 text-sm leading-relaxed">
          {content}
        </Dialog.Description>

        <Dialog.Close asChild>
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <Close size={30} className="cursor-pointer text-main-red " />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;
