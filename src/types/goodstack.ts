import { Good } from "../models/good.js";

/**
 * Represents a stack of goods
 * @example
 * ```typescript
 * const goodStack: GoodStack = [good, 5];
 * ``` 
 */
export type GoodStack = [Good, number];