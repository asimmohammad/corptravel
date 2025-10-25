import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-[hsl(var(--laasy-dark))] text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Plane className="h-6 w-6" />
              <span>LaaSy</span>
            </Link>
            <p className="text-sm text-gray-300">
              Simplify business travel for your whole team.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/preview" className="hover:text-white transition-colors">Preview</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-300">
          © 2025 LaaSy Business Travel. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
