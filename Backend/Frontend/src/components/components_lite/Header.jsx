import { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
// ...existing code...
return (
  <div className="bg-gradient-to-br from-[#f3e8ff] via-[#e0e7ff] to-[#f0fdf4] py-16 px-4">
    <div className="text-center max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 my-10">
        <span className="px-5 py-2 mx-auto flex justify-center items-center gap-2 rounded-full bg-white/80 shadow text-[#6A38C2] font-semibold text-base backdrop-blur">
          <span className="text-[#614232] text-xl">
            <PiBuildingOfficeBold />
          </span>
          No.1 Job Search Website
        </span>

        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Search, Apply &<br />
          Get Your <span className="text-[#6A38C2] bg-gradient-to-r from-[#6A38C2] to-[#1ad406] bg-clip-text text-transparent">Dream Job</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Start your hunt for the best, life-changing career opportunities from here in your
          <br className="hidden md:block" />
          selected areas conveniently and get hired quickly.
        </p>
        <div className="flex w-full max-w-xl mx-auto shadow-xl border border-gray-200 bg-white/70 backdrop-blur rounded-full items-center gap-3 px-4 py-2 transition focus-within:ring-2 focus-within:ring-[#6A38C2]">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find Your Dream Job"
            className="outline-none border-none w-full bg-transparent text-base px-2 py-2"
          />
          <Button
            onClick={searchjobHandler}
            className="rounded-full bg-[#6A38C2] hover:bg-[#1ad406] transition-colors text-white px-4 py-2"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);
// ...existing code...
};

export default Header;
