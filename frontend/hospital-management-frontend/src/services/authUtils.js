export const logoutUser = (navigate) => {
  // Clear session storage and local storage
  sessionStorage.clear();
  localStorage.clear();

  localStorage.removeItem("token"); // If using JWT tokens

  // Clear cookies (like JSESSIONID)
  document.cookie =
    "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
  // Disable caching to prevent back navigation
  if (window.history && window.history.pushState) {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }

  // Redirect to login page
  navigate("/login", { replace: true });
};
