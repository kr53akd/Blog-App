import FeaturedSection from "@/component/FeaturedSection/FeaturedSection";
import Herosection from "@/component/Herosection/Herosection";
import NewsLetter from "@/component/NewsLetter/NewsLetter";



export default function Home() {
  return (
    <div className=" bg-zinc-50 font-sans dark:bg-black">
       <Herosection/>
       <FeaturedSection/>
       <NewsLetter/>
       
    </div>
  );
}
