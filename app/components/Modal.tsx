interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-75 sm:ml-48 mt-20 inset-0">
      <div className="relative bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:shadow-gray-900 w-1/2 h-1/2 md:h-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

//EXAMPLE OF HOW TO USE THIS HOOK
// import Modal from "~/components/Modal";
// import useModal from "~/hooks/useModal";

// const Component = () => {
//   const { isOpen, onOpen, onClose } = useModal();
//   return (
//     <>
//       <h1>Home Index</h1>
//       <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
//         <button
//           onClick={onOpen}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500"
//         >
//           Open Modal
//         </button>
//         <Modal isOpen={isOpen} onClose={onClose}>
//           <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
//             Hello, Im a Modal!
//           </h1>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default Component;
