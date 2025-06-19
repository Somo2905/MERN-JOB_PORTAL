import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios"; // Import axios
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res && res.data && res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        console.error("Error logging out:", res.data);
      }
    } catch (error) {
      console.error("Axios error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      toast.error("Error logging out. Please try again.");
    }
  };
return (
  <nav className="bg-white shadow-md rounded-b-lg">
    <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-1">
          <span className="text-[#2c08cf]">Job</span>
          <span className="text-[#1ad406]">Spring</span>
        </h1>
      </div>
      <div className="flex items-center gap-10">
        <ul className="flex font-medium items-center gap-8">
          {user && user.role === "Recruiter" ? (
            <>
              <li>
                <Link
                  to="/admin/companies"
                  className="hover:text-[#2c08cf] transition-colors"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/jobs"
                  className="hover:text-[#2c08cf] transition-colors"
                >
                  Jobs
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/Home"
                  className="hover:text-[#2c08cf] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/Browse"
                  className="hover:text-[#2c08cf] transition-colors"
                >
                  Browse
                </Link>
              </li>
              <li>
                <Link
                  to="/Jobs"
                  className="hover:text-[#2c08cf] transition-colors"
                >
                  Jobs
                </Link>
              </li>
            </>
          )}
        </ul>
        {!user ? (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="outline"
                className="border-[#2c08cf] text-[#2c08cf] hover:bg-[#2c08cf] hover:text-white transition-colors"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-[#1ad406] hover:bg-[#16b305] text-white transition-colors shadow">
                Register
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer ring-2 ring-[#2c08cf] hover:ring-[#1ad406] transition-all">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt={user?.fullname || "User"}
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 rounded-lg shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 py-2">
                <Avatar className="cursor-pointer ring-2 ring-[#2c08cf]">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname || "User"}
                  />
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{user?.fullname}</h3>
                  <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4 text-gray-700">
                {user && user.role === "Student" && (
                  <div className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-1 transition-colors">
                    <User2 size={18} />
                    <Link to="/Profile">
                      <Button variant="link" className="p-0 h-auto text-[#2c08cf]">
                        Profile
                      </Button>
                    </Link>
                  </div>
                )}
                <div className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-1 transition-colors">
                  <LogOut size={18} />
                  <Button
                    onClick={logoutHandler}
                    variant="link"
                    className="p-0 h-auto text-red-600"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  </nav>
);

};

export default Navbar;
