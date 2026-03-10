---
title: SRD Integration Workflow
---

# SRD Integration Workflow

## Purpose

- Provide a reusable SRD client layer for future automation.
- Keep a compact, local SRD reference cache for stable lookups.
- Support future workflows for [[player-resources/index|Player Resources]], NPC tools, monsters, and item generation.

## SRD Source

- Source API: D&D 5e SRD API (2014)
- Base URL: `https://www.dnd5eapi.co/api/2014`
- Scope policy: SRD-only content for safe reuse.

## Repository Layout

- `scripts/srd/client.mjs`: reusable SRD API client.
- `scripts/srd/normalize.mjs`: normalization helpers for stable IDs and indexing.
- `scripts/srd/seed-reference.mjs`: reference dataset seeding script.
- `scripts/srd/reference-cache.mjs`: local cache reader + stable lookup helpers.
- `scripts/npc/print-srd-npc-reference.mjs`: NPC-facing SRD terminology helper.
- `static/data/srd/reference.json`: local compact SRD reference cache.

## Cached Reference Collections

- Full collections:
  - ability scores
  - skills
  - conditions
  - damage types
  - languages
  - equipment categories
- Curated samples:
  - equipment (weapons, armor, tools, utility gear)
  - monsters
  - spells

## Future Codex Usage Pattern

1. Load `static/data/srd/reference.json` first for local lookups.
2. Use stable IDs (`endpoint:index`) for links, matching, and deduplication.
3. If detailed records are needed, use `SrdClient.fetchByIndex()` or `SrdClient.fetchResource()`.
4. For NPC authoring, use `npm run npc:srd-reference` to keep statblock terms aligned to local SRD names.
5. Keep additions SRD-only and extend via the seed script.

## Refresh / Expand the Local Dataset

- Run: `npm run srd:seed`
- The seeding script always builds a union of live API data and embedded offline curated seed data.
- Merge behavior is explicit and deterministic:
  - Local `OFFLINE_SEED` entries are always included as a baseline.
  - Live API entries override matching IDs (`endpoint:index`).
  - Local curated entries are preserved when the live API does not return them (for example, `languages:druidic` and `languages:thieves-cant`).
  - Endpoint output order is fixed by script configuration (`SEED_CONFIG`) to prevent key-order drift.
  - Collection ordering is stable by name (case-insensitive), then index, then ID.
- Expected diff behavior on rerun:
  - `generatedAt` usually changes each run.
  - Collection contents should remain stable unless upstream SRD API content or local curated seed entries changed.
- To expand:
  1. Edit the `OFFLINE_SEED` collections in `scripts/srd/seed-reference.mjs`.
  2. Re-run `npm run srd:seed`.
  3. Commit updated script + `static/data/srd/reference.json` together.

## Notes

- This layer is intentionally lightweight and script-first.
- It is designed for reuse by future Codex passes without framework lock-in.
