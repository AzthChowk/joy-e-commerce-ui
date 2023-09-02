import HomePageRoutes from "./HomePageRoutes";
import LoginRoutes from "./LoginRoutes";
import RegisterRoutes from "./RegisterRoutes";
import AddProductRoute from "./AddProductRoutes";
import SellerDashBoardRoutes from "./SellerDashBoardRoutes";

const applicationRoutes = [
  ...HomePageRoutes,
  ...LoginRoutes,
  ...RegisterRoutes,
  ...AddProductRoute,
  ...SellerDashBoardRoutes,
];
export default applicationRoutes;
