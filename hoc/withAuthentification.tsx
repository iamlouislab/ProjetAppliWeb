import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CenteredLoader from "@/components/CenteredLoader";
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";

const withAuthentication = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent: React.FC = (props: any) => {
    const authContext = useContext(AuthContext);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const router = useRouter();

    useEffect(() => {
      console.log("use Effect in withAuthentication");
      if (authContext?.user) {
        console.log("User is authenticated");
        setIsAuthenticated(true);
      } else {
        console.log("User is not authenticated");
        setIsAuthenticated(false);
        router.push("/login");
      }
    }, [authContext?.user, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuthentication(${getDisplayName(
    WrappedComponent
  )})`;

  return AuthenticatedComponent;
};

function getDisplayName(WrappedComponent: React.ComponentType): string {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuthentication;
