import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import moonSVG from "./assets/moon.svg";
import sunSVG from "./assets/sun.svg";
// import logo from "./assets/logo.svg"

function Nav() {
    const { t, i18n } = useTranslation();

    const lightSetting = window.matchMedia("(prefers-color-scheme: light)").matches;

    const [isLightMode, setIsLightMode] = useState(lightSetting);
    const [isHamburgerActive, setIsHamburgerActive] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [prevScrollY, setPrevScrollY] = useState(window.scrollY)

    useEffect(() => {
        function handleScroll() {
            const currentScrollY = window.scrollY;
            setIsHamburgerActive(false);
            setIsNavbarVisible(prevScrollY > currentScrollY || currentScrollY < 10);
            setPrevScrollY(currentScrollY);
        }
        console.log("test")
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollY]);

    const toggleMode = useCallback(() => {
        setIsLightMode(prevMode => !prevMode);
    }, []);

    useEffect(() => {
        function turnLightsOnOff() {
            const root = document.documentElement;
            const lightModeColors = {
                "--color1": "#181b0e",
                "--color2": "#fbc789",
                "--color3": "#fefcfb",
                "--color4": "#f58a07",
                "--color5": "#feecd8",
                "--background-img": "var(--light-img)"
            };
            const darkModeColors = {
                "--color1": "#fefcfb",
                "--color2": "#131317",
                "--color3": "#292A2F",
                "--color4": "#f58a07",
                "--color5": "#202025",
                "--background-img": "var(--dark-img)"
            };
            const colors = isLightMode ? lightModeColors : darkModeColors;

            Object.keys(colors).forEach(key => {
                root.style.setProperty(key, colors[key]);
            });
        }
        turnLightsOnOff()
    }, [isLightMode, toggleMode]);

    const handleHamburger = () => {
        setIsHamburgerActive(!isHamburgerActive);
    }

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: "smooth" });
    }

    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value);
    }

    const sections = [
        { id: "top", name: t("nav.top") },
        { id: "intro", name: t("nav.intro") },
        { id: "projects", name: t("nav.projects") },
        { id: "contact", name: t("nav.contact") }
    ];
    const languages = [
        { label: "EN", code: "en-US" },
        { label: "FR", code: "fr-BE" },
        { label: "IT", code: "it" }
    ];

    return (
        <nav className={`page-section ${isNavbarVisible ? "active" : ""}`}>
            <div className="nav-wrapper-wrapper">
                <div className="nav-wrapper left">
                    {/* <img className="svg" src={logo} /> */}
                    <div className={`hamburger ${isHamburgerActive ? "active" : ""}`} onClick={handleHamburger}>
                        <div className="hamburger-top" />
                        <div className="hamburger-middle" />
                        <div className="hamburger-bottom" />
                    </div>
                </div>
                <div className="nav-wrapper right">
                    <select name="languages" id="lang-list" defaultValue="en-US" onChange={handleLanguageChange}>
                        {languages.map(({ code, label }, index) => (
                            <option key={index} value={code}>{label}</option>
                        ))}
                    </select>
                    {/* {{ isLightMode?<MoonSVG /> : <SunSVG />}} */}
                    <button id="light-switch" onClick={toggleMode}><img className="svg" src={isLightMode ? moonSVG : sunSVG} /></button>
                </div>
            </div>
            <div className="nav-list-wrapper">
                <ul className={`nav-list ${isHamburgerActive ? "active" : ""}`}>
                    {sections.map((item, index) => (
                        <li className="nav-list-element" key={index} onClick={() => {
                            scrollToSection(item.id)
                            handleHamburger()
                        }}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Nav
