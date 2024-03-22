import { useTranslation } from "react-i18next";

function Header() {
    const { t } = useTranslation();
    return (
        <header className="page-section" id="top">
            <div></div>
            <div>
                <h1>{t("header.intro")}<span>Stelio</span></h1>
                <h2>A self-taught Web Developer</h2>
            </div>
            <p>Learn more about me<br /><svg width={"1em"} height={"1em"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg></p>
        </header>
    )
}

export default Header
