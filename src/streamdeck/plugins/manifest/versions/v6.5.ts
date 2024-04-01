import type { ElementOf } from "../../../../utils";
import type { Manifest_6_6 } from "./v6.6";

/**
 * Defines the plugin and available actions, and all information associated with them, including the plugin's entry point, all iconography, action default behavior, etc.
 */
export type Manifest_6_5 = Omit<Manifest_6_6, "Actions" | "Software"> & {
	/**
	 * Collection of actions provided by the plugin, and all of their information; this can include actions that are available to user's via the actions list, and actions that are
	 * hidden to the user but available to pre-defined profiles distributed with the plugin (`Manifest.Actions.VisibleInActionsList`).
	 */
	Actions: Omit<ElementOf<Manifest_6_6["Actions"]>, "OS">[];

	/**
	 * Determines the Stream Deck software requirements for this plugin.
	 */
	Software: {
		/**
		 * Minimum version of the Stream Deck application required for this plugin to run.
		 */
		MinimumVersion: "6.5";
	};
};
