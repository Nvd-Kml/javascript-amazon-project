export const orders = loadFromStorage() || [];

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function loadFromStorage() {
    return JSON.parse(localStorage.getItem('orders'));
}