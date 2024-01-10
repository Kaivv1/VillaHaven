import LocationSVG from "../ui/svgs/LocationSVG";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useUser } from "../contexts/UserContext";

const Villa = ({ villa }) => {
  const { picture, villaName, location, price, _id } = villa;
  const { addFavorite, removeFavorite, checkIsFavorite } = useUser();
  const isFavorite = checkIsFavorite(_id);
  return (
    <div className="villa-container">
      <div>
        <img src={picture} alt={villaName} />
        {isFavorite ? (
          <button onClick={() => removeFavorite(_id)}>
            <BookmarkIcon /> <span>Saved</span>
          </button>
        ) : (
          <button onClick={async () => await addFavorite(_id)}>
            <BookmarkBorderIcon /> <span>Save</span>
          </button>
        )}
      </div>
      <div className="villa-card-info">
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

export default Villa;
