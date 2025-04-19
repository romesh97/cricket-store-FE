import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
//import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LoginImage from "../assets/images/login_image.jpeg";

const bgImageStyle = {
  backgroundImage: `url(${LoginImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Login = () => {
  const [mobilePhone, setMobilePhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticated, isLoading } = useAuth();
  //const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/category-selection");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mobilePhone || !password) {
      return;
    }

    try {
      await login({ mobilePhone, password });
      //navigate("/category-selection");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid mobile phone number or password.");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#0A1E38] mb-2">
              Cricketer's Choice
            </h1>
            <p className="text-gray-600">Login to your account</p>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobilePhone">Mobile Phone</Label>
                  <Input
                    id="mobilePhone"
                    type="tel"
                    placeholder="+353 XX XXX XXXX"
                    value={mobilePhone}
                    onChange={(e) => {
                      setError(null);
                      setMobilePhone(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-[#145DA0] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setError(null);
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#0A1E38] text-white hover:bg-[#0A1E38]"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
              {error && (
                <p className="text-red-500 text-sm text-start mt-2">{error}</p>
              )}
            </CardContent>

            <CardFooter>
              <p className="text-center text-sm text-gray-600 mt-2 w-full">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#145DA0] hover:underline font-medium"
                >
                  Register
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Right side - Image */}
      <div
        style={bgImageStyle}
        className="hidden md:block md:w-1/2 bg-[#0A1E38]"
      ></div>
    </div>
  );
};

export default Login;
