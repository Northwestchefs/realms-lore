---
title: ZIP Image Import
tags:
  - reference
  - images
  - workflow
status: active
---

# ZIP Image Import

Fast workflow for importing bulk image packs into `assets/images/`.

## Staging

- Drop ZIP archives into `imports/zips/`.
- Use either:
  - **Structured ZIP:** approved top-level folders (`npcs/`, `monsters/`, `locations/`, `items/`, `factions/`, `misc/`).
  - **Flat ZIP:** image files in ZIP root (no folders).

## Run Import

- Command: `npm run images:import-zips`
- Structured ZIPs extract directly into `assets/images/`.
- Flat ZIPs extract to `assets/images/misc/<zip-name-slug>/`.
- Optional flat ZIP override: `npm run images:import-zips -- --target npcs --path core/drow/female/dark-elf-fantasy-pack-01`

## Safety Checks

- Blocks unsafe paths (path traversal).
- Blocks empty archives.
- Blocks unexpected top-level folders in structured ZIPs.
- Blocks non-image files in flat ZIPs.

## After Import

- Add/update descriptor `index.md` files for each imported entity set.
- Link assets from lore pages like [[people/index|People]] and [[monsters/index|Monsters]].
- Refresh gallery pages:
  - [[reference/npc-image-gallery|NPC Image Gallery]]
  - [[reference/monster-image-gallery|Monster Image Gallery]]
