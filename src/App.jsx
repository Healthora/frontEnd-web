import HeroSection from "./landingPage/HeroSection.jsx";
import ProblemSection from "./landingPage/ProblemsSectionMedical.jsx";
import SolutionsSectionMedical from "./landingPage/Solutionsection.jsx";
import Howitworkssection from "./landingPage/Howitworkssection.jsx";
import FinalCTASectionMedical from "./landingPage/FinalCTASection.jsx";
import Footer from "./landingPage/Footer.jsx";
import Header from "./landingPage/Header.jsx";
// import SecuritySectionMedical from "./landingPage/SecuritySectionMedical.jsx";

function App() {
  
  return (
    <div>
      <HeroSection />
      <ProblemSection />
      <SolutionsSectionMedical />
      <Howitworkssection />
      {/* <SecuritySectionMedical /> */}
      <FinalCTASectionMedical />
      <Footer />
      <Header />
    </div>
  );
}

export default App;
