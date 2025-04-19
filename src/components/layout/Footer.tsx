import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#0A1E38] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#C39D63]">
              Cricketer's Choice
            </h3>
            <p className="text-gray-300 mb-4">
              Your premium destination for quality cricket equipment. We provide
              professional grade gear for cricket enthusiasts of all levels.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-[#C39D63] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#C39D63] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#C39D63] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#C39D63]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-[#C39D63] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-[#C39D63] transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="text-gray-300 hover:text-[#C39D63] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-[#C39D63] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#C39D63]">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/brand-selection?category=1"
                  className="text-gray-300 hover:text-[#C39D63] transition-colors"
                >
                  Cricket Bats
                </Link>
              </li>
              <li>
                <Link
                  to="/brand-selection?category=2"
                  className="text-gray-300 hover:text-[#C39D63] transition-colors"
                >
                  Cricket Balls
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=gloves"
                  className="text-gray-300 hover:text-[#C39D63] transition-colors"
                >
                  Batting Gloves
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=pads"
                  className="text-gray-300 hover:text-[#C39D63] transition-colors"
                >
                  Batting Pads
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#C39D63]">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 text-[#C39D63]" />
                <span className="text-gray-300">
                  13/14 Aungier Street, Dublin 2, D02 WC04, Ireland
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-[#C39D63]" />
                <span className="text-gray-300">+353 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-[#C39D63]" />
                <span className="text-gray-300">info@cricketerschoice.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Cricketer's Choice. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
