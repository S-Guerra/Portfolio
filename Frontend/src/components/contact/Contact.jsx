import { useState } from "react";
import { useTranslation } from "react-i18next";

function Contact() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { t } = useTranslation();

    const sendEmail = async () => {
        await fetch("http://localhost:3001/api/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: userName,
                email: email,
                message: message,
            })
        }).then(res => {
            if (!res.ok) throw new Error("Network response was not ok...");
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.error(`Error while processing email: ${err}`);
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendEmail();
            setSuccessMessage("Email sent successfully");
        } catch (err) {
            setErrorMessage(`Error while processing email: ${err.message}`);
        }
    };

    return (
        <section className="page-section" id="contact">
            <div className="form-wrapper">
                <h2>{t("contact.intro")}<span className="smaller">{t("contact.introSmaller")}</span></h2>
                <form onSubmit={handleSubmit} action="?" method="POST">
                    <label htmlFor="name">{t("contact.name")}</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                    <label htmlFor="email">{t("contact.email")}</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="message">{t("contact.message")}</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="7"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                    <div className="g-recaptcha" data-sitekey="6LfgI2wpAAAAANOlvY16UYL7hZlKCtx-xNcnb8Kw"></div>
                    <input className="submit" type="submit" value={t("contact.submit")} />
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}
                </form>
            </div>
        </section>
    )
}

export default Contact
