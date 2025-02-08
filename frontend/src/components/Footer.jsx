import { Link } from "react-router-dom";

// frontend/src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2">© 2024 E-Commerce Store. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <Link to="/about" className="hover:text-gray-300">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact Us
          </Link>
          <Link to="/terms" className="hover:text-gray-300">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
