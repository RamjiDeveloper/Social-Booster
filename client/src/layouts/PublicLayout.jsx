import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#09090f] text-white">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default PublicLayout;