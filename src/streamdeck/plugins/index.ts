import { type Layout as LayoutJsonSchema } from "./layout";

export { DeviceType } from "./device-type";
export { BarSubType, type Bar, type GBar, type Pixmap, type Text } from "./layout";
export * from "./manifest/latest";

/**
 * Defines the structure of a custom layout file.
 */
export type Layout = Omit<LayoutJsonSchema, "$schema">;
