import { validateStreamDeckPluginManifest } from "@tests";

describe("v6.4", () => {
	/**
	 * Asserts a valid v6.4 manifest.
	 */
	test("full manifest", () => {
		// Arrange, act, assert.
		const errors = validateStreamDeckPluginManifest("v6.4.json");
		expect(errors).toHaveLength(0);
	});

	describe("v6.6", () => {
		/**
		 * Asserts `Actions[].OS` is not valid for a v6.4 manifest.
		 */
		test("Actions[].OS is not valid", () => {
			// Arrange, act, assert.
			const errors = validateStreamDeckPluginManifest("actions[].os.json", "6.4");
			expect(errors).toHaveError({
				instancePath: "/Actions/0",
				keyword: "additionalProperties",
				property: "OS"
			});
		});

		/**
		 * Asserts `Profiles[].AutoInstall` is not valid for a v6.4 manifest.
		 */
		test("Profiles[].AutoInstall is not valid", () => {
			// Arrange, act, assert.
			const errors = validateStreamDeckPluginManifest("Profiles[].AutoInstall.json", "6.4");
			expect(errors).toHaveError({
				instancePath: "/Profiles/0",
				keyword: "additionalProperties",
				property: "AutoInstall"
			});
		});
	});
});
