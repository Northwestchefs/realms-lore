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

NPC image entries are organized race/species first, then sex presentation:

- `assets/images/npcs/<raceGroup>/<race>/<sexPresentation>/<npc-slug>/`

Use:

- `raceGroup` for top-level species sets (`core`, `expanded`, `setting-specific`)
- `race` for the specific species/race (`elf`, `firbolg`, `tiefling`, etc.)
- `sexPresentation` for visual browsing buckets (`male`, `female`, `ambiguous-or-androgynous`, `mixed-group`)

Class/subclass stays metadata-first in this pass. Future browsing can filter by `class`, `subclass`, `role`, and `archetype` without changing folders.

## Optional Dataview Gallery (Plugin)

> Use this section only if Dataview is enabled.

```dataview
TABLE WITHOUT ID
link(entity_note, entity_slug) as NPC,
raceGroup as Group,
race as Race,
sexPresentation as Presentation,
choice(class, class, "-") as Class,
choice(subclass, subclass, "-") as Subclass,
"![[" + image + "|180]]" as Portrait,
"![[" + fullBodyImage + "|180]]" as "Full Body",
choice(status, status, "active") as Status
FROM "assets/images/npcs"
WHERE entity_type = "npc" AND image
SORT raceGroup ASC, race ASC, sexPresentation ASC, entity_slug ASC
```

## Manual Gallery (No Plugin Required)

### [[assets/images/npcs/core/elf/female/elf-tavern-dweller-01/index|Elf Tavern Dweller 01]]

![[assets/images/npcs/core/elf/female/elf-tavern-dweller-01/elf-tavern-dweller-01-portrait.webp|220]]

- **Race Group / Race:** core / elf
- **Sex Presentation:** female
- **Class/Subclass:** n/a / n/a
- **Role/Archetype:** tavern-dweller / urban-commoner
- **Asset Index:** [[assets/images/npcs/core/elf/female/elf-tavern-dweller-01/index|Image Metadata]]

### [[assets/images/npcs/core/dwarf/male/dwarven-rogue-01/index|Dwarven Rogue 01]]

![[assets/images/npcs/core/dwarf/male/dwarven-rogue-01/dwarven-rogue-01-portrait.webp|220]]

- **Race Group / Race:** core / dwarf
- **Sex Presentation:** male
- **Class/Subclass:** rogue / assassin
- **Role/Archetype:** infiltrator / guild-enforcer
- **Asset Index:** [[assets/images/npcs/core/dwarf/male/dwarven-rogue-01/index|Image Metadata]]

### [[assets/images/npcs/core/human/male/human-noble-01/index|Human Noble 01]]

![[assets/images/npcs/core/human/male/human-noble-01/human-noble-01-portrait.webp|220]]

- **Race Group / Race:** core / human
- **Sex Presentation:** male
- **Class/Subclass:** fighter / battle-master
- **Role/Archetype:** noble / court-politician
- **Asset Index:** [[assets/images/npcs/core/human/male/human-noble-01/index|Image Metadata]]

### [[assets/images/npcs/expanded/firbolg/female/firbolg-wanderer-01/index|Firbolg Wanderer 01]]

![[assets/images/npcs/expanded/firbolg/female/firbolg-wanderer-01/firbolg-wanderer-01-portrait.webp|220]]

- **Race Group / Race:** expanded / firbolg
- **Sex Presentation:** female
- **Class/Subclass:** ranger / gloom-stalker
- **Role/Archetype:** wanderer / wild-guide
- **Asset Index:** [[assets/images/npcs/expanded/firbolg/female/firbolg-wanderer-01/index|Image Metadata]]

### [[assets/images/npcs/expanded/tiefling/ambiguous-or-androgynous/tiefling-warlock-01/index|Tiefling Warlock 01]]

![[assets/images/npcs/expanded/tiefling/ambiguous-or-androgynous/tiefling-warlock-01/tiefling-warlock-01-portrait.webp|220]]

- **Race Group / Race:** expanded / tiefling
- **Sex Presentation:** ambiguous-or-androgynous
- **Class/Subclass:** warlock / archfey
- **Role/Archetype:** occult-broker / pact-agent
- **Asset Index:** [[assets/images/npcs/expanded/tiefling/ambiguous-or-androgynous/tiefling-warlock-01/index|Image Metadata]]

### [[assets/images/npcs/core/human/mixed-group/human-tavern-group-01/index|Human Tavern Group 01]]

![[assets/images/npcs/core/human/mixed-group/human-tavern-group-01/human-tavern-group-01-portrait.webp|220]]

- **Race Group / Race:** core / human
- **Sex Presentation:** mixed-group
- **Class/Subclass:** n/a / n/a
- **Role/Archetype:** tavern-dweller / urban-commoner
- **Asset Index:** [[assets/images/npcs/core/human/mixed-group/human-tavern-group-01/index|Image Metadata]]

## Add a New NPC Entry

1. Create `assets/images/npcs/<raceGroup>/<race>/<sexPresentation>/<npc-slug>/`.
2. Add portrait and full-body files:
   - `<npc-slug>-portrait.<ext>`
   - `<npc-slug>-fullbody.<ext>`
3. Create/update the folder `index.md` using [[templates/npc-image-asset-index-template|NPC Image Asset Index Template]].
4. Keep canonical fields aligned: `image`, `imageRole`, `fullBodyImage`, `assetFolder`, `raceGroup`, `race`, `sexPresentation`.
5. Add `class` + `subclass` when known.
6. If class is uncertain, use `class: n/a`, `subclass: n/a`, then fill `role` + `archetype`.
7. Create/update related NPC page if needed.
8. Add one manual card here when maintaining the non-Dataview section.

## Related

- [[reference/image-asset-system|Image Asset System]]
- [[reference/monster-image-gallery|Monster Image Gallery]]
- [[people/index|People]]
