// Claude Code PostToolUse hook: formats the file Claude just wrote or edited.
// Written in Node instead of shell so it behaves the same on macOS and Windows.
import { execSync } from "node:child_process"
import { extname } from "node:path"

// Extensions oxfmt can format; .astro is not among them (nothing formats it here).
const FORMATTABLE = new Set([
  ".js",
  ".mjs",
  ".cjs",
  ".jsx",
  ".ts",
  ".mts",
  ".cts",
  ".tsx",
  ".json",
  ".jsonc",
  ".md",
])

let raw = ""
for await (const chunk of process.stdin) raw += chunk

let file
try {
  const input = JSON.parse(raw)
  file = input.tool_response?.filePath ?? input.tool_input?.file_path
} catch {
  process.exit(0)
}
if (!file || !FORMATTABLE.has(extname(file).toLowerCase())) process.exit(0)

try {
  execSync(`pnpm exec oxfmt ${JSON.stringify(file)}`, { stdio: "ignore" })
} catch {
  // Formatting must never block the edit itself.
}
