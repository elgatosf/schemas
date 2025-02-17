import type { Manifest_6_9 } from "./v6.9";

/**
 * Defines the plugin and available actions, and all information associated with them, including the plugin's entry point, all iconography, action default behavior, etc.
 */
export type Manifest_6_6 = Omit<Manifest_6_9, "SDKVersion" | "Software"> & {
	/**
	 * Determines the Stream Deck software requirements for this plugin.
	 */
	Software: {
		/**
		 * Minimum version of the Stream Deck application required for this plugin to run.
		 */
		MinimumVersion: "6.6" | "6.7" | "6.8";
	};

	/**
	 * Preferred SDK version; this should _currently_ always be 2.
	 */
	SDKVersion: 2;
};
