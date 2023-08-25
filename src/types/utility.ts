export type KeysHasSameValueInObject<
  Obj extends Record<KeyType, unknown>,
  Value,
  KeyType extends string | number | symbol = string
> = {
  [K in keyof Obj]: Obj[K] extends Value
    ? K extends KeyType
      ? K
      : never
    : never;
}[keyof Obj];
