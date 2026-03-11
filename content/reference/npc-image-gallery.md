---
title: NPC Image Gallery
tags:
  - reference
  - images
  - npc
  - gallery
status: active
---

# NPC Image Gallery

Visual-first browser for NPC portrait and full-body references.

## Organization Principle

NPC image entries are organized species/race-first:

- `assets/images/npcs/<raceGroup>/<race>/<npc-slug>/`

Use:

- `raceGroup` for top-level grouping (`core`, `expanded`, `setting-specific`)
- `race` for the specific species/race (`elf`, `firbolg`, `tiefling`, etc.)

Future gallery filtering will layer on metadata (`class`, `subclass`, `role`, `archetype`) without changing this folder structure.

## Optional Dataview Gallery (Plugin)

> Use this section only if Dataview is enabled.

```dataview
TABLE WITHOUT ID
link(entity_note, entity_slug) as NPC,
raceGroup as Group,
race as Race,
choice(class, class, "-") as Class,
choice(subclass, subclass, "-") as Subclass,
"![[" + image + "|180]]" as Portrait,
"![[" + fullBodyImage + "|180]]" as "Full Body",
choice(status, status, "active") as Status
FROM "assets/images/npcs"
WHERE entity_type = "npc" AND image
SORT raceGroup ASC, race ASC, entity_slug ASC
```

## Manual Gallery (No Plugin Required)

### [[assets/images/npcs/core/elf/elf-tavern-dweller-01/index|Elf Tavern Dweller 01]]

![[assets/images/npcs/core/elf/elf-tavern-dweller-01/elf-tavern-dweller-01-portrait.webp|220]]

- **Race Group:** core
- **Race:** elf
- **Class/Subclass:** _(future metadata)_
- **Asset Index:** [[assets/images/npcs/core/elf/elf-tavern-dweller-01/index|Image Metadata]]

### [[assets/images/npcs/core/dwarf/dwarven-rogue-01/index|Dwarven Rogue 01]]

![[assets/images/npcs/core/dwarf/dwarven-rogue-01/dwarven-rogue-01-portrait.webp|220]]

- **Race Group:** core
- **Race:** dwarf
- **Class/Subclass:** rogue / assassin
- **Asset Index:** [[assets/images/npcs/core/dwarf/dwarven-rogue-01/index|Image Metadata]]

## Add a New NPC Entry

1. Create `assets/images/npcs/<raceGroup>/<race>/<npc-slug>/`.
2. Add portrait and full-body files:
   - `<npc-slug>-portrait.<ext>`
   - `<npc-slug>-fullbody.<ext>`
3. Create/update the folder `index.md` using [[templates/npc-image-asset-index-template|NPC Image Asset Index Template]].
4. Keep canonical fields aligned: `image`, `imageRole`, `fullBodyImage`, `assetFolder`, `raceGroup`, `race`.
5. Add optional future metadata when known: `class`, `subclass`, `role`, `archetype`.
6. Create/update related NPC page if needed.
7. Add one manual card here when maintaining the non-Dataview section.

## Related

- [[reference/image-asset-system|Image Asset System]]
- [[reference/monster-image-gallery|Monster Image Gallery]]
- [[people/index|People]]
