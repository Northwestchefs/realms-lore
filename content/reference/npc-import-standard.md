---
title: NPC Import Statblock Standard
tags:
  - reference
  - npc
  - statblock
---

# NPC Import Statblock Standard

Use this format for the `## Import Statblock` section on every NPC page. This standard is optimized for plain-text copy/paste into Foundry VTT 5e statblock importer workflows.

## Rules

- Keep statblocks in a fenced `text` code block.
- Keep mechanics only; no lore paragraphs in this section.
- Do not use tables, columns, infoboxes, or decorative layouts.
- Keep line labels and section headers in the same order every time.
- Use recognizable 5e wording: `Melee Weapon Attack:`, `Ranged Weapon Attack:`, `Hit:`, `Spellcasting.`, `Innate Spellcasting.`
- If a section does not apply, write `None.`

## SRD-backed terminology workflow

- Local-first source of truth: `static/data/srd/reference.json`.
- Run `npm run npc:srd-reference` when drafting or reviewing NPC mechanics.
- Treat `static/data/srd/reference.json` as canonical naming for mechanics lines.
- Validate statblocks with `npm run npc:check-statblocks` before commit when NPC mechanics changed.
- Normalize names to SRD collections where relevant:
  - `ability-scores`
  - `skills`
  - `conditions`
  - `damage-types`
  - `languages`
  - `equipment-categories`
  - curated `equipment`, `monsters`, and `spells`
- Keep internal references stable with `endpoint:index` IDs (example: `skills:stealth`, `damage-types:piercing`) for tool-assisted generation and review metadata.
- Keep stable IDs out of the final importer text block unless a downstream parser explicitly requires them.
- Use the SRD API client (`scripts/srd/client.mjs`) only when deeper details are required and not present in the local cache.

## Required Field Order

```text
Name:
Size, type, alignment:
Armor Class:
Hit Points:
Speed:
STR ... DEX ... CON ... INT ... WIS ... CHA ...
Saving Throws:
Skills:
Damage Vulnerabilities:
Damage Resistances:
Damage Immunities:
Condition Immunities:
Senses:
Languages:
Challenge:
Proficiency Bonus:

Traits

Actions

Bonus Actions

Reactions

Legendary Actions

Spellcasting
```

## Spellcasting Notes

- Use `Spellcasting.` when the NPC prepares/casts spells normally.
- Use `Innate Spellcasting.` when abilities are innate.
- If both apply, include both entries under the final `Spellcasting` section.

## Where to Use

- Build new NPC pages from [[templates/person-npc-template|Person NPC Template]].
- Keep NPC page structure aligned with [[people/index|People]] guidance.
