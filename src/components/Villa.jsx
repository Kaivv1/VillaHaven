/* eslint-disable react/prop-types */
import LocationSVG from "../ui/svgs/LocationSVG";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from "@mui/icons-material/Search";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router";

const Villa = ({ villa }) => {
  const { pictures, villaName, location, price, _id } = villa;
  const { addFavorite, removeFavorite, checkIsFavorite } = useUser();
  const navigate = useNavigate();
  const isFavorite = checkIsFavorite(_id);

  const mainPicture = pictures
    .filter((picture) => picture.includes("main-"))
    .join("");
  return (
    <div className="villa-container">
      <div>
        <img src={mainPicture} alt={villaName} />
        {isFavorite ? (
          <button onClick={() => removeFavorite(_id)} className="bookmark-btn">
            <BookmarkIcon /> <span>Saved</span>
          </button>
        ) : (
          <button
            onClick={async () => await addFavorite(_id)}
            className="bookmark-btn"
          >
            <BookmarkBorderIcon /> <span>Save</span>
          </button>
        )}
        <button
          className="check-btn"
          onClick={() => navigate(`/villas/${_id}`)}
        >
          <SearchIcon />
          <span>Check</span>
        </button>
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
