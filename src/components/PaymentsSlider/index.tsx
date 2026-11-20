'use client'
import React, { useEffect, useRef } from 'react'

import type { Review } from '@/payload-types'

import { CmsImg } from '@/components/CmsImg'

type PaymentMethod = NonNullable<Review['paymentMethods']>[number]

const AUTO_SCROLL_PX_PER_SECOND = 24
const DESKTOP_BREAKPOINT = '(min-width: 768px)'

type PaymentsSliderProps = {
  payments: PaymentMethod[]
  /** Keep the auto-scrolling slider active at every width instead of switching to a static
   *  wrapped row at 768px+ (the default, used on the homepage's detailed review list). */
  alwaysActive?: boolean
  wrapClassName?: string
  trackClassName?: string
  groupClassName?: string
  iconClassName?: string
}

/** Auto-scrolling, draggable row of payment method icons that pauses on drag, hover, and
 *  keyboard focus. By default (mobile only, below 768px) the CSS at 768px+ switches this back
 *  to a static wrapped row and the JS below steps aside; pass `alwaysActive` to keep it running
 *  at every width. */
export const PaymentsSlider: React.FC<PaymentsSliderProps> = ({
  payments,
  alwaysActive = false,
  wrapClassName = 'detailed-list-payments',
  trackClassName = 'detailed-list-payments-track',
  groupClassName = 'detailed-list-payments-group',
  iconClassName = 'detailed-list-payment-icon',
}) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const groupWidthRef = useRef(0)
  const draggingRef = useRef(false)
  const pausedRef = useRef(false)
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
      isDesktopRef.current = !alwaysActive && mql.matches
      if (isDesktopRef.current && trackRef.current) trackRef.current.style.transform = ''
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

      if (!isDesktopRef.current && !draggingRef.current && !pausedRef.current) {
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

  const pause = () => {
    pausedRef.current = true
  }

  const resume = () => {
    pausedRef.current = false
  }

  return (
    <div
      aria-label="Accepted payment methods"
      className={wrapClassName}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) resume()
      }}
      onFocus={pause}
      onMouseEnter={pause}
      onMouseLeave={() => {
        resume()
        endDrag()
      }}
      onPointerCancel={endDrag}
      onPointerDown={onPointerDown}
      onPointerLeave={endDrag}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      tabIndex={0}
    >
      <div className={trackClassName} ref={trackRef}>
        <div className={groupClassName} ref={groupRef}>
          {payments.map((method, i) => (
            <CmsImg
              alt={method.name}
              className={iconClassName}
              key={method.id ?? i}
              resource={method.icon}
              title={method.name}
            />
          ))}
        </div>
        <div aria-hidden="true" className={groupClassName}>
          {payments.map((method, i) => (
            <CmsImg
              alt={method.name}
              className={iconClassName}
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
