import Footer from "@/component/Footer/Footer";
import Navbar from "@/component/Navbar/Navbar";

export default function mainLayout({children}:{children: React.ReactNode}){
    return<>
    <Navbar/>
        {children}
    <Footer />
    </>
}