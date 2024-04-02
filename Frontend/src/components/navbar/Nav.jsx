import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import moonSVG from "./assets/moon.svg";
import sunSVG from "./assets/sun.svg";
import logo from "./assets/logo.svg"

function Nav() {
    const { t, i18n } = useTranslation();

    const lightSetting = window.matchMedia("(prefers-color-scheme: light)").matches;

    const [isLightMode, setIsLightMode] = useState(lightSetting);
    const [isHamburgerActive, setIsHamburgerActive] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [isLangMenuActive, setIsLangMenuActive] = useState(false);
    const [prevScrollY, setPrevScrollY] = useState(window.scrollY);
    const menuRef = useRef(null);

    // NAV MENU ///////////////
    // hide and display menu with scroll
    useEffect(() => {
        function handleScroll() {
            const currentScrollY = window.scrollY;
            setIsHamburgerActive(false);
            setIsLangMenuActive(false);
            setIsNavbarVisible(prevScrollY > currentScrollY || currentScrollY < 10);
            setPrevScrollY(currentScrollY);
        }
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollY]);

    const handleHamburger = () => {
        setIsHamburgerActive(!isHamburgerActive);
    }

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: "smooth" });
    }

    // LANGUAGE MENU ///////////////
    // close language menu when click anywhere but menu
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsLangMenuActive(false);
            }
        }
        window.addEventListener("click", handleClickOutside);

        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    const toggleLangMenu = () => {
        setIsLangMenuActive(!isLangMenuActive);
    }

    const handleLangClick = (e) => {
        let lang = e.target.innerText.toLowerCase();
        i18n.changeLanguage(lang);
        document.documentElement.lang = lang;
    }

    // LIGHT/DARK MODE ///////////////
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
    ///////////////

    const sections = [
        { id: "top", name: t("nav.top") },
        { id: "intro", name: t("nav.intro") },
        { id: "projects", name: t("nav.projects") },
        { id: "contact", name: t("nav.contact") }
    ];
    const languages = ["EN", "FR", "IT"];

    return (
        <nav className={`page-section ${isNavbarVisible ? "active" : ""}`}>
            <div className="nav-wrapper-wrapper">
                <div className="nav-wrapper left">
                    <div className={`hamburger ${isHamburgerActive ? "active" : ""}`} onClick={handleHamburger}>
                        <div className="hamburger-top" />
                        <div className="hamburger-middle" />
                        <div className="hamburger-bottom" />
                    </div>
                    <div className="logo">
                        <img className="svg" src={logo} />
                    </div>
                </div>
                <div className="nav-wrapper right">
                    <ul ref={menuRef} name="languages" id="lang-list" onClick={toggleLangMenu}>
                        <li className="top"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M0 128C0 92.7 28.7 64 64 64H256h48 16H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H320 304 256 64c-35.3 0-64-28.7-64-64V128zm320 0V384H576V128H320zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276H141l19-42.8zM448 164c11 0 20 9 20 20v4h44 16c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45H448 376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z" /></svg></li>
                        {languages.map((lang, index) => (
                            <li className={isLangMenuActive ? "" : "inactive"} key={index} onClick={handleLangClick}>{lang}</li>
                        ))}
                    </ul>
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
