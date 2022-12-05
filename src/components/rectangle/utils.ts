import { Rectangle } from "../../shared/types";

export const getRectangleStyle = (rectangle: Rectangle, isDragging: boolean) => {
    const top = `${rectangle.y * 100}%`;
    const left = `${rectangle.x * 100}%`;
    const size = `${(rectangle.size * 100)}%`
    return {
        cursor: isDragging ? 'move' : 'grab',
        top,
        left,
        width: size,
        height: size,
        opacity: isDragging ? 0.2 : 1
    }
}