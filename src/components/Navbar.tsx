import { useNavigate } from "react-router";
import useUrlStore from "../store/urlStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { userId } = useUrlStore();

  const handleLogOutClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleHomePageClick = () => {
    navigate("/home/" + userId);
  };

  const handleStatisticsClick = () => {
    navigate("/statistics");
  };
  return (
    <div className="flex justify-between p-2 items-center text-2xl  border-b-2">
      <div className="">user1</div>
      <div className="flex gap-5">
        <button onClick={handleHomePageClick}>HomePage</button>
        <p>|</p>
        <button onClick={handleStatisticsClick}>Statistics</button>
      </div>
      <button
        className="bg-white text-lg text-black py-1 px-2 border-3 rounded-md"
        onClick={handleLogOutClick}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
