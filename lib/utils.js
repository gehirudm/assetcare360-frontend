// export a function to get today
export function getToday() {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format YYYY-MM-DD
}