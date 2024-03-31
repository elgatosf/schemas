import Ajv, { type ErrorObject } from "ajv";
import { join } from "node:path";
import { keywordDefinitions } from "../src/index";

/**
 * Validates the specified manifest file; when the version is specified the `Software.MinimumVersion` is updated.
 * @param filename Name of the manifest file.
 * @param version Optional software minimum version to apply prior to validating.
 * @returns Collection of errors as the result of validation.
 */
export function validateStreamDeckPluginManifest(filename: string, version?: string): ErrorObject<string, Record<string, unknown>, unknown>[] {
	const schema = JSON.parse(getFileContents("../streamdeck/plugins/manifest.json"));
	const validate = new Ajv()
		.addKeyword(keywordDefinitions.errorMessage)
		.addKeyword(keywordDefinitions.filePath)
		.addKeyword(keywordDefinitions.imageDimensions)
		.addKeyword(keywordDefinitions.markdownDescription)
		.compile(schema);

	const manifest = JSON.parse(getFileContents(join(`../src/streamdeck/plugins/manifest/__tests__/files/${filename}`)));
	if (version) {
		manifest.Software.MinimumVersion = version;
	}

	validate(manifest);
	return validate.errors ?? [];
}

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Gets the file contents from the specified path relative to the tests folder.
 * @param relativePath Path to the file, relative to the tests folder.
 * @returns The file contents.
 */
function getFileContents(relativePath: string): string {
	const path = resolve(__dirname, relativePath);
	if (!existsSync(path)) {
		console.log(path);
		throw new Error(`File not found: ${path}`);
	}

	return readFileSync(path, { encoding: "utf-8" });
}
