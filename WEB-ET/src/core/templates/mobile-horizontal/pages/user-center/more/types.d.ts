export interface MoreItemProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string
  rightIcon?: boolean | React.ReactNode
  onTouchEnd?: () => void
}
