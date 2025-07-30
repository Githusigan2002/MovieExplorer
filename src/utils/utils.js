export function converMin(minutes) {
    const hour = Math.floor(minutes / 60);
    const remainingMin = minutes % 60;
    return `${hour}h ${remainingMin}m`;
}