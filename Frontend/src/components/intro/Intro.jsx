function Intro() {
    const devSkills = ["HTML5", "CSS3", "SCSS/SASS", "JavaScript", "React.js", "Node.js", "Express.js", "Bash", "PostgreSQL", "MongoDB"];
    const learningSkills = ["Self-Discipline and Time Management", "Problem-Solving", "Resilience and Perseverance", "Adaptability and Flexibility", "Research Skills", "Critical Thinking", "Retention and Understanding"];

    return (
        <section className="page-section intro" id="intro">
            <div className="intro-content-wrapper">
                <div className="text-wrapper">
                    <h2>How I embarked on this journey</h2>
                    <p>
                        After suffering an injury last year that left me with two broken legs, I decided to use my recovery time to explore a new field: front-end development.<br /><br />
                        With the encouragement and support of a dear friend and my passion for problem-solving, I quickly found front-end development to be a captivating and enjoyable challenge, approaching each problem as a fun and exciting puzzle.<br /><br />
                        I have almost completed my self-taught training and am eager to start working in this fascinating field. I am thrilled to be able to combine my creativity with my technical skills to bring innovative solutions to my future employers.<br />
                    </p>
                </div>
                <div className="divider big"></div>
                <div className="skills-wrapper">
                    <h3>Skills I have developed through my self-learning journey</h3>
                    <div className="divider medium"></div>
                    <div className="lists-wrapper">
                        <div>
                            <h3>🖥️ Dev skills</h3>
                            <ul>
                                {devSkills.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="divider medium"></div>
                        <div className="vertical divider"></div>
                        <div>
                            <h3>📚 Learning skills</h3>
                            <ul>
                                {learningSkills.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="divider big"></div>
                </div>
            </div>
        </section >
    )
}

export default Intro
