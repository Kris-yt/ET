/*
 * @Date: 2024-08-06 11:51:36
 * @FilePath: /AS-WEB-3.5/src/core/services/event-mitt/index.ts
 * @Description:
 */

import singleton from '@utlis/singleton'
import mitt from 'mitt'
import type { TMittEvent, TMittEventValue } from './types'

export default function eventMitt<T extends TMittEvent, K>(
  mittName: T,
  on?: (data: TMittEventValue<T>, others?: K) => void,
) {
  let eventOn = on
  const mittInstance = singleton.getInstance('mittInstance', Mitt).getEmitter()

  return {
    emit: (data?: TMittEventValue<T>, others?: K) => {
      mittInstance.emit(mittName, data, others)
    },
    start: () => {
      if (!on) return
      eventOn = on
      mittInstance.on(mittName, on)
    },
    off: () => {
      if (!eventOn) return
      mittInstance.off(mittName, on)
    },
    updateOnCall: (on: (data: TMittEventValue<T>, others?: K) => void) => {
      mittInstance.off(mittName, eventOn)
      eventOn = on
      mittInstance.on(mittName, on)
    },
  }
}

class Mitt {
  private emitter: any

  constructor() {
    this.emitter = mitt()
  }

  public getEmitter() {
    return this.emitter
  }
}
