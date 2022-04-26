import ReactDOM from "react-dom";
import { AddUserForm } from "./AddUserForm";
import "./addUserModal.css";

const AddUserModal = ({ closeModal }) => {
  return ReactDOM.createPortal(
    <div className="add-modal-wrapper">
      <div className="add-modal-backdrop" onClick={(e) => closeModal(false)}>
        <div className="add-modal-content" onClick={(e) => e.stopPropagation()}>
          <AddUserForm closeModal={closeModal} />

          <div className="add-modal-confirmation-btn"></div>
        </div>
      </div>
    </div>,
    document.getElementById("add-modal")
  );
};

export default AddUserModal;
