import AddProductRoutes from "./AddProductRoutes";
import AdminDashBoardRoutes from "./AdminDashBoardRoutes";

const dashBoardRoutes = [...AddProductRoutes, ...AdminDashBoardRoutes];

export default dashBoardRoutes;
