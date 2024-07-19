import { SkeletonContainer, SkeletonProps } from "./SkeletonContainer";

export interface FetchingLoadingProps extends SkeletonProps {}

export const FetchingLoading = ({
  children,
  isLoading,
  numberOfSkeleton,
  skeleton,
  contentClassName,
}: FetchingLoadingProps) => {
  return (
    <SkeletonContainer
      isLoading={isLoading}
      numberOfSkeleton={numberOfSkeleton}
      skeleton={skeleton}
      contentClassName={contentClassName}
    >
      {children}
    </SkeletonContainer>
  );
};
