interface Props {
  onClose: () => void;
}

const Alert2 = ({ onClose }: Props) => {
  return (
    <div
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      <strong>Holy guacamole!</strong> You should check in on some of those
      fields above.
      <button
        onClick={onClose}
        type="button"
        className="btn-close"
        //data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert2;
