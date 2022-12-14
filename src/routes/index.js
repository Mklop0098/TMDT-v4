import { HomePage } from "../pages/Homepage";
import { Defaultlayout } from "../components/DefaultLayout";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { PayPage } from "../pages/PayPage";
import { LoginPage } from "../pages/LoginPage";
import { Policy } from "../pages/Policy";
import { OrderedPage } from "../pages/OrderedPage";
import { DiscountPage } from "../pages/DiscountPage";


export const publishRoutes = [
    { path: '/', component: HomePage },
    { path: '/shop', component: Defaultlayout},
    { path: '/shop/:id', component: ProductPage },
    { path: '/cart', component: CartPage },
    { path: '/pay', component: PayPage },
    { path: '/login', component: LoginPage },
    { path: '/policy', component: Policy },
    { path: '/order', component: OrderedPage },
    { path: '/discount', component: DiscountPage },


];

export const privateRoutes = [];