/*
 * @Date: 2024-08-06 11:51:53
 * @FilePath: /AS-WEB-3.5/src/core/utlis/singleton.ts
 * @Description:
 */
interface InstanceMap<T> {
  [key: string]: T
}

export default class Singleton {
  private static instanceMap: InstanceMap<any> = {}

  static getInstance<T>(className: string, constructor: new () => T): T {
    const instance = Singleton.instanceMap[className]
    if (instance) {
      return instance
    }
    const newInstance = new constructor()
    Singleton.instanceMap[className] = newInstance
    return newInstance
  }
}
