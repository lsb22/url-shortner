import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="flex justify-between p-2 items-center text-2xl  border-b-2">
      <div className="">user1</div>
      <div className="flex gap-5">
        <h2>HomePage</h2>
        <p>|</p>
        <h2>Statistics</h2>
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
