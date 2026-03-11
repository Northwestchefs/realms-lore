# NPC Images

Store NPC image sets using a race/species-first + sex-presentation structure:

- `assets/images/npcs/<raceGroup>/<race>/<sexPresentation>/<npc-slug>/`

Race group folders for scale:

- `core/`
- `expanded/`
- `setting-specific/`

Sex presentation folders for browsing:

- `male/`
- `female/`
- `ambiguous-or-androgynous/`
- `mixed-group/`

Use one folder per NPC image set and include an `index.md` descriptor note.

## Scope for This Pass

- Portrait and full-body images only.
- No token image handling in this workflow.
- Organize first by race/species and sex presentation.
- `class` and `subclass` are optional metadata, but strongly supported now.
- `role` and `archetype` remain useful fallback metadata.

## Filename Pattern

Use lowercase kebab-case file names:

- `<npc-slug>-portrait.<ext>`
- `<npc-slug>-fullbody.<ext>`

## Canonical Descriptor Fields (`index.md`)

```yaml
entity_type: npc
entity_slug: elf-tavern-dweller-01
entity_note: people/elf-tavern-dweller-01
image: assets/images/npcs/core/elf/female/elf-tavern-dweller-01/elf-tavern-dweller-01-portrait.webp
imageRole: portrait
fullBodyImage: assets/images/npcs/core/elf/female/elf-tavern-dweller-01/elf-tavern-dweller-01-fullbody.webp
assetFolder: assets/images/npcs/core/elf/female/elf-tavern-dweller-01/
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
notes: Placeholder notes for art direction.
tags:
  - npc
  - race/elf
  - race-group/core
  - sex/female
```

See [[reference/image-asset-system|Image Asset System]] and [[reference/npc-image-gallery|NPC Image Gallery]].
