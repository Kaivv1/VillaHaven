import LocationSVG from "../ui/svgs/LocationSVG";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useUser } from "../contexts/UserContext";
const FavouriteVilla = ({ villa }) => {
  const { picture, villaName, location, price, _id } = villa;

  const { checkIsFavorite, removeFavorite } = useUser();
  const isFavorite = checkIsFavorite(_id);

  return (
    <div className="favourite-villa--container">
      <div>
        <img src={picture} alt={villaName} />
        {isFavorite ? (
          <button onClick={() => removeFavorite(_id)}>
            <BookmarkIcon /> <span>Saved</span>
          </button>
        ) : (
          <button>
            <BookmarkBorderIcon /> <span>Save</span>
          </button>
        )}
      </div>
      <div className="favourite-villa-info">
        <h2>{villaName}</h2>
        <p>
          <LocationSVG size="14" />
          {location}
        </p>
        <span>{`${price},00 $`}</span>
      </div>
    </div>
  );
};

export default FavouriteVilla;
