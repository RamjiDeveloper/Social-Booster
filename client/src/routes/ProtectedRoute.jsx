
// import { Navigate, Outlet } from "react-router-dom";

// function ProtectedRoute() {
//   const isLoggedIn =
//     sessionStorage.getItem("demoLoggedIn") === "true";

//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// }

// export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRoles = [] }) {
  const isLoggedIn =
    sessionStorage.getItem("demoLoggedIn") === "true";

  const userRole =
    sessionStorage.getItem("demoUserRole") || "customer";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(userRole)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

