/**
 * Gets the element type of the {@template ArrayType}.
 */
export type ElementOf<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
