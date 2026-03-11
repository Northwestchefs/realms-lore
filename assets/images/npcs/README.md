# NPC Images

Store NPC image sets using a species/race-first structure:

- `assets/images/npcs/<raceGroup>/<race>/<npc-slug>/`

Race group folders for scale:

- `core/`
- `expanded/`
- `setting-specific/`

Use one folder per NPC image set and include an `index.md` descriptor note.

## Scope for This Pass

- Portrait and full-body images only.
- No token image handling in this workflow.
- Species/race is the first taxonomy layer.
- `class`, `subclass`, `role`, and `archetype` are optional metadata fields for future filtering.

## Filename Pattern

Use lowercase kebab-case file names:

- `<npc-slug>-portrait.<ext>`
- `<npc-slug>-fullbody.<ext>`

## Canonical Descriptor Fields (`index.md`)

```yaml
entity_type: npc
entity_slug: elf-tavern-dweller-01
entity_note: people/elf-tavern-dweller-01
image: assets/images/npcs/core/elf/elf-tavern-dweller-01/elf-tavern-dweller-01-portrait.webp
imageRole: portrait
fullBodyImage: assets/images/npcs/core/elf/elf-tavern-dweller-01/elf-tavern-dweller-01-fullbody.webp
assetFolder: assets/images/npcs/core/elf/elf-tavern-dweller-01/
raceGroup: core
race: elf
class:
subclass:
role: tavern-dweller
archetype: urban-local
faction:
region: sword-coast
status: draft
source: midjourney
promptSummary: Placeholder prompt summary text.
notes: Placeholder notes for art direction.
tags:
  - npc
  - race/elf
  - race-group/core
```

See [[reference/image-asset-system|Image Asset System]] and [[reference/npc-image-gallery|NPC Image Gallery]].
