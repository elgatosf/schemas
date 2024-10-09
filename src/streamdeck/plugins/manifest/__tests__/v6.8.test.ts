import { validateStreamDeckPluginManifest } from "@tests";

describe("v6.8", () => {
	/**
	 * Asserts a valid v6.8 manifest.
	 */
	test("full manifest", () => {
		// Arrange, act, assert.
		const errors = validateStreamDeckPluginManifest("v6.8.json");
		expect(errors).toHaveLength(0);
	});
});
