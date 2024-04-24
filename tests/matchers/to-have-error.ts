import type { MatcherFunction } from "expect";

/**
 * Matcher function that asserts the specified error exists in the collection of errors.
 * @param actual Collection of JSON validation errors.
 * @param error Expected error.
 * @returns The matcher result.
 */
export const toHaveError: MatcherFunction<[error: AdditionalPropertyError]> = function (actual: unknown, error: JsonSchemaError) {
	if (!Array.isArray(actual)) {
		return {
			message: () => `expected ${this.utils.printReceived(actual)} to be an array`,
			pass: false
		};
	}

	for (const item of actual) {
		if (item === undefined || typeof item !== "object" || !("instancePath" in item) || !("keyword" in item)) {
			return {
				message: () => `expected ${this.utils.printReceived(actual)} to be a collection of JSON schema error object`,
				pass: false
			};
		}

		// keyword or instancePath differ.
		if (item.keyword !== error.keyword || item.instancePath !== error.instancePath) {
			continue;
		}

		// When keyword is params do not match the error, continue.
		if (error.keyword === "additionalProperties" && item.params.additionalProperty !== error.property) {
			continue;
		} else if (error.keyword === "pattern" && item.params.pattern !== error.pattern) {
			return {
				message: () => `expected ${this.utils.printReceived(item.params.pattern)} to be ${this.utils.printExpected(error.pattern)}`,
				pass: false
			};
		}

		// Otherwise the error was found.
		return {
			message: () => `expected ${this.utils.printReceived(item)} to be a JSON schema of keyword "additionalProperty" for ${error.instancePath}`,
			pass: true
		};
	}

	return {
		message: () => `expected ${this.utils.printReceived(actual)} to contain a JSON schema error of ${this.utils.printExpected(error)}`,
		pass: false
	};
};

/**
 * Represents a JSON error.
 */
type JsonSchemaError = AdditionalPropertyError | PatternError;

/**
 * Represents a JSON error for the keyword `additionalProperties`.
 */
type AdditionalPropertyError = {
	/**
	 * Path to the instance of the error.
	 */
	instancePath: string;

	/**
	 * Keyword of the error.
	 */
	keyword: "additionalProperties";

	/**
	 * Name of the property that should not be present.
	 */
	property: string;
};

/**
 * Represents a JSON error for the keyword `pattern`.
 */
type PatternError = {
	/**
	 * Path to the instance of the error.
	 */
	instancePath: string;

	/**
	 * Keyword of the error.
	 */
	keyword: "pattern";

	/**
	 * Expected pattern.
	 */
	pattern: string;
};

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace jest {
		interface AsymmetricMatchers {
			toHaveError(error: JsonSchemaError): void;
		}
		interface Matchers<R> {
			toHaveError(error: JsonSchemaError): R;
		}
	}
}
