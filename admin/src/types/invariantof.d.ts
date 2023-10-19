declare type InvariantOf<T> = T & InvariantBrand<T>;
declare const tag: unique symbol;
declare interface InvariantBrand<T> {
  readonly [tag]: (args: T) => T;
}
