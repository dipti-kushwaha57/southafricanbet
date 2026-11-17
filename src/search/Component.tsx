'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Search as SearchIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter, useSearchParams } from 'next/navigation'

export const Search: React.FC = () => {
  const searchParams = useSearchParams()
  const currentQuery = searchParams.get('q') ?? ''
  const [value, setValue] = useState(currentQuery)
  const router = useRouter()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    // Only navigate when the typed value differs from what the URL already has.
    if (debouncedValue === currentQuery) return
    router.push(`/search${debouncedValue ? `?q=${encodeURIComponent(debouncedValue)}` : ''}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, router])

  return (
    <form
      className="search-page-field-form"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <Label className="sr-only" htmlFor="search">
        Search
      </Label>
      <div className="search-page-field-wrap">
        <SearchIcon aria-hidden="true" className="search-page-field-icon" />
        <Input
          autoComplete="off"
          className="search-page-field"
          id="search"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Search news, reviews and bonuses..."
          value={value}
        />
        <button aria-label="Search" className="search-page-field-submit" type="submit">
          <SearchIcon aria-hidden="true" className="search-page-field-submit-icon" />
        </button>
      </div>
    </form>
  )
}
