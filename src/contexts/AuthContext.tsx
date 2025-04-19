import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
//import { useToast } from "@/hooks/use-toast";
import {
  login as loginService,
  signup as signupService,
  LoginParams,
  SignupParams,
} from "@/services/authService";
import {
  updateUser as updateUserService,
  User,
  UserUpdateParams,
} from "@/services/userService";
import { toast } from "sonner";

// Define types
type AuthContextType = {
  user: User | null;
  login: (credentials: LoginParams) => Promise<void>;
  register: (userData: SignupParams) => Promise<void>;
  updateUser: (userData: UserUpdateParams) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Ensure that useState is being used correctly
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //const { toast } = useToast();

  // Check for stored user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (token === "undefined" || storedUser === "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      toast("Login successful", {
        description: "Welcome back!",
      });
      setUser(data?.data?.user);
      setIsAuthenticated(true);
      localStorage.setItem("token", data?.data?.accessToken);
      localStorage.setItem("user", JSON.stringify(data?.data?.user));
      window.location.href = "/category-selection";
    },
    onError: () => {
      // Handle error here
      toast("Invalid credentials", {
        description: "Please check your mobile phone and password.",
      });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: signupService,
    onSuccess: () => {
      toast("Registration successful", {
        description: "You can now log in with your credentials.",
      });
      window.location.href = "/login"; // Redirect to login after successful registration
    },
    onError: () => {
      toast("error");
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: updateUserService,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast("Profile updated successfully", {
        description: "Your profile has been updated.",
      });
    },
    onError: () => {
      toast("error");
    },
  });

  // Login function
  const login = async (credentials: LoginParams) => {
    setIsLoading(true);
    try {
      await loginMutation.mutateAsync(credentials);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: SignupParams) => {
    setIsLoading(true);
    try {
      await registerMutation.mutateAsync(userData);
    } finally {
      setIsLoading(false);
    }
  };

  // Update user function
  const updateUserFn = async (userData: UserUpdateParams) => {
    setIsLoading(true);
    try {
      await updateUserMutation.mutateAsync(userData);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login"; // Redirect to login after logout
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        updateUser: updateUserFn,
        logout,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
