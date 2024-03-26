import PropTypes from "prop-types";

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

export default Project
