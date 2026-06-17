// Typography.types.ts
import type { PropsWithChildren, ElementType } from "react"

export type TypoVariant =
    "h1" |
    "h2" |
    "h3" |
    "caption" |
    "body1" |
    "label1" 

export interface TypographyProps extends PropsWithChildren {
    variant: TypoVariant
    as?: ElementType
}