import { useEffect } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
return (
  <div className="min-h-screen bg-gradient-to-br from-[#f3e8ff] via-[#e0e7ff] to-[#f0fdf4]">
    <Navbar />
    <div className="max-w-7xl mx-auto my-10 px-4">
      <h1 className="font-extrabold text-3xl text-center text-[#2c08cf] mb-8">
        Search Results <span className="text-[#1ad406]">({allJobs.length})</span>
      </h1>
      <div className="bg-white/80 rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.map((job) => (
            <Job1 key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
};

export default Browse;
