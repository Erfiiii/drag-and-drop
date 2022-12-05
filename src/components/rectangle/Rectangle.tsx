import React, { PropsWithChildren, SetStateAction, useMemo, useState } from 'react';
import { PageSize, Rectangle as RectangleType } from '../../shared/types';
import styles from './Rectangle.module.css'
import { getRectangleStyle } from './utils';

interface OwnProps {
    rectangle: RectangleType;
    setMouseOffset: React.Dispatch<SetStateAction<{
        x: number;
        y: number
    }>>;
    pageSize: PageSize
};

type Props = PropsWithChildren<OwnProps>;

export function Rectangle(props: Props) {
    const { rectangle, setMouseOffset, pageSize } = props;
    const [isDragging, setIsDraging] = useState<boolean>(false)
    const handleDragStart = (e: React.DragEvent) => {
        setIsDraging(true)
        e.dataTransfer.setData("text/plain", rectangle.id)
        setMouseOffset({
            x: (e.clientX/pageSize.width) - rectangle.x,
            y: (e.clientY/pageSize.height) - rectangle.y
        })
    }
    const handleOnDragEnd = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDraging(false)
    }
    const style = useMemo(() => getRectangleStyle(rectangle, isDragging), [rectangle, isDragging])

    return (
        <div
            style={style}
            onDragStart={handleDragStart}
            className={styles['rectangle']}
            draggable
            onDragEnd={handleOnDragEnd}
        />
    )
}