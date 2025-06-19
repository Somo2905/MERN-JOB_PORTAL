import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
 

 
const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mern Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
];


const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchjobHandler = (query) => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
  }
return (
  <section className="relative py-16 bg-[#f8fafc]">
    {/* Decorative SVG wave */}
    <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none" style={{height: '40px'}}>
      <svg viewBox="0 0 500 40" preserveAspectRatio="none" className="w-full h-full">
        <path d="M0,40 C150,0 350,80 500,40 L500,00 L0,0 Z" fill="#e0e7ff" />
      </svg>
    </div>
    <div className="max-w-4xl mx-auto mb-10 relative z-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#2c08cf] mb-2 drop-shadow">
        Job Categories
      </h1>
      <p className="text-center text-gray-500 text-lg mb-6">
        Find your role by exploring our most popular job categories.
      </p>
    </div>
    {/* Responsive grid for desktop, carousel for mobile */}
    <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {Category.map((category, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow-lg hover:shadow-blue-200 flex flex-col items-center justify-center p-6 hover:shadow-2xl transition-shadow duration-200 border border-gray-100"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#6A38C2]/20 to-[#1ad406]/20 mb-4">
            <span className="text-2xl text-[#6A38C2]">
              {category.split(" ")[0][0]}
            </span>
          </div>
          <div className="font-semibold text-[#2c08cf] text-lg mb-2 text-center">{category}</div>
          <Button
            onClick={() => searchjobHandler(category)}
            className="rounded-full px-5 py-2 bg-[#1ad406] hover:bg-[#6A38C2] text-white font-bold mt-2 transition-colors"
          >
            Browse Jobs
          </Button>
        </div>
      ))}
    </div>
    {/* Carousel for mobile */}
    <div className="md:hidden max-w-xs mx-auto mt-8">
      <Carousel>
        <CarouselContent>
          {Category.map((category, idx) => (
            <CarouselItem key={idx}>
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-6 border border-gray-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#6A38C2]/20 to-[#1ad406]/20 mb-4">
                  <span className="text-2xl text-[#6A38C2]">
                    {category.split(" ")[0][0]}
                  </span>
                </div>
                <div className="font-semibold text-[#2c08cf] text-lg mb-2 text-center">{category}</div>
                <Button
                  onClick={() => searchjobHandler(category)}
                  className="rounded-full px-5 py-2 bg-[#1ad406] hover:bg-[#6A38C2] text-white font-bold mt-2 transition-colors"
                >
                  Browse Jobs
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 top-1/2 -translate-y-1/2 bg-white/80 shadow hover:bg-[#6A38C2] hover:text-white transition-colors" />
        <CarouselNext className="right-0 top-1/2 -translate-y-1/2 bg-white/80 shadow hover:bg-[#6A38C2] hover:text-white transition-colors" />
      </Carousel>
    </div>
  </section>
);
};

export default Categories;
