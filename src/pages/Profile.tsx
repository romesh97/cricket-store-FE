import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserUpdateParams } from "@/services/userService";
import { toast } from "sonner";

const Profile = () => {
  const { user, updateUser, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  // Profile update form state
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [emailAddress, setEmailAddress] = useState(user?.emailAddress || "");
  const [eircode, setEircode] = useState(user?.eircode || "");

  // Password change form state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !emailAddress || !eircode) {
      return;
    }

    const userData: UserUpdateParams = {
      firstName,
      lastName,
      emailAddress,
      eircode,
      oldPassword,
      password: newPassword,
    };

    try {
      await updateUser(userData);
    } catch (error) {
      toast("Error", {
        description: "Failed to update profile. Please try again.",
      });
      console.log(error);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields.");

      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    const userData: UserUpdateParams = {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      emailAddress: user?.emailAddress || "",
      eircode: user?.eircode || "",
      oldPassword,
      password: newPassword,
    };

    try {
      await updateUser(userData);
      setNewPassword("");
      setOldPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error instanceof Error && (error as any).response?.data?.errors) {
        console.log((error as any).response.data.errors);
        setError(
          (error as any).response.data.errors || "An unknown error occurred."
        );
      } else {
        console.log("An unknown error occurred:", error);
      }
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <PageLayout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0A1E38] mb-8">My Account</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="profile">Profile Details</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
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
                      value={user.mobilePhone}
                      disabled
                      className="bg-gray-100"
                    />
                    <p className="text-sm text-gray-500">
                      Mobile phone cannot be changed
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eircode">Eircode</Label>
                    <Input
                      id="eircode"
                      value={eircode}
                      onChange={(e) => setEircode(e.target.value)}
                      disabled
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      className="bg-[#0A1E38] text-white hover:bg-[#0A1E38]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update Profile"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="oldPassword">Old Password</Label>
                    <Input
                      id="oldPassword"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => {
                        setError(null);
                        setOldPassword(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => {
                        setError(null);
                        setNewPassword(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setError(null);
                        setConfirmPassword(e.target.value);
                      }}
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      className="bg-[#0A1E38] text-white hover:bg-[#0A1E38]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Change Password"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Button
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
