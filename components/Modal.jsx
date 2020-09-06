import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { backdrop } from '../animations';
import { buttonHover, modal } from '../animations';
import { GlobalContext } from '../context/GlobalState';

const Modal = () => {
  const { showModal, updateShowModal } = useContext(GlobalContext);
  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          className="w-screen h-screen fixed top-0 left-0 z-10 bg-black bg-opacity-50"
          variants={backdrop}
        >
          <div className="w-screen h-screen flex justify-center items-center">
            <motion.div
              variants={modal}
              className="w-1/3 flex justify-center items-center flex-col bg-white rounded p-10"
            >
              <p className="mb-10 text-xl">Delete this card?</p>
              <div className="flex">
                <motion.button
                  variants={buttonHover}
                  whileHover="hover"
                  className="mr-8 border-2 w-24 h-10 rounded-full"
                >
                  Confirm
                </motion.button>
                <motion.button
                  variants={buttonHover}
                  whileHover="hover"
                  className="border-2 w-24 h-10 rounded-full"
                  onClick={updateShowModal(false)}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
