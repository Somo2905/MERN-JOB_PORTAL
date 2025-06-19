import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    // If no search query is provided, reset to all jobs
    //     if (searchedQuery)
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterJobs(allJobs);
      return;
    }

    // Filter based on the searched query across various fields (title, description, etc.)
    const filteredJobs = allJobs.filter((job) => {
      const query = searchedQuery.toLowerCase();
      const queryNumber = parseInt(query.match(/\d+/)?.[0]);
      return (
        job.title?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        (queryNumber && job.experienceLevel === queryNumber) ||
        job.salary?.toLowerCase().includes(query)
      );
    });

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);
return (
  <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#b2ebf2] to-[#fff3e0]">
    <Navbar />
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-[#ff9800] drop-shadow">
        Available Jobs
      </h1>
      <div className="flex gap-8">
        <div className="w-1/5">
          <div className="bg-white rounded-2xl shadow-md p-4 border-l-4 border-[#ff9800]">
            <FilterCard />
          </div>
        </div>
        <div className="flex-1 min-h-[70vh]">
          {filterJobs.length <= 0 ? (
            <div className="flex items-center justify-center h-full text-lg text-[#009688] font-semibold">
              Job not found
            </div>
          ) : (
            <div className="h-[80vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.4 }}
                    key={job.id}
                  >
                    <div className="bg-white rounded-xl shadow-lg border-t-4 border-[#009688] hover:border-[#ff9800] transition-all duration-200">
                      <Job1 job={job} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default Jobs;
