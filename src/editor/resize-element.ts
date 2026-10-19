import type { BaseElement } from '../types'

export type ResizeHandle = 'nw' | 'ne' | 'sw' | 'se'

export const getResizePatch = (
  element: Pick<BaseElement, 'x' | 'width'>,
  deltaX: number,
  handle: ResizeHandle,
): Pick<BaseElement, 'x' | 'width'> => {
  const isLeftHandle = handle.endsWith('w')
  const requestedWidth = element.width + (isLeftHandle ? -deltaX : deltaX)
  const width = Math.min(140, Math.max(8, requestedWidth))

  return {
    x: isLeftHandle ? element.x + element.width - width : element.x,
    width,
  }
}

/** Keeps the bottom edge fixed when a top handle changes the element's height. */
export const getNorthResizeY = (
  startY: number,
  startHeightPercent: number,
  nextHeightPercent: number,
): number => startY + startHeightPercent - nextHeightPercent
