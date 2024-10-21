export interface IProps {}
export interface ComponentItemProps {
  categoryName:
    | 'slot'
    | 'poker'
    | 'casino'
    | 'fishing'
    | 'bingo'
    | 'sports '
    | 'numericGame'
    | string
  isActive: boolean
  onChangeTabs: () => void
}

export interface ListItemProps {
  categoryName: string
  cateId: number
}
