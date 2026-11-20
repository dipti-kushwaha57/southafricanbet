import React from 'react'

import type { Page } from '@/payload-types'

import { AboutHero } from '@/heros/AboutHero'
import { BettingHero } from '@/heros/BettingHero'
import { ContactHero } from '@/heros/ContactHero'
import { HighImpactHero } from '@/heros/HighImpact'
import { LegalHero } from '@/heros/LegalHero'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'

const heroes = {
  aboutHero: AboutHero,
  bettingHero: BettingHero,
  contactHero: ContactHero,
  highImpact: HighImpactHero,
  legalHero: LegalHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
