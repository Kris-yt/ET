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
  const containerRef = useRef<T | null>(null)
  const lastObserverRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => doQuery(querys), [])

  useEffect(() => {
    if (!data || querySize >= amountOfDataSize) return

    const observer = new IntersectionObserver(handleLastObserver, {
      threshold: 0.5,
    })

    lastObserverRef.current = observer

    const rows = containerRef.current?.children
    if (rows?.length) {
      lastObserverRef.current?.observe(rows[rows.length - 1])
    }

    return () => {
      observer.disconnect()
      lastObserverRef.current = null
    }
  }, [JSON.stringify(data)])

  const handleLastObserver = (entries: IntersectionObserverEntry[]) => {
    if (querySize >= amountOfDataSize) return
    const target = entries[0]
    if (target.isIntersecting) {
      lastObserverRef.current?.disconnect()
      onLoadMore()
    }
  }
  const updateDoQuery = (updates: Record<string, any>) => {
    containerRef.current?.scrollIntoView({ block: 'start' })
    doQuery({ ...querys, ...updates, pageNo: 1 })
  }

  return {
    containerRef,
    updateDoQuery,
  }
}
