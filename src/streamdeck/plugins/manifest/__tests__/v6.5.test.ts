import { validateStreamDeckPluginManifest } from "@tests";

describe("v6.5", () => {
	/**
	 * Asserts a valid v6.5 manifest.
	 */
	test("full manifest", () => {
		// Arrange, act, assert.
		const errors = validateStreamDeckPluginManifest("v6.5.json");
		expect(errors).toHaveLength(0);
	});

	/**
	 * Asserts `Actions[].OS` is not valid for a v6.5 manifest.
	 */
	test("Actions[].OS is not valid", () => {
		// Arrange, act, assert.
		const errors = validateStreamDeckPluginManifest("actions[].os.json", "6.5");
		expect(errors).toHaveError({
			instancePath: "/Actions/0",
			keyword: "additionalProperties",
			property: "OS"
		});
	});
});
