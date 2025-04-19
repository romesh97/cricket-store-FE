import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, User, Truck } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "../..//contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { cn } from "../../lib/utils";

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // Update handleSearch to add the search term to URL params
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Preserve existing params and add/update the search param
    const newParams = new URLSearchParams(searchParams);
    if (searchTerm) {
      newParams.set("search", searchTerm);
    } else {
      newParams.delete("search");
    }

    setSearchParams(newParams);
  };

  useEffect(() => {
    const currentSearchTerm = searchParams.get("search") || "";
    setSearchTerm(currentSearchTerm);
  }, [searchParams]);
  // Update search params whenever search term changes
  useEffect(() => {
    // Debounce function to avoid too many URL updates
    const timeoutId = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);

      if (searchTerm) {
        newParams.set("search", searchTerm);
      } else {
        newParams.delete("search");
      }

      setSearchParams(newParams);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchParams, setSearchParams]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#0A1E38] text-white py-4 sticky top-0 z-50 shadow-md">
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/products" className="flex items-center">
          <span className="text-xl font-bold text-[#C39D63]">
            Cricketer's Choice
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="lg:hidden ml-auto mr-4 text-white hover:text-[#C39D63]"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-center mx-4">
          <form className="w-full max-w-lg flex">
            <Input
              type="text"
              placeholder="Search for cricket equipment..."
              className="rounded-r-none bg-white text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="default"
              className="rounded-l-none bg-[#C39D63] hover:bg-yellow-600 text-black"
            >
              <Search size={18} />
            </Button>
          </form>
        </div>

        {/* Desktop cart and auth buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            to="/cart"
            className="flex items-center text-white hover:text-[#C39D63] transition-colors"
          >
            <div className="relative">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C39D63] text-[#0A1E38] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="ml-2">Cart</span>
          </Link>
          <Link
            to="/orders"
            className="flex items-center text-white hover:text-[#C39D63] transition-colors"
          >
            <div className="relative">
              <Truck size={24} />
            </div>
            <span className="ml-2">My Orders</span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="flex items-center text-white hover:text-[#C39D63] transition-colors"
              >
                <User size={24} />
                <span className="ml-2">Account</span>
              </Link>
              <Button
                variant="ghost"
                onClick={() => logout()}
                className="text-white hover:text-[#C39D63] hover:bg-transparent"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="text-white hover:text-[#C39D63] hover:bg-transparent"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="bg-[#C39D63] hover:bg-yellow-600 text-black"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden absolute left-0 right-0 bg-[#0A1E38] px-4 py-2 pb-4 shadow-lg z-40 transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <form onSubmit={handleSearch} className="flex mb-4">
          <Input
            type="text"
            placeholder="Search products..."
            className="rounded-r-none text-black"
          />
          <Button
            type="submit"
            variant="default"
            className="rounded-l-none bg-[#C39D63] hover:bg-yellow-600 text-black"
          >
            <Search size={18} />
          </Button>
        </form>

        <div className="flex flex-col space-y-2">
          <Link
            to="/products"
            className="py-2 px-3 hover:bg-[#0A1E38] rounded transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            All Products
          </Link>
          <Link
            to="/products?category=bats"
            className="py-2 px-3 hover:bg-[#0A1E38] rounded transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Bats
          </Link>
          <Link
            to="/products?category=balls"
            className="py-2 px-3 hover:bg-[#0A1E38] rounded transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Balls
          </Link>
          <Link
            to="/products?category=gloves"
            className="py-2 px-3 hover:bg-[#0A1E38] rounded transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Gloves
          </Link>
          <Link
            to="/products?category=pads"
            className="py-2 px-3 hover:bg-[#0A1E38] rounded transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Pads
          </Link>
          <div className="h-px bg-[#145DA0] my-2"></div>
          <Link
            to="/cart"
            className="flex items-center py-2 px-3 hover:bg-[#0A1E38] rounded transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <ShoppingCart size={20} className="mr-2" />
            Cart ({totalItems})
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/account"
                className="flex items-center py-2 px-3 hover:bg-[#0A1E38] rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} className="mr-2" />
                Account
              </Link>
              <Button
                variant="ghost"
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="justify-start py-2 px-3 h-auto text-white hover:bg-[#0A1E38] hover:text-white rounded transition-colors"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="py-2 px-3 hover:bg-[#0A1E38] rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="py-2 px-3 font-bold text-[#C39D63] hover:bg-[#0A1E38] rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
