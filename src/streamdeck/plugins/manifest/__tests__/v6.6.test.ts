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

	/**
	 * Asserts `Actions[].OS` is valid for a v6.6 manifest.
	 */
	test("Actions[].OS is valid", () => {
		// Arrange, act, assert.
		const errors = validateStreamDeckPluginManifest("actions[].os.json", "6.6");
		expect(errors).toHaveLength(0);
	});
});
