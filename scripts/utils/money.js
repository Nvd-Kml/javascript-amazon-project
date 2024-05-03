export const formatCurrency = (priceCents) => {
    return Number((priceCents / 100).toFixed(2));
} 

export const getTaxRate = (price) => {
    return Number((price / 10).toFixed(2));
}