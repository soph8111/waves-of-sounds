import { Link } from "react-router-dom"

const WelcomeSection = () => {
    return ( 
    <>
      <div id="welcome_image"></div> 
      <div id="welcome_message">
        <h1>waves of sounds</h1>
        <h2>17 - 19 juli 2025</h2>
        <Link to="/program" id="explore_link" aria-label="explore_link">explore the program</Link>
      </div>  
    </>
    );
  };
  
  export default WelcomeSection;