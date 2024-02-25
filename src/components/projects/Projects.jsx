import PropTypes from "prop-types";

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
    return (
        <section className="page-section" id="projects">
            <h2>Explore the projects that helped me develop my skills</h2>
            <p id="top-info">From newest to oldest.</p>
            <div className="projects-wrapper">
                <Project
                    href="https://github.com/S-Guerra/FryderykGPT"
                    src={chopin}
                    alt="A portrait of Fryderyk Chopin"
                    figcaption="FryderykGPT"
                />
                <Project
                    href="https://codepen.io/LeSGuerra/pen/eYQyPgj"
                    src={casio}
                    alt="A Casio Personal Mini calculator"
                    figcaption="Casio Calculator"
                />
                <Project
                    href="https://codepen.io/LeSGuerra/pen/xxQPVLb"
                    src={drumMachine}
                    alt="A React drum machine"
                    figcaption="Drum Machine"
                />
                <Project
                    href="https://codepen.io/LeSGuerra/pen/WNgjLLN"
                    src={map}
                    alt="A chloropleth map of the USA"
                    figcaption="Interactive USA Map"
                />
                <Project
                    href="https://codepen.io/LeSGuerra/pen/VwdPVPd"
                    src={sunset}
                    alt="A beautiful new retro wave sunset"
                    figcaption="Pure CSS Art"
                />
            </div>
            <p id="disclaimer">Please note that some of these projects were developed without responsive design considerations and may not display optimally on all devices.</p>
            <div className="divider medium"></div>
            <p>Visit my <a href="https://github.com/S-Guerra">Github</a> & <a href="https://codepen.io/LeSGuerra">Codepen</a> pages for more</p>
            <p className="transition">or better...</p>
        </section >
    )
}

export default Projects
