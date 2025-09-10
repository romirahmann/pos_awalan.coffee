import { MdClose } from "react-icons/md";

export function Modal({ isOpen, title = "MODAL", onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]"
        onClick={onClose}
      ></div>

      {/* Content */}
      <div className="relative z-10 bg-white rounded-lg max-w-xs lg:max-w-lg w-full p-6 shadow-lg">
        <div className="header flex items-center">
          <h1 className="lg:text-xl text-md font-bold">{title}</h1>
          <button
            onClick={onClose}
            className="ms-auto text-2xl text-gray-500 hover:text-red-800"
          >
            <MdClose />
          </button>
        </div>

        <div className="mainModal mt-6">{children}</div>
      </div>
    </div>
  );
}
