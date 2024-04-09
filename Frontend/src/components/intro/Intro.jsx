import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import churchill from "./assets/churchill.jpg"

function Intro() {
    const { t } = useTranslation();
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { threshold: 0.33 }
        );
        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [isIntersecting]);

    const devSkills = ["HTML5", "CSS3", "SCSS/SASS", "JavaScript", "React.js", "Node.js", "Express.js", "Bash", "PostgreSQL", "MongoDB"];
    const learningSkills = t("intro.learningSkillsList");

    return (
        <section className="page-section" id="intro" ref={ref}>
            <div className={`intro-content-wrapper ${isIntersecting ? "visible" : ""}`}>
                <div className="text-wrapper">
                    <h2>{t("intro.intro")}</h2>
                    <p>{t("intro.storyPart1")}<br /><br />{t("intro.storyPart2")}<br /><br />{t("intro.storyPart3")}<br /></p>
                </div>
                <div className="divider medium" />
                <blockquote>
                    <p className="quote">{t("intro.quote")}</p>
                    <div>
                        <p className="author">- Winston Churchill</p>
                        <img className="picture" src={churchill} alt={t("intro.picture")} decoding="async" loading="lazy" />
                    </div>
                </blockquote>
                <div className="divider big" />
                <div className="skills-wrapper">
                    <h3 id="skills-intro">{t("intro.skillsTitle")}</h3>
                    <div className="lists-wrapper">
                        <div className="list">
                            <h3 className="skills-title">{t("intro.devSkills")}</h3>
                            <ul>
                                {devSkills.map((item, index) => (
                                    <li className={`${index % 2 === 0 ? "" : "odd"}`} key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="list">
                            <h3 className="skills-title">{t("intro.learningSkills")}</h3>
                            <ul>
                                {learningSkills.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="divider big" />
                </div>
            </div>
        </section >
    )
}

export default Intro
