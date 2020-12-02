function calCommission(type, price) {
    if (type == "buying") {
        return price * 0.02
    } else if (type == "rantal") {
        return price;
    } else {
        return 0
    }
}

module.exports = calCommission