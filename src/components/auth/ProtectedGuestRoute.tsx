import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/admin/auth/AuthProvider";

/**
 * Guards routes that require a signed-in guest (e.g. /booking, /my-bookings).
 * Unauthenticated visitors are redirected to /signin and bounced back here
 * after they sign in (using location.state.from).
 */
export const ProtectedGuestRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{
          from: location.pathname + location.search,
          message: "Please sign in or create an account to continue booking.",
        }}
      />
    );
  }

  return <Outlet />;
};
