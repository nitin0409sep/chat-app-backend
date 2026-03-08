# Biome Configuration Guide

Complete reference for every setting in our `biome.json`.

---

## `$schema`

```json
"$schema": "https://biomejs.dev/schemas/2.4.6/schema.json"
```

Points to the JSON schema for Biome v2.4.6. Gives you **autocompletion and validation** in your editor — if you type a wrong key, your editor will underline it red.

---

## `vcs` — Version Control System

```json
"vcs": {
  "enabled": true,
  "clientKind": "git",
  "useIgnoreFile": true,
  "defaultBranch": "dev"
}
```

| Key              | Value  | What it does                                                                                                  |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| `enabled`        | `true` | Tells Biome to integrate with your VCS.                                                                       |
| `clientKind`     | `git`  | Specifies you're using Git (the only supported option currently).                                             |
| `useIgnoreFile`  | `true` | Biome respects your `.gitignore`. Anything in `.gitignore` (like `node_modules`, `.env`) is auto-skipped.     |
| `defaultBranch`  | `dev`  | Used when running `biome check --changed` — diffs against this branch to only lint/format changed files.      |

---

## `files` — File Handling

```json
"files": {
  "ignoreUnknown": true,
  "includes": ["**", "!dist", "!build", "!node_modules", "!generated", "!prisma/generated"]
}
```

| Key              | Value                        | What it does                                                                                     |
| ---------------- | ---------------------------- | ------------------------------------------------------------------------------------------------ |
| `ignoreUnknown`  | `true`                       | Silently skips file types Biome doesn't understand (`.png`, `.md`, etc.) instead of erroring.    |
| `includes`       | glob patterns                | Defines which files Biome processes. `**` = include everything, `!prefix` = exclude that path.   |

**Excluded paths:**

- `!dist`, `!build` — Compiled output folders.
- `!node_modules` — Dependencies (also ignored by default, but explicit is good).
- `!generated`, `!prisma/generated` — Prisma auto-generated client code. Never lint machine-generated files.

---

## `formatter` — Global Formatting Rules

```json
"formatter": {
  "enabled": true,
  "indentStyle": "space",
  "indentWidth": 2,
  "lineWidth": 100,
  "lineEnding": "lf",
  "attributePosition": "auto"
}
```

| Key                  | Value    | What it does                                                                                                       |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `enabled`            | `true`   | Formatting is on.                                                                                                  |
| `indentStyle`        | `space`  | Uses spaces, not tabs. Industry standard for Node.js/TypeScript.                                                   |
| `indentWidth`        | `2`      | 2 spaces per indent level. The Node.js community convention.                                                       |
| `lineWidth`          | `100`    | Max line length before wrapping. 80 is too narrow, 120 is too wide for split views. 100 is the sweet spot.         |
| `lineEnding`         | `lf`     | Forces Unix-style line endings (`\n`). Prevents cross-platform issues with Windows `\r\n`.                         |
| `attributePosition`  | `auto`   | Lets Biome decide whether HTML/JSX attributes go on same line or wrap.                                             |

---

## `linter` — Lint Rules

```json
"enabled": true,
"rules": { "recommended": true, ... }
```

- `recommended: true` enables Biome's curated set of ~200 rules — catches common bugs, bad patterns, and code smells.
- Individual rules below **override** the recommended defaults.

---

### `complexity`

| Rule                            | Level   | What it catches                                                                                                    |
| ------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| `noForEach`                     | `warn`  | Nudges toward `for...of` loops. They're faster, support `break`/`continue`/`await`, and are more readable.         |
| `noUselessConstructor`          | `error` | Blocks empty constructors like `constructor() { super(); }`. Dead code.                                           |
| `useSimplifiedLogicExpression`  | `warn`  | Suggests simplifying logic like `!!x` to `Boolean(x)`, or `a && a` to just `a`.                                   |

---

### `correctness`

| Rule                          | Level   | What it catches                                                                                                       |
| ----------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `noUnusedVariables`           | `error` | Dead variables = errors. Keeps code clean, signals bugs early (renamed but forgot to update a reference).             |
| `noUnusedImports`             | `error` | Unused imports bloat your bundle and clutter files. Combined with `organizeImports`, keeps imports pristine.           |
| `useExhaustiveDependencies`   | `off`   | React hooks rule (checks `useEffect` deps). Turned **off** because this is a backend project — no React.             |

---

### `performance`

