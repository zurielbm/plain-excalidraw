
// -----------------------------------------------------------------------------
// ------------------------ NEEDED FOR MATH -----------------------------------
type HasBrand<T> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [K in keyof T]: K extends `~brand${infer _}` ? true : never;
  }[keyof T];
  
  type RemoveAllBrands<T> = HasBrand<T> extends true
    ? {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        [K in keyof T as K extends `~brand~${infer _}` ? never : K]: T[K];
      }
    : never;
  
  // adapted from https://github.com/colinhacks/zod/discussions/1994#discussioncomment-6068940
  // currently does not cover all types (e.g. tuples, promises...)
  type Unbrand<T> = T extends Map<infer E, infer F>
    ? Map<E, F>
    : T extends Set<infer E>
    ? Set<E>
    : T extends Array<infer E>
    ? Array<E>
    : RemoveAllBrands<T>;
  
  /**
   * Makes type into a branded type, ensuring that value is assignable to
   * the base ubranded type. Optionally you can explicitly supply current value
   * type to combine both (useful for composite branded types. Make sure you
   * compose branded types which are not composite themselves.)
   */
  export const toBrandedType = <BrandedType, CurrentType = BrandedType>(
    value: Unbrand<BrandedType>,
  ) => {
    return value as CurrentType & BrandedType;
  };
  
  // -----------------------------------------------------------------------------