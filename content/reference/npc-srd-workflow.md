---
title: NPC SRD Reference Workflow
tags:
  - reference
  - npc
  - srd
---

# NPC SRD Reference Workflow

Use this workflow when writing or generating NPC pages with `## Import Statblock` sections.

## Local-first reference source

- Primary source: `static/data/srd/reference.json`
- Local lookup helper: `npm run npc:srd-reference`
- Do not invent alternate naming when a canonical SRD name exists in the local cache.

## What to normalize for NPC mechanics

- `ability-scores`
- `skills`
- `conditions`
- `damage-types`
- `languages`
- `equipment-categories`
- sample references in `equipment`, `monsters`, and `spells` when useful in actions or spellcasting lines

## Stable IDs for workflow tooling

- Use `endpoint:index` IDs in generation scripts, checks, or draft metadata.
- Examples:
  - `skills:perception`
  - `conditions:frightened`
  - `damage-types:poison`
  - `languages:common`
  - `spells:magic-missile`

## Escalation to live SRD client

- Local cache is sufficient for terminology and common references.
- Fetch live details only when deeper mechanical detail is needed.
- Example:
  - `npm run npc:srd-reference -- --detail-id=spells:shield`

## Authoring reminders

- Keep `## Import Statblock` plain-text and parser-friendly.
- Keep lore outside the statblock section.
- Keep mechanics in recognizable SRD/5e phrasing.
