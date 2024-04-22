import { validateStreamDeckPluginManifest } from "@tests";

const VERSION = "6.6";

describe("v6.6", () => {
	/**
	 * Asserts a valid v6.6 manifest.
	 */
	test("full manifest", () => {
		// Arrange, act, assert.
		const errors = validateStreamDeckPluginManifest("v6.6.json");
		expect(errors).toHaveLength(0);
	});

	/**
	 * Asserts more than 2 states are allowed.
	 */
	test("allow more than 2 states", () => {
		// Arrange, act, assert.
		const errors = validateStreamDeckPluginManifest("v6.6.json", (m) => {
			m.Actions[0].States.push({ Image: "imgs/two" });
			m.Actions[0].States.push({ Image: "imgs/three" });
			m.Actions[0].States.push({ Image: "imgs/four" });
		});
		expect(errors).toHaveLength(0);
	});

	describe("v6.6 features", () => {
		/**
		 * Asserts `Actions[].OS` is not valid for a v6.5 manifest.
		 */
		test("Actions[].OS is valid", () => {
			// Arrange, act, assert.
			const errors = validateStreamDeckPluginManifest("Actions[].OS.json", (m) => (m.Software.MinimumVersion = VERSION));
			expect(errors).toHaveLength(0);
		});

		/**
		 * Asserts `Profiles[].AutoInstall` is not valid for a v6.5 manifest.
		 */
		test("Profiles[].AutoInstall is valid", () => {
			// Arrange, act, assert.
			const errors = validateStreamDeckPluginManifest("Profiles[].AutoInstall.json", (m) => (m.Software.MinimumVersion = VERSION));
			expect(errors).toHaveLength(0);
		});
	});
});
