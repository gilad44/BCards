import { Footer } from "flowbite-react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

type MyFooterProps = {
  linkText: string;
};
const MyFooter = (props: MyFooterProps) => {
  // const footerClasses = "footer";
  return (
    <Footer className="footer">
      <div className="-mt-1 h-2 ">
        <AiOutlineExclamationCircle size={10} />
      </div>
      <Link to="/about" className="list-none">
        {props.linkText}
      </Link>
    </Footer>
  );
};

export default MyFooter;
