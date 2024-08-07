import type { Manifest_6_7 } from "./v6.7";

/**
 * Defines the plugin and available actions, and all information associated with them, including the plugin's entry point, all iconography, action default behavior, etc.
 */
export type Manifest_6_6 = Omit<Manifest_6_7, "Software"> & {
	/**
	 * Determines the Stream Deck software requirements for this plugin.
	 */
	Software: {
		/**
		 * Minimum version of the Stream Deck application required for this plugin to run.
		 */
		MinimumVersion: "6.6";
	};
};
