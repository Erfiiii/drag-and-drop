import { Rectangle } from "../types";

export const updateLocalStorageByRectangles = (rectangles: Rectangle[]) => {
    const data = JSON.stringify(rectangles);
    const lastUpdated = JSON.stringify(new Date())
    localStorage.setItem('rectangles', data)
    localStorage.setItem('lastUpdated', lastUpdated)
}

export const retrieveRectanglesFromLocalStorage = (): Rectangle[] | null => {
    const data = localStorage.getItem('rectangles');
    if (data) {
        return (JSON.parse(data))
    } else {
        return null
    }
};
export const retrieveLastUpdatedFromLocalStorage = (): Date | null => {
    const data = localStorage.getItem('lastUpdated');
    if (data) {
        const lastUpdated = JSON.parse(data)
        return new Date(lastUpdated)
    } else {
        return null
    }
}