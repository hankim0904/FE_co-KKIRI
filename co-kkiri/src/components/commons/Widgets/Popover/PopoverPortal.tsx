import ReactDOM from "react-dom";

const PopoverPortal = ({ children }: { children: React.ReactNode }) => {
  const el = document.getElementById("popover-root");
  return ReactDOM.createPortal(children, el as HTMLElement);
};

export default PopoverPortal;
