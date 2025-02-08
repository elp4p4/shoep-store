const Message = ({ variant, children }) => (
  <div
    className={`p-3 rounded ${
      variant === "danger"
        ? "bg-red-100 text-red-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {children}
  </div>
);

Message.defaultProps = {
  variant: "success",
};

export default Message;
