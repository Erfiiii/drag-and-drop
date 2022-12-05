import { mockRectangles } from "../../api/api";
import { updateLocalStorageByRectangles } from "./store";

describe('store', () => {
    beforeEach(() => {
        localStorage.clear()
    });
    afterEach(() => {
        localStorage.clear()
    });
    it('should update localStorage by adding rectangles', () => {
        updateLocalStorageByRectangles(mockRectangles)
        expect(localStorage.getItem('rectangles')).toEqual(JSON.stringify(mockRectangles))
    });
    afterAll(() => {
        localStorage.clear()
    })
});