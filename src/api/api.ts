import { API } from "../shared/constants"
import { Rectangle } from "../shared/types"

export type Client = {
    getRectangles: ()=> Promise<Rectangle[]>
}

export const client : Client = {
    getRectangles: async()=> {
        const res = await fetch(API);
        return await res.json() as Rectangle[]
    }
}

export const mockClient: Client = {
    getRectangles: async()=> {
        return Promise.resolve<Rectangle[]>([{
            id: '1',
            size: 0.2,
            x: 0.5,
            y: 0.5
        }])
    }
}

export const mockRectangles: Rectangle[] = [{
    id: '1',
    size: 0.2,
    x: 0.5,
    y: 0.5
}]