---
entity_type: npc
entity_slug: <npc-slug>
entity_note: people/<npc-slug>
image: assets/images/npcs/<raceGroup>/<race>/<sexPresentation>/<npc-slug>/<npc-slug>-portrait.<ext>
imageRole: portrait
fullBodyImage: assets/images/npcs/<raceGroup>/<race>/<sexPresentation>/<npc-slug>/<npc-slug>-fullbody.<ext>
assetFolder: assets/images/npcs/<raceGroup>/<race>/<sexPresentation>/<npc-slug>/
tags:
  - npc
  - race/<race>
  - race-group/<raceGroup>
  - sex/<sexPresentation>
raceGroup: <core|expanded|setting-specific>
race: <race>
sexPresentation: <male|female|ambiguous-or-androgynous|mixed-group>
class: <class-name-or-n/a>
subclass: <subclass-name-or-n/a>
role:
archetype:
faction:
region:
status: draft
source: midjourney
promptSummary:
notes:
---

# <NPC Name> Image Index

## Usage

- Primary portrait: `<npc-slug>-portrait.<ext>`
- Secondary full body: `<npc-slug>-fullbody.<ext>`

## Embeds

```md
![[assets/images/npcs/<raceGroup>/<race>/<sexPresentation>/<npc-slug>/<npc-slug>-portrait.<ext>|320]]
![[assets/images/npcs/<raceGroup>/<race>/<sexPresentation>/<npc-slug>/<npc-slug>-fullbody.<ext>|280]]
```

## Metadata Notes

- Keep `raceGroup`, `race`, and `sexPresentation` aligned with folder names.
- Use `class` for the main class identity and `subclass` for specialization when known.
- If class/subclass are unknown, set both to `n/a` and use `role` + `archetype`.
- Use `mixed-group` only when the image set intentionally represents multiple people.
- Use `promptSummary` for a short MidJourney prompt reference.
