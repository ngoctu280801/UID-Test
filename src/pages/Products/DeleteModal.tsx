import { Modal } from "antd";

interface IModal {
  open: boolean;
  handleConfirm: () => void;
  handleClose: () => void;
}
export const DeleteModal = ({ open, handleConfirm, handleClose }: IModal) => {
  return (
    <Modal
      title="Basic Modal"
      open={open}
      onOk={handleConfirm}
      onCancel={handleClose}
    >
      <p>Are you sure to delete this Product</p>
    </Modal>
  );
};
