import authService from "../auth/authService";

function Logout(props) {
  authService.logout();
  window.location = "/";
  return null;
}

export default Logout;
