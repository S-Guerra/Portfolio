import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";


import casio from "../../assets/casio.jpg"
import chopin from "../../assets/chopin.jpg"
import drumMachine from "../../assets/drum-machine.jpg"
import map from "../../assets/map.jpg"
import sunset from "../../assets/sunset.jpg"

function Project({ href, src, alt, figcaption }) {
    return (
        <figure className={"project"}>
            <a href={href}>
                <div className="project-img-wrapper">
                    <img src={src} alt={alt} decoding="async" loading="lazy" />
                </div>
                <figcaption>{figcaption}</figcaption>
            </a>
        </figure>
    )
}
Project.propTypes = {
    href: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    figcaption: PropTypes.string.isRequired
}

function Projects() {
    const { t } = useTranslation();
    const captions = t("projects.captions");
    const alts = t("projects.alts");

    return (
        <section className="page-section" id="projects">
            <h2>{t("projects.intro")}</h2>
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
            <p id="disclaimer">{t("projects.disclaimer")}</p>
            <div className="divider medium"></div>
            <p>{t("projects.links1")}<a href='https: //github.com/S-Guerra'>Github</a> & <a href='https://codepen.io/LeSGuerra'>Codepen</a>{t("projects.links2")}</p>
            <p className="transition">{t("projects.better")}</p>
        </section >
    )
}

export default Projects
