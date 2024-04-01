import type { Manifest_6_4 } from "./versions/v6.4";
import type { Manifest_6_5 } from "./versions/v6.5";
import type { Manifest_6_6 } from "./versions/v6.6";

/**
 * Defines the plugin and available actions, and all information associated with them, including the plugin's entry point, all iconography, action default behavior, etc.
 */
export type Manifest = Manifest_6_4 | Manifest_6_5 | Manifest_6_6;

export { Controller } from "./latest";
