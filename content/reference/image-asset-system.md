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

NPC image sets follow race/species + sex presentation first:

- `assets/images/npcs/<raceGroup>/<race>/<sexPresentation>/<npc-slug>/`

Use these race groups for broad official 5e coverage:

- `core/`
- `expanded/`
- `setting-specific/`

Use these sex presentation folders:

- `male/`
- `female/`
- `ambiguous-or-androgynous/`
- `mixed-group/`

Example paths:

- `assets/images/npcs/core/elf/female/elf-tavern-dweller-01/`
- `assets/images/npcs/core/dwarf/male/dwarven-rogue-01/`
- `assets/images/npcs/core/human/male/human-noble-01/`
- `assets/images/npcs/expanded/firbolg/female/firbolg-wanderer-01/`
- `assets/images/npcs/expanded/tiefling/ambiguous-or-androgynous/tiefling-warlock-01/`
- `assets/images/npcs/core/human/mixed-group/human-tavern-group-01/`

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
image: assets/images/npcs/core/elf/female/elf-tavern-dweller-01/elf-tavern-dweller-01-portrait.webp
imageRole: portrait
fullBodyImage: assets/images/npcs/core/elf/female/elf-tavern-dweller-01/elf-tavern-dweller-01-fullbody.webp
assetFolder: assets/images/npcs/core/elf/female/elf-tavern-dweller-01/
tags:
  - npc
  - race/elf
  - race-group/core
  - sex/female
raceGroup: core
race: elf
sexPresentation: female
class: n/a
subclass: n/a
role: tavern-dweller
archetype: urban-commoner
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
- `sexPresentation` is required for curated individual sets, unless the folder is explicitly `mixed-group`.
- `class` is the main class identity when known (example: `rogue`, `ranger`, `warlock`).
- `subclass` is the specialization when known (example: `assassin`, `gloom-stalker`, `archfey`).
- Use `role` + `archetype` when exact `class`/`subclass` is unknown (example: `tavern-dweller`, `urban-commoner`).

## 4) Sex Presentation Guidance

Use the most practical visual bucket:

- `male`: clearly male-presenting individual reference set.
- `female`: clearly female-presenting individual reference set.
- `ambiguous-or-androgynous`: intentionally non-binary, ambiguous, or androgynous visual presentation.
- `mixed-group`: one image set intended to represent multiple people in the same scene.

Use individual folders (`male`, `female`, `ambiguous-or-androgynous`) for single-NPC references.
Use `mixed-group` only when the portrait/full-body pair is intentionally a group visual and not a single NPC.

## 5) NPC Entity Page Canonical Fields

Use the same canonical schema fields on linked NPC pages when image metadata is present:

```yaml
image: assets/images/.../elf-tavern-dweller-01-portrait.webp
imageRole: portrait
fullBodyImage: assets/images/.../elf-tavern-dweller-01-fullbody.webp
assetFolder: assets/images/npcs/core/elf/female/elf-tavern-dweller-01/
tags: [npc, race/elf, sex/female]
raceGroup: core
race: elf
sexPresentation: female
class: n/a
subclass: n/a
role: tavern-dweller
archetype: urban-commoner
faction:
region:
status: draft
source: midjourney
promptSummary:
notes:
```

## 6) MidJourney Import Workflow (Contributor)

1. Export/download portrait and full-body images from MidJourney.
2. Choose `raceGroup`, `race`, `sexPresentation`, and `npc-slug`.
3. Create the asset folder: `assets/images/npcs/<raceGroup>/<race>/<sexPresentation>/<npc-slug>/`.
4. Rename files to standard format:
   - `<npc-slug>-portrait.<ext>`
   - `<npc-slug>-fullbody.<ext>`
5. Add or update `index.md` in that folder using the canonical descriptor schema.
6. Fill `class` and `subclass` when known.
7. If class is uncertain, use `class: n/a`, `subclass: n/a`, and fill `role`/`archetype`.
8. Create or update the related NPC page (`content/people/<npc-slug>.md`) and align image metadata.
9. Add/update the entry in [[reference/npc-image-gallery|NPC Image Gallery]] so it can surface in Obsidian gallery views.

## 7) Class/Subclass Planning (Metadata First)

Keep folders race/species + sex presentation first. Class browsing can be added later by querying metadata:

- `class`
- `subclass`
- `role`
- `archetype`

Examples:

- `class: rogue` / `subclass: assassin`
- `class: ranger` / `subclass: gloom-stalker`
- `class: warlock` / `subclass: archfey`
- `class: n/a` / `subclass: n/a` / `role: tavern-dweller` / `archetype: urban-commoner`

## 8) Bulk ZIP Import Workflow

For large drops of image packs, use the ZIP importer script:

1. Place ZIP files in `imports/zips/`.
2. Choose ZIP style:
   - **Structured ZIP:** top-level folders are one or more of `npcs/`, `monsters/`, `locations/`, `items/`, `factions/`, `misc/`.
   - **Flat ZIP:** images at archive root (no folders) are auto-imported to `assets/images/misc/<zip-name-slug>/`.
3. Run: `npm run images:import-zips`
4. Optional override for flat ZIP destination:
   - `npm run images:import-zips -- --target npcs --path core/drow/female/dark-elf-fantasy-pack-01`
5. Confirm extracted files landed under `assets/images/...`
6. Update related `index.md` metadata pages for newly imported sets.

Validation guardrails:

- Rejects empty ZIP archives.
- Rejects path traversal entries (unsafe `../` style paths).
- For flat ZIPs, accepts image file types only (`.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.svg`, `.avif`).
- Rejects structured archives with unsupported top-level folders.

## Related

- [[reference/npc-image-gallery|NPC Image Gallery]]
- [[reference/monster-image-gallery|Monster Image Gallery]]
- [[templates/person-npc-template|Person NPC Template]]
- [[templates/npc-image-asset-index-template|NPC Image Asset Index Template]]
- [[reference/midjourney-prompt-library|MidJourney Prompt Library]]
- [[reference/zip-image-import|ZIP Image Import]]
