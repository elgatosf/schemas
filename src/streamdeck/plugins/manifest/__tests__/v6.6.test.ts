import { validateStreamDeckPluginManifest } from "@tests";

describe("v6.6", () => {
	/**
	 * Asserts a valid v6.6 manifest.
	 */
	test("full manifest", () => {
		// Arrange, act, assert.
		const errors = validateStreamDeckPluginManifest("v6.6.json");
		expect(errors).toHaveLength(0);
	});

	describe("v6.6 features", () => {
		/**
		 * Asserts `Actions[].OS` is not valid for a v6.5 manifest.
		 */
		test("Actions[].OS is valid", () => {
			// Arrange, act, assert.
			const errors = validateStreamDeckPluginManifest("Actions[].OS.json", "6.6");
			expect(errors).toHaveLength(0);
		});

		/**
		 * Asserts `Profiles[].AutoInstall` is not valid for a v6.5 manifest.
		 */
		test("Profiles[].AutoInstall is valid", () => {
			// Arrange, act, assert.
			const errors = validateStreamDeckPluginManifest("Profiles[].AutoInstall.json", "6.6");
			expect(errors).toHaveLength(0);
		});
	});
});
