import type { JSONSchema7 } from "json-schema";
import { get, set } from "lodash";

/**
 * Transforms the specified {@link schema} so that the layout's `items` property provides a better structure for validation.
 * @param schema Schema to transform.
 */
export function layoutItemsTransformer(schema: JSONSchema7): void {
	const itemSchemasKey = "definitions.Layout.properties.items.items.anyOf";

	const itemSchemas = get(schema as unknown, itemSchemasKey) as JSONSchema7[] | undefined;
	if (itemSchemas === undefined) {
		throw new Error(`Unrecognized structure: expected layout item definitions to be defined at "${itemSchemasKey}"`);
	} else if (!Array.isArray(itemSchemas)) {
		throw new TypeError("Expected layout item definitions to be an array");
	}

	// Get the layout item types, and assign them to the top-level definitions object.
	const defs = parseTypes(schema, itemSchemas);
	set(schema, itemSchemasKey, [generateRecursiveLayoutTypeSchema(defs)]);
}

/**
 * Parses the layout item types from the layout's items schemas; the schemas must be a `$ref` to their definition.
 * @param schema Source schema.
 * @param itemSchemas JSON schemas used by the layout to define the available layout item types.
 * @returns Layout item definitions.
 */
function parseTypes(schema: JSONSchema7, itemSchemas: JSONSchema7[]): LayoutItemDefinition[] {
	return itemSchemas.map(({ $ref: ref }: JSONSchema7) => {
		if (ref === undefined) {
			throw new TypeError("Layout item does not contain a reference to the definition");
		}

		const type = get(schema, `${ref.substring(2).replaceAll("/", ".")}.properties.type.const`);
		if (type === undefined) {
			throw new Error(`Definition not found: ${ref}`);
		}

		return { type, ref };
	});
}

/**
 * Recursively generates an if-then-else statement from the available layout item definitions.
 * @param defs Definitions that reference the layout item types.
 * @param index Current index.
 * @returns The JSON schema that references the current type definition; otherwise the next.
 */
function generateRecursiveLayoutTypeSchema(defs: LayoutItemDefinition[], index: number = 0): JSONSchema7 {
	const types = defs.map(({ type }) => type);
	const fallback: JSONSchema7 = {
		type: "object",
		additionalProperties: false,
		properties: {
			type: {
				type: "string",
				enum: types
			}
		}
	};

	return {
		if: {
			properties: {
				type: {
					const: types[index],
					enum: types
				}
			}
		},
		then: {
			$ref: defs[index].ref
		},
		else: index < defs.length - 1 ? generateRecursiveLayoutTypeSchema(defs, index + 1) : fallback
	};
}

/**
 * Layout item JSON schema definition.
 */
type LayoutItemDefinition = {
	/**
	 * Type of the layout item, parsed from the layout definition.
	 */
	type: string;

	/**
	 * Reference to the definitions.
	 */
	ref: string;
};
