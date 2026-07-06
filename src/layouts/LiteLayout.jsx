import { Outlet } from "react-router-dom";
import LiteFooter from "../components/LiteFooter";
import LiteHeader from "../components/LiteHeader";
import TechBackground from "../components/TechBackground";

export default function LiteLayout() {
  return (
    <>
      <TechBackground />
      <div className="lite-root">
        <LiteHeader />
        <Outlet />
        <LiteFooter />
      </div>
    </>
  );
}
