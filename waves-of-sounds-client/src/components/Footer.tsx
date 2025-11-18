import AdminLogin from "./AdminLogin";
import NewsletterForm from "./NewsletterForm";

const Footer = () => {
    return (
    <div id="footer">
        <div id="banner">
            <p>17 - 19 juli 2025</p>
            <p>17 - 19 juli 2025</p>
            <p>17 - 19 juli 2025</p>
        </div>
        <div id="newsletterContainer">
            <h3>Don't miss out on great news</h3>
            <NewsletterForm />
        </div>
        <div id="admin_nav">
            <AdminLogin />
        </div>
    </div>
    );
};
  
  export default Footer