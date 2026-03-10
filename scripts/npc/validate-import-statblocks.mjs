import { readFile, readdir } from "node:fs/promises"
import path from "node:path"
import { loadReferenceDataset, resolveFromCollection } from "../srd/reference-cache.mjs"

const ROOT = process.cwd()
const PEOPLE_DIR = path.join(ROOT, "content/people")
const TEMPLATE_FILE = path.join(ROOT, "content/templates/person-npc-template.md")

const COLLECTION_BY_FIELD = {
  Skills: "skills",
  "Damage Vulnerabilities": "damage-types",
  "Damage Resistances": "damage-types",
  "Damage Immunities": "damage-types",
  "Condition Immunities": "conditions",
  Languages: "languages",
}

const parseImportStatblock = (markdown) => {
  const match = markdown.match(/## Import Statblock\s+```text\n([\s\S]*?)```/)
  return match?.[1] ?? null
}

const splitList = (value) =>
  value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)

const cleanSkillLabel = (value) => value.replace(/\s*[+-]\d+$/u, "").trim()

const canonicalOrNull = ({ dataset, endpoint, value }) =>
  resolveFromCollection({ dataset, endpoint, value })?.name ?? null

const validateListField = ({ dataset, filePath, field, value, issues }) => {
  if (value === "None") return

  const endpoint = COLLECTION_BY_FIELD[field]
  const values = splitList(value)

  for (const rawEntry of values) {
    const entry = field === "Skills" ? cleanSkillLabel(rawEntry) : rawEntry
    const canonical = canonicalOrNull({ dataset, endpoint, value: entry })

    if (!canonical) continue

    if (entry !== canonical) {
      issues.push(`${filePath}: normalize ${field} \`${entry}\` -> \`${canonical}\``)
    }
  }
}

const validateAbilityLine = ({ filePath, statblock, issues }) => {
  const match = statblock.match(/^STR .*$/m)
  if (!match) {
    issues.push(`${filePath}: missing ability score line starting with STR`)
    return
  }

  const abilityLine = match[0]
  const expectedLabels = ["STR", "DEX", "CON", "INT", "WIS", "CHA"]
  for (const label of expectedLabels) {
    if (!abilityLine.includes(`${label} `)) {
      issues.push(`${filePath}: ability score line missing ${label} label`)
    }
  }
}

const validateFile = ({ dataset, filePath, markdown }) => {
  const issues = []
  const statblock = parseImportStatblock(markdown)

  if (!statblock) {
    issues.push(`${filePath}: missing Import Statblock text code block`)
    return issues
  }

  validateAbilityLine({ filePath, statblock, issues })

  for (const field of Object.keys(COLLECTION_BY_FIELD)) {
    const match = statblock.match(new RegExp(`^${field}:\\s*(.+)$`, "m"))
    if (!match) {
      issues.push(`${filePath}: missing \`${field}:\` line`)
      continue
    }

    validateListField({
      dataset,
      filePath,
      field,
      value: match[1].trim(),
      issues,
    })
  }

  return issues
}

const main = async () => {
  const { dataset } = await loadReferenceDataset()
  const peopleFiles = (await readdir(PEOPLE_DIR))
    .filter((entry) => entry.endsWith(".md") && entry !== "index.md")
    .map((entry) => path.join(PEOPLE_DIR, entry))

  const targets = [TEMPLATE_FILE, ...peopleFiles]
  const allIssues = []

  for (const file of targets) {
    const markdown = await readFile(file, "utf8")
    const relativePath = path.relative(ROOT, file)
    allIssues.push(...validateFile({ dataset, filePath: relativePath, markdown }))
  }

  if (allIssues.length === 0) {
    console.log("NPC Import Statblock check passed (SRD local terminology)")
    return
  }

  console.log("NPC Import Statblock check found issues:")
  for (const issue of allIssues) {
    console.log(`- ${issue}`)
  }

  process.exitCode = 1
}

await main()
