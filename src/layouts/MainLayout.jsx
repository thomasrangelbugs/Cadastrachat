import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollProgress from "../components/ScrollProgress";
import TechBackground from "../components/TechBackground";
import WhatsAppWidget from "../components/WhatsAppWidget";

export default function MainLayout() {
  return (
    <>
      <TechBackground />
      <ScrollProgress />
      <Header />
      <Outlet />
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
