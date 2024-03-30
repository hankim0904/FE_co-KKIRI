import ReactDOM from "react-dom";

const ToastPortal = ({ children }: { children: React.ReactNode }) => {
  const el = document.getElementById("toast-root");
  return ReactDOM.createPortal(children, el as HTMLElement);
};

export default ToastPortal;
