import i18n from "i18next";
import Nav from "./components/navbar/Nav.jsx";
import Header from "./components/header/Header.jsx";
import Intro from "./components/intro/Intro.jsx";
import ProjectGroup from "./components/projects/ProjectGroup.jsx";
import Contact from "./components/contact/Contact.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
  document.documentElement.lang = i18n.language;

  return (
    <>
      <Nav />
      <Header />
      <Intro />
      <ProjectGroup />
      <Contact />
      <Footer />
    </>
  )
}

export default App
