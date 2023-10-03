import { useState } from "react";
import Modal from "../../components/Modal";
import RegisterForm from "./RegisterForm";

export default function RegisterContainer() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-center">
      <button
        className="bg-green-500 text-white rounded-md px-3 py-3 font-bold"
        onClick={() => setIsOpen(true)}
      >
        Create new account
      </button>
      <Modal title="Sign up" open={isOpen} onClose={() => setIsOpen(false)}>
        <RegisterForm />
      </Modal>
    </div>
  );
}
