import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import HomeIcon from "@mui/icons-material/Home";
const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((item) => item);
  const { villaID } = useParams();

  const labels = {
    "/": "HOME",
    "/about": "ABOUT US",
    "/villas": "VILLAS",
    "/villas/:villaID": "VILLA DETAILS",
    "/pricing": "PRICES",
    "/staff": "OUR STAFF",
    "/faq": "FAQ",
    "/contact": "CONTACTS",
    "/favorites": "FAVORITES",
    "/user/profile": "PROFILE",
    "/user/reservations": "PROFILE",
    "/reservation/:villaID": "VILLA RESERVATION",
  };

  if (pathname === `/villas/${villaID}`) {
    pathnames.push(`/villas/${villaID}`);
    labels[`/villas/${villaID}`] = "VILLA DETAILS";
  }

  if (pathname === `/reservation/${villaID}`) {
    pathnames.push(`/reservation/${villaID}`);
    labels[`/reservation/${villaID}`] = "VILLA RESERVATION";
  }

  return (
    <nav className="breadcrumbs">
      <ul>
        <span>
          <HomeIcon fontSize="medium" className="home-icon" />
        </span>
        <li>
          <Link to="/">{labels["/"]}</Link>
        </li>
        {pathnames.length === 1 && (
          <FontAwesomeIcon color="#f5f5f5" icon={faAngleRight} />
        )}
        {pathnames.map((_, i) => (
          <li key={i}>
            {pathname === `/reservation/${villaID}`
              ? pathnames.length - 2 > i && (
                  <FontAwesomeIcon icon={faAngleRight} />
                )
              : pathnames.length - 1 > i && (
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    style={{
                      marginRight: `${
                        pathname === `/villas/${villaID}` ? "5px" : ""
                      }`,
                    }}
                  />
                )}
            <Link to={`/${pathnames.slice(0, i + 1).join("/")}`}>
              {labels[`/${pathnames.slice(0, i + 1).join("/")}`]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BreadCrumbs;
