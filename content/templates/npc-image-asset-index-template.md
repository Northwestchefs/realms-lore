---
entity_type: npc
entity_slug: <npc-slug>
entity_note: people/<npc-slug>
image: assets/images/npcs/<raceGroup>/<race>/<npc-slug>/<npc-slug>-portrait.<ext>
imageRole: portrait
fullBodyImage: assets/images/npcs/<raceGroup>/<race>/<npc-slug>/<npc-slug>-fullbody.<ext>
assetFolder: assets/images/npcs/<raceGroup>/<race>/<npc-slug>/
tags:
  - npc
  - race/<race>
  - race-group/<raceGroup>
race: <race>
raceGroup: <core|expanded|setting-specific>
class:
subclass:
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
![[assets/images/npcs/<raceGroup>/<race>/<npc-slug>/<npc-slug>-portrait.<ext>|320]]
![[assets/images/npcs/<raceGroup>/<race>/<npc-slug>/<npc-slug>-fullbody.<ext>|280]]
```

## Metadata Notes

- Keep `raceGroup` and `race` aligned with folder names.
- Fill `class`, `subclass`, `role`, and `archetype` when known for future gallery filtering.
- Use `promptSummary` for a short MidJourney prompt reference.
