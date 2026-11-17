'use client'
import React, { useEffect, useRef } from 'react'

import type { Review } from '@/payload-types'

import { CmsImg } from '@/components/CmsImg'

type PaymentMethod = NonNullable<Review['paymentMethods']>[number]

const AUTO_SCROLL_PX_PER_SECOND = 24
const DESKTOP_BREAKPOINT = '(min-width: 768px)'

/** Auto-scrolling, drag-to-pause-and-resume row of payment method icons (mobile only, below
 *  768px; the CSS at 768px+ switches this back to a static wrapped row and the JS below steps aside). */
export const PaymentsSlider: React.FC<{ payments: PaymentMethod[] }> = ({ payments }) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const groupWidthRef = useRef(0)
  const draggingRef = useRef(false)
  const startXRef = useRef(0)
  const startPosRef = useRef(0)
  const isDesktopRef = useRef(false)

  const applyTransform = () => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-posRef.current}px)`
    }
  }

  const normalizePos = () => {
    const width = groupWidthRef.current
    if (width > 0) posRef.current = ((posRef.current % width) + width) % width
  }

  useEffect(() => {
    const measure = () => {
      groupWidthRef.current = groupRef.current?.scrollWidth || 0
    }
    measure()

    const mql = window.matchMedia(DESKTOP_BREAKPOINT)
    const syncDesktop = () => {
      isDesktopRef.current = mql.matches
      if (mql.matches && trackRef.current) trackRef.current.style.transform = ''
    }
    syncDesktop()
    mql.addEventListener('change', syncDesktop)

    const onResize = () => measure()
    window.addEventListener('resize', onResize)

    let lastTime: number | null = null
    let rafId: number

    const tick = (time: number) => {
      if (lastTime === null) lastTime = time
      const dt = (time - lastTime) / 1000
      lastTime = time

      if (!isDesktopRef.current && !draggingRef.current) {
        posRef.current += AUTO_SCROLL_PX_PER_SECOND * dt
        normalizePos()
        applyTransform()
      }

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      mql.removeEventListener('change', syncDesktop)
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isDesktopRef.current) return
    draggingRef.current = true
    startXRef.current = event.clientX
    startPosRef.current = posRef.current
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    posRef.current = startPosRef.current - (event.clientX - startXRef.current)
    normalizePos()
    applyTransform()
  }

  const endDrag = () => {
    draggingRef.current = false
  }

  return (
    <div
      aria-label="Accepted payment methods"
      className="detailed-list-payments"
      onPointerCancel={endDrag}
      onPointerDown={onPointerDown}
      onPointerLeave={endDrag}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
    >
      <div className="detailed-list-payments-track" ref={trackRef}>
        <div className="detailed-list-payments-group" ref={groupRef}>
          {payments.map((method, i) => (
            <CmsImg
              alt={method.name}
              className="detailed-list-payment-icon"
              key={method.id ?? i}
              resource={method.icon}
              title={method.name}
            />
          ))}
        </div>
        <div aria-hidden="true" className="detailed-list-payments-group">
          {payments.map((method, i) => (
            <CmsImg
              alt={method.name}
              className="detailed-list-payment-icon"
              key={`clone-${method.id ?? i}`}
              resource={method.icon}
              title={method.name}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
