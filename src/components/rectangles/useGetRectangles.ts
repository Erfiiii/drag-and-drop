import React, { useEffect, useState } from 'react';
import { useClient } from '../../contexts/client';
import { retrieveLastUpdatedFromLocalStorage, retrieveRectanglesFromLocalStorage, updateLocalStorageByRectangles } from '../../shared/store';
import { Rectangle } from '../../shared/types';
import { getDaysDifference } from './utils';

export function useGetRectangles(): [Array<Rectangle>, React.Dispatch<React.SetStateAction<Rectangle[]>>] {
    const [rectangles, setRectangles] = useState<Rectangle[]>([]);
    const client = useClient()
    useEffect(() => {
        const fetchDataAndStore = async () => {
            const data = await client.getRectangles()
            updateLocalStorageByRectangles(data)
            setRectangles(data)
        }
        const lastUpdated = retrieveLastUpdatedFromLocalStorage()
        const daysDifference = getDaysDifference(lastUpdated ?? new Date(), new Date())
        const data = retrieveRectanglesFromLocalStorage()
        if (data && daysDifference < 7) {
            setRectangles(data)
        } else {
            fetchDataAndStore()
        }
    }, [client])

    return [rectangles, setRectangles]
}