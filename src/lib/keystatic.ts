import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

// Reads the YAML content under content/ (edited at /keystatic). Server-only.
export const reader = createReader(process.cwd(), config);

// Keystatic's text fields read back as "" when left empty; treat that as unset.
export const optional = (s: string | null | undefined) => s || undefined;
