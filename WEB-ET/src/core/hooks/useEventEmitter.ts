/*
 * @Date: 2024-08-06 15:37:29
 * @FilePath: /AS-WEB-3.5/src/core/hooks/useEventEmitter.ts
 * @Description:
 */
import { useEffect } from 'react'
import { useUnmount } from 'react-use'
import type { TMittEvent, TMittEventValue } from '@services/event-mitt/types'

export default function useEventMitt<T extends TMittEvent, K>(
  mittName: T,
  on?: (data: TMittEventValue<T>, others?: K) => void,
) {
  const { emit, off, start } = Emitter(mittName, on)

  useEffect(() => {
    start()
  }, [])

  useUnmount(() => {
    if (on) {
      off()
    }
  })

  return {
    emit,
    off,
  }
}
