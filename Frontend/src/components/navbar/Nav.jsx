import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";


function Nav() {
    const { t, i18n } = useTranslation();

    const sunSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" /></svg>;
    const moonSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" /></svg>;

    const lightSetting = window.matchMedia("(prefers-color-scheme: light)").matches;

    const [isLightMode, setIsLightMode] = useState(lightSetting);
    const [isHamburgerActive, setIsHamburgerActive] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [prevScrollY, setPrevScrollY] = useState(window.scrollY)

    useEffect(() => {
        function handleScroll() {
            const currentScrollY = window.scrollY;
            setIsNavbarVisible(prevScrollY > currentScrollY || currentScrollY < 10);
            setPrevScrollY(currentScrollY);
        }

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                "--color5": "#feecd8"
            };
            const darkModeColors = {
                "--color1": "#fef6eb",
                "--color2": "#141414",
                "--color3": "#333333",
                "--color4": "#f58a07",
                "--color5": "#292929"
            };
            const colors = isLightMode ? lightModeColors : darkModeColors;

            Object.keys(colors).forEach(key => {
                root.style.setProperty(key, colors[key]);
            });
        }
        turnLightsOnOff()
    }, [isLightMode, toggleMode]);

    const handleHamburger = () => {
        document.body.style.overflow = isHamburgerActive ? "auto" : "hidden";
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
        { name: "top", description: t("nav.top") },
        { name: "intro", description: t("nav.intro") },
        { name: "projects", description: t("nav.projects") },
        { name: "contact", description: t("nav.contact") }
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
                    <button id="light-switch" onClick={toggleMode}>{isLightMode ? moonSVG : sunSVG}</button>
                </div>
            </div>
            <ul className={`nav-list ${isHamburgerActive ? "active" : ""}`}>
                {sections.map((item, index) => (
                    <li className="nav-list-element" key={index}>
                        <button onClick={() => {
                            scrollToSection(item.name)
                            handleHamburger()
                        }}>{item.description}</button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Nav
