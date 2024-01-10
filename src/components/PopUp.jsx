import { Toaster } from "react-hot-toast";

const PopUp = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: { padding: "1rem", borderRadius: "0" },
      }}
    />
  );
};

export default PopUp;
