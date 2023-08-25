export type KeysHasSameValueInObject<
  Obj extends Partial<Record<KeyType, unknown>>,
  Value,
  KeyType extends string | number | symbol = string
> = {
  [K in keyof Obj]: Obj[K] extends Value
    ? K extends KeyType
      ? K
      : never
    : never;
}[keyof Obj];

export type RemoveKeysByValue<
  Obj extends Partial<Record<KeyType, unknown>>,
  Value,
  KeyType extends string | number | symbol = string
> = {
  [K in keyof Obj]: Obj[K] extends Value
    ? undefined
    : K extends KeyType
    ? Obj[K]
    : never;
};
