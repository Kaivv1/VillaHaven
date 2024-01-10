import FavouriteVilla from "../components/FavouriteVilla";
import { useUser } from "../contexts/UserContext";

const FavouriteVillasPage = () => {
  const { favorites } = useUser();

  return (
    <div className="favourite-villas--container">
      <div>
        <h1>Favorite Villas</h1>
        <span>
          {favorites?.length} {favorites?.length === 1 ? "villa" : "villas"}
        </span>
      </div>
      <hr />
      {favorites?.length === 0 ? (
        <p className="no-fav-villas-yet">No favorite villas yet</p>
      ) : (
        <div className="favourite-villas--wrapper">
          {favorites?.map((villa) => (
            <FavouriteVilla villa={villa} key={villa._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteVillasPage;
