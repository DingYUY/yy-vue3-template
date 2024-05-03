/* FileType */
declare namespace File {
  type ImageMimeType =
    | 'image/apng'
    | 'image/bmp'
    | 'image/gif'
    | 'image/jpeg'
    | 'image/pjpeg'
    | 'image/png'
    | 'image/svg+xml'
    | 'image/tiff'
    | 'image/webp'
    | 'image/x-icon'

  type ExcelMimeType =
    | 'application/vnd.ms-excel'
    | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}

/* Vite */
declare type Recordable<T = any> = Record<string, T>

interface ImportMetaEnv extends ViteEnv {
  __: unknown
}

declare interface LabelValueOption<T = any> {
  label: string
  value: T
  [key: string]: any
}

declare type LabelValueOptions<T = any> = LabelValueOption<T>[]

declare type StatusMap<T extends string | number> = Record<T, LabelValueOption<T>>

declare type ElementPlusInfoType = import('element-plus').TagProps['type']

declare interface EnumProps<T extends string | number | boolean | any[]> extends LabelValueOption {
  disabled?: boolean // 是否禁用此选项
  tagType?: ElementPlusInfoType | null | '' // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps<T>[] // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any
}

declare type Fn<T = any, U = void> = (...args: T) => U
declare type AnyFn<T = any, U = any> = (...args: T) => U

declare type Nullable<T> = T | null

declare type Arraylable<T> = T[] | T
