import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Rectangle } from '../rectangle';
import { PageSize } from '../../shared/types';
import { useGetRectangles } from './useGetRectangles';
import { updateLocalStorageByRectangles } from '../../shared/store';
import styles from './Rectangles.module.css'

interface OwnProps { };

type Props = PropsWithChildren<OwnProps>

export function Rectangles(props: Props) {
  const [pageSize, setPageSize] = useState<PageSize>({ width: 0, height: 0 })
  const [rectangles, setRectangles] = useGetRectangles();
  const [mouseOffset, setMouseOffset] = useState({
    x: 0,
    y: 0
  })
  useEffect(() => {
    setPageSize({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const newRectangles = rectangles.map(rec => {
      if (rec.id === id) {
        return {
          ...rec,
          x: (e.clientX / (pageSize.width)) - mouseOffset.x,
          y: (e.clientY / (pageSize.height)) - mouseOffset.y
        }
      }
      return rec
    })
    setRectangles(newRectangles)
    updateLocalStorageByRectangles(newRectangles)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  }

  return (
    <div className={styles['rectangles']} onDragOver={handleDragOver} onDrop={handleDrop}>
      {rectangles.map((rec, index) => {
        return <Rectangle rectangle={rec} key={index} setMouseOffset={setMouseOffset} pageSize={pageSize} />
      })}
    </div>
  );
}

