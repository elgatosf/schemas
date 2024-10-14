import { validateStreamDeckPluginManifest } from "@tests";

describe.each(["6.6" as const, "6.7" as const, "6.8" as const])("v%s", (version) => {
	/**
	 * Asserts the full manifest.
	 */
	test("full manifest", () => {
		// Arrange, act, assert.
		const errors = validateStreamDeckPluginManifest(`v${version}.json`);
		expect(errors).toHaveLength(0);
	});

	/**
	 * Asserts more than 2 states are allowed.
	 */
	test("Actions[].States[] allow more than 2 items", () => {
		// Arrange, act, assert.
		const errors = validateStreamDeckPluginManifest(`v${version}.json`, (m) => {
			m.Actions[0].States.push({ Image: "imgs/two" });
			m.Actions[0].States.push({ Image: "imgs/three" });
			m.Actions[0].States.push({ Image: "imgs/four" });
		});
		expect(errors).toHaveLength(0);
	});

	describe(`v${version} feature compatibility`, () => {
		/**
		 * Asserts `Actions[].OS` is not valid for a v6.5 manifest.
		 */
		test("Actions[].OS is valid", () => {
			// Arrange, act, assert.
			const errors = validateStreamDeckPluginManifest("Actions[].OS.json", (m) => (m.Software.MinimumVersion = version));
			expect(errors).toHaveLength(0);
		});

		/**
		 * Asserts `Profiles[].AutoInstall` is not valid for a v6.5 manifest.
		 */
		test("Profiles[].AutoInstall is valid", () => {
			// Arrange, act, assert.
			const errors = validateStreamDeckPluginManifest("Profiles[].AutoInstall.json", (m) => (m.Software.MinimumVersion = version));
			expect(errors).toHaveLength(0);
		});
	});
});