| Rule                      | Level   | What it catches                                                                                                                  |
| ------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `noDelete`                | `warn`  | `delete` operator deoptimizes V8's hidden classes. Suggests `{ unused, ...rest } = obj` destructuring instead.                   |
| `noAccumulatingSpread`    | `error` | Catches `arr.reduce((acc, x) => ({ ...acc, [x]: true }), {})`. Each iteration copies everything — O(n²). Use `Object.fromEntries()` or a `for` loop. |

---

### `style`

| Rule                        | Level   | What it catches                                                                                                          |
| --------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `noNonNullAssertion`        | `warn`  | Discourages `variable!` (the `!` postfix). Bypasses the type system. Use proper null checks instead.                     |
| `useConst`                  | `error` | If a variable is never reassigned, it must be `const`, not `let`. Communicates intent.                                   |
| `useImportType`             | `error` | Forces `import type { Foo }` for type-only imports. Erased at compile time = smaller bundles, faster builds.             |
| `useNodejsImportProtocol`   | `error` | Forces `import fs from "node:fs"` instead of `"fs"`. The `node:` prefix makes built-ins explicit. Modern best practice. |
| `useTemplate`               | `error` | Forces template literals `` `Hello ${name}` `` instead of `"Hello " + name`. More readable.                             |
| `noParameterAssign`         | `error` | Blocks reassigning function parameters. Prevents unexpected mutation and makes code easier to reason about.              |

---

### `suspicious`

| Rule                       | Level   | What it catches                                                                                                             |
| -------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `noExplicitAny`            | `warn`  | Discourages `any` type. Use `unknown` if you truly don't know the type. Warning because early-stage code sometimes needs it.|
| `noConsole`                | `warn`  | Warns on `console.log`. In production, use a proper logger (`winston`, `pino`). Reminder to clean up before committing.     |
| `noEmptyBlockStatements`   | `error` | Catches empty `catch {}`, `if () {}`, etc. Usually forgotten implementation or swallowed errors.                            |

---

### `security`

| Rule                          | Level   | What it catches                                                                                         |
| ----------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `noDangerouslySetInnerHtml`   | `error` | Blocks `dangerouslySetInnerHTML` — an XSS vulnerability. Safeguard if you ever render HTML.             |

---

## `javascript.formatter` — JS/TS Specific Formatting

```json
"javascript": {
  "formatter": {
    "quoteStyle": "double",
    "trailingCommas": "all",
    "semicolons": "always",
    "arrowParentheses": "always",
    "bracketSpacing": true,
    "bracketSameLine": false
  }
}
```

| Key                  | Value      | What it does                                                                                                  |
| -------------------- | ---------- | ------------------------------------------------------------------------------------------------------------- |
| `quoteStyle`         | `double`   | Uses `"double quotes"`. Consistent with JSON and most TypeScript codebases.                                   |
| `trailingCommas`     | `all`      | Adds trailing commas everywhere legal `[1, 2,]`. Makes git diffs cleaner — adding an item = 1 changed line.  |
| `semicolons`         | `always`   | Always use semicolons. Avoids ASI (Automatic Semicolon Insertion) gotchas that cause subtle bugs.             |
| `arrowParentheses`   | `always`   | Always wrap arrow params: `(x) => x` not `x => x`. Consistent and easier to add parameters.                  |
| `bracketSpacing`     | `true`     | Spaces inside object braces: `{ foo: bar }` not `{foo: bar}`. More readable.                                 |
| `bracketSameLine`    | `false`    | Closing `>` of multi-line JSX goes on its own line.                                                           |

---

## `assist` — Auto-Fix Actions

```json
"assist": {
  "enabled": true,
  "actions": {
    "source": {
      "organizeImports": "on"
    }
  }
}
```

| Key                | Value  | What it does                                                                                          |
| ------------------ | ------ | ----------------------------------------------------------------------------------------------------- |
| `enabled`          | `true` | Enables Biome's auto-fix/assist feature.                                                              |
| `organizeImports`  | `on`   | Auto-sorts and groups imports alphabetically and by type. Works on save in VSCode with Biome extension.|

---

## Available Scripts

| Script            | Command                      | What it does                                      |
| ----------------- | ---------------------------- | ------------------------------------------------- |
| `pnpm lint`       | `biome check .`              | Checks all files for lint + format issues.        |
| `pnpm lint:fix`   | `biome check --write .`      | Auto-fixes all fixable lint + format issues.      |
| `pnpm format`     | `biome format --write .`     | Only formats files (no linting).                  |

---

## Rule Severity Levels

| Level   | Meaning                                                        |
| ------- | -------------------------------------------------------------- |
| `error` | Fails the check. Must be fixed. Blocks CI.                    |
| `warn`  | Shows a warning. Doesn't fail the check. Nudges best practice.|
| `off`   | Rule is completely disabled.                                   |
