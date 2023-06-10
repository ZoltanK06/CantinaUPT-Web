import { api } from "../Axios/AxiosConfig"

export const CanteenApi = {
    Login: async function(userNameOrEmail, password) {
        const result = await api.post(`Auth/Login`, {username: userNameOrEmail, email: userNameOrEmail, password: password})
        .then(result => result.data);

        return result;
    },

    Register: async function(username, email, password, canteenId, roleId) {
        const result = await api.post(`Auth/Register`, {username: username, email: email, password: password, canteenId: canteenId, roleId: roleId})
        .then(result => result.data);

        return result;
    },

    GetCanteens: async function() {
        const result = await api.get(`canteen/GetEveryCanteensDetails`)
        .then(result => result.data);

        return result;
    },
 
    AddMeal: async function(meal) {
        const result = await api.post(`meal/AddMeal`, meal)
        .then(result => result.data);

        return result;
    },

    GetPortionOptions: async function() {
        const result = await api.get(`portion/GetAllPortions`)
        .then(result => result.data);

        return result;
    },

    GetCategoryOptions: async function() {
        const result = await api.get(`category/GetAllCategories`)
        .then(result => result.data);

        return result;
    },

    GetMealsOfCanteenByCategory: async function(canteenId, categoryId) {
        const result = await api.get(`canteen/GetMealsOfCanteenByCategory`, {params: {canteenId: canteenId, categoryId: categoryId}})
        .then(result => result.data);

        return result;
    },

    DeleteMealById: async function(mealId) {
        const result = await api.delete(`meal/DeleteMeal/${mealId}`)
        .then(result => result.data);

        return result;
    },

    ChangeMealsDisponibility: async function(mealId) {
        const result = await api.put(`meal/ChangeDisponibility`, null, {params: {mealId: mealId}})
        .then(result => result.data);

        return result;
    },

    GetAllCategoriesWithPictures: async function() {
        const result = await api.get(`category/GetAllCategoriesWithPictures`)
        .then(result => result.data);

        return result;
    },

    GetAllManagers: async function() {
        const result = await api.get(`auth/GetAllManagers`)
        .then(result => result.data);

        return result;
    },

    DeleteUser: async function(userId) {
        const result = await api.delete(`auth/DeleteUser`, {params: {userId: userId}})
        .then(result => result.data);

        return result;
    },

    UpdateUser: async function(user) {
        const result = await api.put(`auth/UpdateUser`, user)
        .then(result => result.data);

        return result;
    },

    AddCanteen: async function(canteen) {
        const result = await api.post(`canteen/AddCanteen`, canteen)
        .then(result => result.data);

        return result;
    },

    UpdateCanteen: async function(id, canteen) {
        const result = await api.put(`canteen/UpdateCanteen/${id}`, canteen)
        .then(result => result.data);

        return result;
    },

    DeleteCanteen: async function(canteenId) {
        const result = await api.delete(`canteen/DeleteCanteen/${canteenId}`)
        .then(result => result.data);

        return result;
    },

    AddCard: async function(userId, card) {
        const result = await api.post(`Card/AddCard/${userId}`, card)
        .then(result => result.data);

        return result;
    },

    GetUsersCards: async function(userId) {
        const result = await api.get(`Card/GetUsersCards`, {params: {userId: userId}})
        .then(result => result.data);

        return result;
    },

    AddOrder: async function(order) {
        const result = await api.post(`order/AddOrder`, order)
        .then(result => result.data);

        return result;
    },

    GetCurrentOrder: async function(userId, canteenId) {
        const result = await api.get(`order/GetCurrentOrder`, {params: {userId: userId, canteenId: canteenId}})
        .then(result => result.data);

        return result;
    },

    GetOrdersForCanteen: async function(canteenId) {
        const result = await api.get(`order/GetOrdersForCanteen`, {params: {canteenId: canteenId}})
        .then(result => result.data);

        return result;
    },

    UpdateOrderStatus: async function(orderId, newOrderStatusId) {
        const result = await api.patch(`order/UpdateOrderStatus`, null, {params: {orderId: orderId, newOrderStatusId: newOrderStatusId}})
        .then(result => result.data);

        return result;
    }
}