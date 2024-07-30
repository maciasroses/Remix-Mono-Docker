import { useState } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return {
    isOpen,
    onOpen,
    onClose,
  };
}

export default useModal;

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
