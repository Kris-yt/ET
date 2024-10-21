/*
 * @Date: 2024-08-10 11:06:51
 * @FilePath: /AS-WEB-3.5/src/core/types/utils.d.ts
 * @Description:
 */
type MakeRequiredOptional<T> = {
  [P in keyof T]-?: T[P]
}

type PartialRequired<T> = {
  [P in keyof T]?: T[P]
}

export type ToPartial<T> = PartialRequired<MakeRequiredOptional<T>>
