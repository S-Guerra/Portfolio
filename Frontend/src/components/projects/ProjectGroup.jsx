import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Project from "./Project.jsx"
import casio from "./assets/casio.jpg"
import chopin from "./assets/chopin.jpg"
import drumMachine from "./assets/drum-machine.jpg"
import map from "./assets/map.jpg"
import sunset from "./assets/sunset.jpg"

function ProjectGroup() {
    const { t } = useTranslation();
    const captions = t("projects.captions");
    const alts = t("projects.alts");
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

    return (
        <section className="page-section" id="projects" ref={ref}>
            <h2 className="grey">{t("projects.intro")}</h2>
            <div className="projects-wrapper-wrapper">
                <p id="top-info">{t("projects.order")}</p>
                <div className="projects-wrapper">
                    <Project
                        href="https://github.com/S-Guerra/FryderykGPT"
                        src={chopin}
                        alt={alts[0]}
                        figcaption={captions[0]}
                    />
                    <Project
                        href="https://codepen.io/LeSGuerra/pen/eYQyPgj"
                        src={casio}
                        alt={alts[1]}
                        figcaption={captions[1]}
                    />
                    <Project
                        href="https://codepen.io/LeSGuerra/pen/xxQPVLb"
                        src={drumMachine}
                        alt={alts[2]}
                        figcaption={captions[2]}
                    />
                    <Project
                        href="https://codepen.io/LeSGuerra/pen/WNgjLLN"
                        src={map}
                        alt={alts[3]}
                        figcaption={captions[3]}
                    />
                    <Project
                        href="https://codepen.io/LeSGuerra/pen/VwdPVPd"
                        src={sunset}
                        alt={alts[4]}
                        figcaption={captions[4]}
                    />
                </div>
            </div>
            <div className="grey">
                <p id="disclaimer">{t("projects.disclaimer")}</p>
                <div className="divider medium" />
                <p>{t("projects.links1")}<a href='https: //github.com/S-Guerra'>Github</a> & <a href='https://codepen.io/LeSGuerra'>Codepen</a>{t("projects.links2")}</p>
                <p className="transition">{t("projects.better")}</p>
            </div>
        </section >
    )
}

export default ProjectGroup
