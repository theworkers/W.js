function isValidEmailAddress(address) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);
}