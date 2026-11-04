import { chromium } from '@playwright/test'

// Usage: node scripts/dump-styles.mjs <url-path> <width> <selector1> [selector2 ...]
// Dumps getComputedStyle (a curated property set) for the first match of each selector.

const PROPS = [
  'display', 'position', 'top', 'right', 'bottom', 'left', 'zIndex',
  'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
  'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'gap', 'rowGap', 'columnGap',
  'flex', 'flexDirection', 'flexWrap', 'alignItems', 'justifyContent', 'flexGrow', 'flexShrink',
  'gridTemplateColumns', 'alignSelf',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius',
  'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderColor', 'borderStyle',
  'backgroundColor', 'backgroundImage', 'backgroundSize', 'backgroundPosition', 'backgroundRepeat',
  'boxShadow', 'opacity',
  'color', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textTransform', 'textAlign', 'textDecorationLine', 'textOverflow', 'whiteSpace',
  'transform', 'transition', 'overflow', 'overflowX', 'overflowY', 'objectFit', 'cursor', 'visibility', 'pointerEvents',
]

const [, , urlPath, widthArg, ...selectors] = process.argv
const width = Number(widthArg) || 375

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: { width, height: 1000 } })
await page.goto(`http://localhost:3000${urlPath}`, { waitUntil: 'networkidle' })

const result = {}
for (const sel of selectors) {
  const loc = page.locator(sel).first()
  const count = await page.locator(sel).count()
  if (count === 0) {
    result[sel] = { error: 'not found' }
    continue
  }
  const styles = await loc.evaluate((el, props) => {
    const cs = getComputedStyle(el)
    const out = {}
    for (const p of props) out[p] = cs[p]
    const r = el.getBoundingClientRect()
    out.__rect = { w: Math.round(r.width), h: Math.round(r.height) }
    return out
  }, PROPS)
  result[sel] = styles
}

console.log(JSON.stringify(result, null, 2))
await browser.close()
