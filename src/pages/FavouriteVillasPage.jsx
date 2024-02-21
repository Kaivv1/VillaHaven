import Villa from "../components/Villa";
import { useUser } from "../contexts/UserContext";
import { useChangeDocumentTitle } from "../hooks/useChangeDocumentTitle";

const FavouriteVillasPage = () => {
  const { favorites } = useUser();
  useChangeDocumentTitle("Favorites");
  return (
    <div className="favourite-villas--container">
      <div className="favorite-villas-line">
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
            <Villa villa={villa} key={villa._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteVillasPage;
