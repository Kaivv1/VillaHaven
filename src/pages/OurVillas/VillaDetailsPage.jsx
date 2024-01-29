/*eslint no-unused-vars: */
import { useParams } from "react-router";

const VillaDetailsPage = () => {
  const { villaID } = useParams();

  return (
    <div>
      <h1>Villa Details</h1>
    </div>
  );
};

export default VillaDetailsPage;
