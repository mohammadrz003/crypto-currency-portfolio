import reactDom from "react-dom";
import { GrClose } from "react-icons/gr";

const Modal = ({ children, isModalOpen, onClose, className }) => {
  if (!isModalOpen) {
    return null;
  }
  return reactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div
        className={`${className} fixed w-full max-w-lg p-5 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md top-1/2 left-1/2`}
      >
        <div className="flex justify-between w-full">
          <h5 className="font-semibold">Header</h5>
          <button className="" onClick={() => onClose(false)}>
            <GrClose />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
