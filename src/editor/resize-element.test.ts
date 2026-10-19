import { describe, expect, it } from 'vitest'
import { getNorthResizeY, getResizePatch, type ResizeHandle } from './resize-element'

describe('getResizePatch', () => {
  it.each<ResizeHandle>(['nw', 'ne', 'sw', 'se'])(
    'resizes outward and inward from the %s handle while fixing the opposite edge',
    (handle) => {
      const element = { x: 20, width: 40 }
      const isLeftHandle = handle.endsWith('w')
      const outwardDeltaX = isLeftHandle ? -10 : 10
      const inwardDeltaX = -outwardDeltaX
      const fixedEdge = isLeftHandle ? element.x + element.width : element.x
      const outward = getResizePatch(element, outwardDeltaX, handle)
      const inward = getResizePatch(element, inwardDeltaX, handle)

      expect(outward.width).toBe(50)
      expect(inward.width).toBe(30)
      expect(isLeftHandle ? outward.x + outward.width : outward.x).toBe(fixedEdge)
      expect(isLeftHandle ? inward.x + inward.width : inward.x).toBe(fixedEdge)
    },
  )

  it('keeps the opposite edge fixed when the width reaches either limit', () => {
    const element = { x: 20, width: 40 }

    expect(getResizePatch(element, 100, 'nw')).toEqual({ x: 52, width: 8 })
    expect(getResizePatch(element, -200, 'nw')).toEqual({ x: -80, width: 140 })
    expect(getResizePatch(element, -100, 'se')).toEqual({ x: 20, width: 8 })
    expect(getResizePatch(element, 200, 'se')).toEqual({ x: 20, width: 140 })
  })
})

describe('getNorthResizeY', () => {
  it('moves the top edge up when the element grows so the bottom stays fixed', () => {
    expect(getNorthResizeY(20, 30, 40)).toBe(10)
  })

  it('moves the top edge down when the element shrinks so the bottom stays fixed', () => {
    expect(getNorthResizeY(20, 30, 20)).toBe(30)
  })

  it('keeps y unchanged when the height does not change', () => {
    expect(getNorthResizeY(20, 30, 30)).toBe(20)
  })
})
