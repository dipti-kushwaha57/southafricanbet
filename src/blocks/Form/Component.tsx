import React from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { FormBlockClient, type FormBlockType } from './Component.client'

export const FormBlock: React.FC<{ id?: string } & FormBlockType> = async (props) => {
  const { sidebar } = props
  const needsFooterData = Boolean(sidebar?.showSocial || sidebar?.showGamblingHelp)

  const footerData = needsFooterData ? await getCachedGlobal('footer', 1)() : null

  return (
    <FormBlockClient
      {...props}
      helplineNumber={footerData?.helplineNumber}
      socialLinks={footerData?.socialLinks || []}
    />
  )
}
