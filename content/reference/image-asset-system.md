---
title: Image Asset System
tags:
  - reference
  - images
  - workflow
status: active
---

# Image Asset System

A lightweight, scalable image workflow for Obsidian + Quartz lore notes.

## 1) Where Images Go

Top-level asset storage:

- `assets/images/npcs/`
- `assets/images/monsters/`
- `assets/images/locations/`
- `assets/images/items/`
- `assets/images/factions/`
- `assets/images/misc/`

NPC image sets follow a species/race-first structure:

- `assets/images/npcs/<raceGroup>/<race>/<npc-slug>/`

Use these race groups for large official 5e coverage:

- `core/`
- `expanded/`
- `setting-specific/`

Example paths:

- `assets/images/npcs/core/elf/elf-tavern-dweller-01/`
- `assets/images/npcs/core/dwarf/dwarven-rogue-01/`
- `assets/images/npcs/core/human/human-noble-01/`
- `assets/images/npcs/expanded/firbolg/firbolg-wanderer-01/`
- `assets/images/npcs/core/tiefling/tiefling-warlock-01/`

## 2) Naming Convention

Use lowercase kebab-case filenames.

Pattern:

- `<npc-slug>-portrait.<ext>`
- `<npc-slug>-fullbody.<ext>`
- `<npc-slug>-portrait-v<version>.<ext>` (optional)
- `<npc-slug>-fullbody-v<version>.<ext>` (optional)

This pass is portrait + full-body only. Token handling is intentionally out of scope.

## 3) Canonical NPC Image Descriptor Schema

Each NPC asset folder should have an `index.md` note with this schema.

```yaml
entity_type: npc
entity_slug: elf-tavern-dweller-01
entity_note: people/elf-tavern-dweller-01
image: assets/images/npcs/core/elf/elf-tavern-dweller-01/elf-tavern-dweller-01-portrait.webp
imageRole: portrait
fullBodyImage: assets/images/npcs/core/elf/elf-tavern-dweller-01/elf-tavern-dweller-01-fullbody.webp
assetFolder: assets/images/npcs/core/elf/elf-tavern-dweller-01/
tags:
  - npc
  - race/elf
  - race-group/core
race: elf
raceGroup: core
class:
subclass:
role: tavern-dweller
archetype: urban-local
faction:
region: sword-coast
status: draft
source: midjourney
promptSummary: Placeholder prompt summary text.
notes: Placeholder production notes.
```

### Field rules

- `image` is the canonical primary image.
- `imageRole` should usually be `portrait`.
- `fullBodyImage` is the secondary visual reference.
- `assetFolder` must be deterministic, parser-friendly, and end with a trailing slash.
- `raceGroup` stores the top taxonomy layer (`core`, `expanded`, `setting-specific`).
- `race` stores the species/race folder value.
- `class`, `subclass`, `role`, and `archetype` are optional now and reserved for future browsing.

## 4) NPC Entity Page Canonical Fields

Use the same canonical schema fields on linked NPC pages when image metadata is present:

```yaml
image: assets/images/.../elf-tavern-dweller-01-portrait.webp
imageRole: portrait
fullBodyImage: assets/images/.../elf-tavern-dweller-01-fullbody.webp
assetFolder: assets/images/npcs/core/elf/elf-tavern-dweller-01/
tags: [npc, race/elf]
race: elf
raceGroup: core
class:
subclass:
role: tavern-dweller
archetype: urban-local
faction:
region:
status: draft
source: midjourney
promptSummary:
notes:
```

## 5) Embedding in Obsidian Notes

Preferred embed format:

```md
![[assets/images/npcs/core/elf/elf-tavern-dweller-01/elf-tavern-dweller-01-portrait.webp|320]]
```

Optional full-body embed:

```md
![[assets/images/npcs/core/elf/elf-tavern-dweller-01/elf-tavern-dweller-01-fullbody.webp|280]]
```

## 6) MidJourney Import Workflow (Contributor)

1. Export/download portrait and full-body images from MidJourney.
2. Choose `raceGroup`, `race`, and `npc-slug`.
3. Create the asset folder: `assets/images/npcs/<raceGroup>/<race>/<npc-slug>/`.
4. Rename files to standard format:
   - `<npc-slug>-portrait.<ext>`
   - `<npc-slug>-fullbody.<ext>`
5. Add or update `index.md` in that folder using the canonical descriptor schema.
6. Create or update the related NPC page (`content/people/<npc-slug>.md`) and align image metadata.
7. Add/update the entry in [[reference/npc-image-gallery|NPC Image Gallery]].
8. When known, fill optional future-facing fields: `class`, `subclass`, `role`, `archetype`.

## 7) Future Class/Subclass Browsing (Planned)

The folder structure stays species/race-first. Future filters should read metadata fields from descriptor notes and NPC pages:

- `class`
- `subclass`
- `role`
- `archetype`

Example future queries:

- elf + ranger + gloom-stalker
- dwarf + rogue + assassin
- human + fighter + battle-master
- tiefling + warlock + archfey

## Related

- [[reference/npc-image-gallery|NPC Image Gallery]]
- [[reference/monster-image-gallery|Monster Image Gallery]]
- [[templates/person-npc-template|Person NPC Template]]
- [[templates/npc-image-asset-index-template|NPC Image Asset Index Template]]
