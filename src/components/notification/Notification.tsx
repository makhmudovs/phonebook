const Notification = ({ message, color }: { message: string; color: string }) => {
  if (message === '') {
    return null;
  }

  return (
    <div className="message" style={{ color: color }}>
      {message}
    </div>
  );
};

export default Notification;
