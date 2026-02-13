import { createRoot } from "react-dom/client";
import MobileLayout from "./layouts/MobileLayout";
import NonMobileLayout from "./layouts/NonMobileLayout";

const MAX_MOBILE_WIDTH = 800;

const width = window.innerWidth;

createRoot(document.getElementById('root')!).render(
  width <= MAX_MOBILE_WIDTH ?
    <MobileLayout />
    :
    <NonMobileLayout />
);
