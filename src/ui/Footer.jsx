import { Link } from "react-router-dom";
import FooterSubscribe from "../components/Footer/FooterSubscribe";
import FooterSupportBox from "../components/Footer/FooterSupportBox";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <FooterSupportBox />
        <div className="footer-mid">
          <div>
            <h3>VillaHaven.</h3>
            <p>
              Diam et habitasse tortor cras donec urna eget dolor in turpis
              venenatis eget pulnivar ipsum quisque non arcu nulla
            </p>
          </div>
          <FooterSubscribe />
        </div>
        <div className="footer-end">
          <div>
            <h4>Office</h4>
            <p>032 Maple Avenue, Citysville</p>
            <p>villahavenhelp@gmail.com</p>
            <p>(032) 333-8875</p>
          </div>
          <div>
            <h4>Services</h4>
            <p>Family Experiences</p>
            <p>Events</p>
            <p>Weddings</p>
            <p>Tours</p>
          </div>
          <div>
            <h4>Follow Us</h4>
            <div className="footer-links">
              <Link>
                <FacebookOutlinedIcon fontSize="small" />
              </Link>
              <Link>
                <TwitterIcon fontSize="small" />
              </Link>
              <Link>
                <YouTubeIcon fontSize="small" />
              </Link>
              <Link>
                <InstagramIcon fontSize="small" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="copy-right">
        &#9426; 2023 VillaHaven. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
