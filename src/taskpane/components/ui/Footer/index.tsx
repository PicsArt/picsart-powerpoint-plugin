import React from "react";
import { Image } from "@fluentui/react-components";
import { HELP_CENTER, PRICING, PRIVACY_POLICY, TRUST_CENTER } from "@constants/url";
import "./styles.scss";

const PicsartLogo = "assets/icons/footer-logo.svg";
const title = "Picsart Logo";

const Footer: React.FC = () => {
  return (
    <footer>
        <hr />
        <div className="flex-col g-10">
        <div className="flex-row sp-betwen">
            <a href={PRIVACY_POLICY}>Privacy Policy</a>
            <a href={TRUST_CENTER}>Trust Center</a>
            <a href={HELP_CENTER}>Help Center</a>
            <a href={PRICING}>Pricing</a>
        </div>
        <div className="flex-row sp-betwen">
            <Image className="footer-logo" src={PicsartLogo} alt={title} /> 
            <span className="copyright">© 2024 PicsArt, Inc.</span>
        </div>
        </div>
    </footer>
  );
};

export default Footer;