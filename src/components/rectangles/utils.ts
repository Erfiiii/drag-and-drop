
export const getDaysDifference = (firstDate: Date, secondDate: Date) => {
    var DifferenceInTime = secondDate.getTime() - firstDate.getTime();
    var DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);
    return DifferenceInDays
}
