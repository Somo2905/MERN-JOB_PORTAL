import { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

 
const isResume = true;
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
return (
  <div className="min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] to-[#f0fdf4] pb-10">
    <Navbar />

    <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-3xl my-10 p-8 shadow-[0_4px_24px_0_rgba(44,8,207,0.15)] relative">
      <Button
        onClick={() => setOpen(true)}
        className="absolute top-6 right-6 bg-[#2c08cf] hover:bg-[#1ad406] text-white rounded-full p-2 shadow"
        variant="ghost"
        size="icon"
        aria-label="Edit Profile"
      >
        <Pen />
      </Button>
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-28 w-28 ring-4 ring-[#2c08cf] shadow-lg mb-2">
          <AvatarImage
            src={user?.profile?.profilePhoto}
            alt={user?.fullname || "Profile"}
          />
        </Avatar>
        <h1 className="font-bold text-2xl text-[#2c08cf]">{user?.fullname}</h1>
        <p className="text-gray-600 text-center">{user?.profile?.bio}</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-8 mt-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#2c08cf]">
            <Mail size={18} />
            <a href={`mailto:${user?.email}`} className="hover:underline">{user?.email}</a>
          </div>
          <div className="flex items-center gap-2 text-[#2c08cf]">
            <Contact size={18} />
            <a href={`tel:${user?.phoneNumber}`} className="hover:underline">{user?.phoneNumber}</a>
          </div>
        </div>
        <div>
          <label className="text-md font-bold block mb-1">Resume</label>
          {isResume && user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
            >
              <Button className="bg-[#1ad406] hover:bg-[#2c08cf] text-white rounded-full px-4 py-2">
                Download {user?.profile?.resumeOriginalName}
              </Button>
            </a>
          ) : (
            <span className="text-gray-400">No Resume Found</span>
          )}
        </div>
      </div>
      <div className="my-8">
        <h2 className="font-semibold text-lg mb-2 text-[#2c08cf]">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {user?.profile?.skills && user?.profile?.skills.length !== 0 ? (
            user?.profile?.skills.map((item, index) => (
              <Badge
                key={index}
                className="bg-[#e0e7ff] text-[#2c08cf] px-3 py-1 rounded-full font-medium"
              >
                {item}
              </Badge>
            ))
          ) : (
            <span className="text-gray-400">NA</span>
          )}
        </div>
      </div>
    </div>

    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[0_4px_24px_0_rgba(44,8,207,0.10)] border-l-4 border-[#1ad406] p-6">
      <h1 className="text-lg mb-4 font-bold text-[#2c08cf]">Applied Jobs</h1>
      <AppliedJob />
    </div>

    <EditProfileModal open={open} setOpen={setOpen} />
  </div>
);
};

export default Profile;
