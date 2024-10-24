import { useEffect, useRef } from 'react'
import type { ToPartial } from '@/core/types/utils'
import { ICommonQuerys } from '@/core/hooks/dashboard/useBase'
interface IProps {
  data: any[] | null
  amountOfDataSize: number
  querySize?: number
  doQuery: (fields?: ToPartial<ICommonQuerys>) => void
  querys: ICommonQuerys
  onLoadMore: () => void
}

export default <T extends HTMLElement>({
  data,
  amountOfDataSize = 0,
  querySize = 10,
  doQuery,
  querys,
  onLoadMore,
}: IProps) => {
  const scrollableRef = useRef<T | null>(null)
  const containerRef = useRef<T | null>(null)
  const lastObserverRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => doQuery(querys), [])

  useEffect(() => {
    if (!data || querySize >= amountOfDataSize) return

    lastObserverRef.current = new IntersectionObserver(handleLastObserver, {
      threshold: 0.5,
    })

    const lastItem = containerRef.current?.lastElementChild
    if (lastItem) lastObserverRef.current?.observe(lastItem)

    return () => {
      lastObserverRef.current?.disconnect()
      lastObserverRef.current = null
    }
  }, [data])

  const handleLastObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0]
    if (target.isIntersecting) {
      lastObserverRef.current?.disconnect()
      onLoadMore()
    }
  }

  const updateDoQuery = (updates: Record<string, any>) => {
    scrollableRef.current?.scroll({ top: 0 })
    doQuery({ ...querys, ...updates, pageNo: 1 })
  }

  return {
    scrollableRef,
    containerRef,
    updateDoQuery,
  }
}
