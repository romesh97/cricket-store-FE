import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
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

import LoginImage from "../assets/images/register_image.jpeg";

const bgImageStyle = {
  backgroundImage: `url(${LoginImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState<string[] | null>(null);
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [eircode, setEircode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { register, isAuthenticated, isLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/category-selection");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !mobilePhone ||
      !eircode ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast("Passwords do not match.");
      return;
    }

    try {
      await register({
        firstName,
        lastName,
        emailAddress,
        mobilePhone,
        password,
        eircode,
      });
      navigate("/category-selection");
    } catch (error) {
      // @ts-expect-error : error is not typed
      setError(error.response.data.errors as string[]);
      if (error instanceof Error) {
        toast(error.message);
      } else {
        toast("An error occurred while registering.");
      }
    }
  };

  console.log("errors ", error);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#0A1E38] mb-2">
              Cricketer's Choice
            </h1>
            <p className="text-gray-600">Create your account</p>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Sign Up
              </CardTitle>
              <CardDescription className="text-center">
                Enter your information to create an account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailAddress">Email</Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    placeholder="name@example.com"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobilePhone">Mobile Phone</Label>
                  <Input
                    id="mobilePhone"
                    type="tel"
                    placeholder="+353 XX XXX XXXX"
                    value={mobilePhone}
                    onChange={(e) => setMobilePhone(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eircode">Eircode</Label>
                  <Input
                    id="eircode"
                    type="text"
                    value={eircode}
                    onChange={(e) => setEircode(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#0A1E38] text-white hover:bg-[#0A1E38]"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Register"}
                </Button>
              </form>
              {error && (
                <div className="text-red-500 text-sm text-start mt-2">
                  {error.map((err, index) => (
                    <ul key={index}>{err}</ul>
                  ))}
                </div>
              )}
            </CardContent>

            <CardFooter>
              <p className="text-center text-sm text-gray-600 mt-2 w-full">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#145DA0] hover:underline font-medium"
                >
                  Login
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

export default Register;
