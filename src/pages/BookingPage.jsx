import { useEffect } from "react";
import { useParams } from "react-router";
import { fetchVillaById } from "../helpers/villaHelperFunctions";

const BookingPage = () => {
  const { villaID } = useParams();

  useEffect(() => {
    const fetchVilla = async () => {
      const data = await fetchVillaById(villaID);

      console.log(data);
    };
    fetchVilla();
  }, [villaID]);

  return <div>This is booking</div>;
};

export default BookingPage;
