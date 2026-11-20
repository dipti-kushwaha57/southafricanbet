import { Archive } from './ArchiveBlock/config'
import { CallToAction } from './CallToAction/config'
import { Content } from './Content/config'
import { Faq } from './Faq/config'
import { FeatureGrid } from './FeatureGrid/config'
import { FlexibleColumns } from './FlexibleColumns/config'
import { FormBlock } from './Form/config'
import { LegalSections } from './LegalSections/config'
import { LicensingBlock } from './LicensingBlock/config'
import { MediaBlock } from './MediaBlock/config'
import { PostsBlock } from './PostsBlock/config'
import { ReviewBonus } from './ReviewBonus/config'
import { ReviewBoost } from './ReviewBoost/config'
import { ReviewCards } from './ReviewCards/config'
import { ReviewCompare } from './ReviewCompare/config'
import { ReviewFactGrid } from './ReviewFactGrid/config'
import { ReviewFaq } from './ReviewFaq/config'
import { ReviewOddsTable } from './ReviewOddsTable/config'
import { ReviewPayments } from './ReviewPayments/config'
import { ReviewProsCons } from './ReviewProsCons/config'
import { ReviewScoreboard } from './ReviewScoreboard/config'
import { ReviewShowcase } from './ReviewShowcase/config'
import { ReviewSpotlight } from './ReviewSpotlight/config'
import { ReviewSplit } from './ReviewSplit/config'
import { ReviewSteps } from './ReviewSteps/config'
import { ReviewTabsGallery } from './ReviewTabsGallery/config'
import { ReviewVerdict } from './ReviewVerdict/config'
import { ReviewsBlock } from './ReviewsBlock/config'
import { TeamSpotlight } from './TeamSpotlight/config'

/** The homepage/general-purpose page sections (originally only on `Pages.layout`). */
export const PAGE_SECTION_BLOCKS = [
  CallToAction,
  Content,
  MediaBlock,
  Archive,
  FormBlock,
  FlexibleColumns,
  ReviewsBlock,
  PostsBlock,
  FeatureGrid,
  LicensingBlock,
  Faq,
  TeamSpotlight,
  LegalSections,
]

/** The review-page sections (originally only on `Reviews.layout`). */
export const REVIEW_SECTION_BLOCKS = [
  ReviewScoreboard,
  ReviewFactGrid,
  ReviewProsCons,
  ReviewSplit,
  ReviewBonus,
  ReviewBoost,
  ReviewCards,
  ReviewSpotlight,
  ReviewSteps,
  ReviewTabsGallery,
  ReviewShowcase,
  ReviewOddsTable,
  ReviewPayments,
  ReviewCompare,
  ReviewVerdict,
  ReviewFaq,
]

/** Every section block in the project, shared by every collection's `layout` field so any
 *  page type can use any section - add a block here once and it's available everywhere. */
export const ALL_SECTION_BLOCKS = [...PAGE_SECTION_BLOCKS, ...REVIEW_SECTION_BLOCKS]
