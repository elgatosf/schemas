import { validateStreamDeckPluginManifest } from "@tests";

describe("6.9", () => {
	/**
	 * Asserts the full manifest.
	 */
	test("full manifest", () => {
		// Arrange, act, assert.
		const errors = validateStreamDeckPluginManifest(`v6.9.json`);
		expect(errors).toHaveLength(0);
	});

	describe("SDKVersion", () => {
		describe("in Stream Deck 6.9", () => {
			/**
			 * Asserts the `SDKVersion` can be `2` in Stream Deck `6.9`.
			 */
			test("can be 2", () => {
				const errors = validateStreamDeckPluginManifest("v6.9.json", (m) => (m.SDKVersion = 2));
				expect(errors).toHaveLength(0);
			});

			/**
			 * Asserts the `SDKVersion` can be `3` in Stream Deck `6.9`.
			 */
			test("can be 3", () => {
				const errors = validateStreamDeckPluginManifest("v6.9.json", (m) => (m.SDKVersion = 3));
				expect(errors).toHaveLength(0);
			});

			/**
			 * Asserts the `SDKVersion` is within scope in Stream Deck `6.9`.
			 */
			test("cannot be 4 in 6.9", () => {
				const errors = validateStreamDeckPluginManifest("v6.9.json", (m) => {
					// @ts-expect-error: To test invalid values for 6.9
					m.SDKVersion = 4;
				});

				expect(errors).toHaveError({
					keyword: "enum",
					instancePath: "/SDKVersion",
					params: {
						allowedValues: [2, 3]
					}
				});
			});
		});

		describe("in Stream Deck 6.8", () => {
			/**
			 * Asserts the `SDKVersion` can be `2` in Stream Deck `6.8`.
			 */
			it("can be 2", () => {
				const errors = validateStreamDeckPluginManifest("v6.8.json", (m) => {
					m.SDKVersion = 2;
				});

				expect(errors).toHaveLength(0);
			});

			/**
			 * Asserts the `SDKVersion` cannot be `3` in Stream Deck `6.8`.
			 */
			it("cannot be 3", () => {
				const errors = validateStreamDeckPluginManifest("v6.9.json", (m) => {
					m.Software.MinimumVersion = "6.8";
					m.SDKVersion = 3;
				});

				expect(errors).toHaveError({
					keyword: "const",
					instancePath: "/SDKVersion",
					params: {
						allowedValue: 2
					}
				});
			});
		});
	});
});
