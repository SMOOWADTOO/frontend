export const devBASE = "http://localhost";
export const prodBASE = "https://www.casafair.org/api/";

export const BASE = prodBASE;

export const USER = BASE == devBASE ? BASE + ":7001/user" : BASE + "user";
export const SHOP = BASE == devBASE ? BASE + ":7002/shop" : BASE + "shop";
export const ORDER = BASE == devBASE ? BASE + ":7003/order" : BASE + "order";
export const PRODUCT = BASE == devBASE ? BASE + ":7004/product" : BASE + "product";
export const REVIEW = BASE == devBASE ? BASE + ":7005/review" : BASE + "review";
export const PAYMENT = BASE == devBASE ? BASE + ":7006/payment" : BASE + "payment";
export const NOTIFICATION = BASE == devBASE ? BASE + ":7007/notification" : BASE + "notification";
export const GENERAL = BASE == devBASE ? BASE + ":7008/general" : BASE + "general";
export const SEARCH = BASE == devBASE ? BASE + ":7009/search" : BASE + "search";

export default {
    USERAPI: USER,
    PAYMENTAPI: PAYMENT,
    SHOPAPI: SHOP,
    ORDERAPI: ORDER,
    PRODUCTAPI: PRODUCT,
    REVIEWAPI: REVIEW,
    NOTIFICATIONAPI: NOTIFICATION,
    SEARCHAPI: SEARCH,
    GENERALAPI: GENERAL,
}