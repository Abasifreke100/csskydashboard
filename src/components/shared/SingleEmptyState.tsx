import  { ReactNode } from 'react'
import { LayoutProps } from '../../models/shared'

export interface SingleEmptyStateProps extends LayoutProps {
  emptyState: ReactNode
  data: number | undefined
}

export const SingleEmptyState = ({
  children,
  emptyState,
  data,
}: SingleEmptyStateProps) => {
  if (data) return <>{children}</>

  return emptyState
}
