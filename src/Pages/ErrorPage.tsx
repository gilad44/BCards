import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const route = () => {
    navigate("/");
  };
  return (
    <>
      <div className="w-full max-h-screen flex flex-col -mt-20 items-center justify-center">
        <h1 className="text-[700px] text-red-700">404</h1>
        <h3 className="z-1 absolute text-9xl">Page not found</h3>
      </div>
      <Button onClick={route} className="m-auto mt-4">
        Take me Home
      </Button>
    </>
  );
};

export default Error;
