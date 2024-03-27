import { useTranslation } from "react-i18next";

function Intro() {
    const { t } = useTranslation();

    const devSkills = ["HTML5", "CSS3", "SCSS/SASS", "JavaScript", "React.js", "Node.js", "Express.js", "Bash", "PostgreSQL", "MongoDB"];
    const learningSkills = t("intro.learningSkillsList");

    return (
        <section className="page-section intro" id="intro">
            <div className="intro-content-wrapper">
                <div className="text-wrapper">
                    <h2>{t("intro.intro")}</h2>
                    <p>{t("intro.storyPart1")}<br /><br />{t("intro.storyPart2")}<br /><br />{t("intro.storyPart3")}<br /></p>
                </div>
                <div className="divider big" />
                <blockquote>
                    <p className="quote">{t("intro.quote")}</p>
                    <p className="author">- Winston Churchill</p>
                </blockquote>
                <div className="divider big" />
                <div className="skills-wrapper">
                    <h3 id="skills-intro">{t("intro.skillsTitle")}</h3>
                    <div className="lists-wrapper">
                        <div className="list">
                            <h3>{t("intro.devSkills")}</h3>
                            <ul>
                                {devSkills.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="list">
                            <h3>{t("intro.learningSkills")}</h3>
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
