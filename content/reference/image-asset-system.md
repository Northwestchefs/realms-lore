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

Use one slug folder per NPC or monster:

- `assets/images/npcs/<slug>/`
- `assets/images/monsters/<slug>/`

## 2) Naming Convention

Use lowercase kebab-case filenames.

Pattern:

- `<entity-slug>-<role>.<ext>`
- `<entity-slug>-<role>-v<version>.<ext>`
- `<entity-slug>-<variant>-<role>.<ext>`

Roles:

- `portrait`
- `fullbody`
- `token`
- `reference`
- `scene`
- `variant`

## 3) Frontmatter Conventions (Gallery-Friendly)

Use these fields on asset folder `index.md` notes so visual galleries can generate consistently.

```yaml
entity_type: npc | monster
entity_slug: raelin-silverleaf
entity_note: people/raelin-silverleaf
image: assets/images/npcs/raelin-silverleaf/raelin-silverleaf-portrait.webp
imageRole: portrait
tags:
  - npc
  - scout
faction: harpers
region: sword-coast
status: active
creatureType: beast # monsters only
```

### Field notes

- `image`: primary gallery image to embed.
- `imageRole`: what that image is for (`portrait`, `reference`, `token`, etc.).
- `tags`: compact discoverability labels.
- `faction`: optional faction tie.
- `region`: optional primary region.
- `status`: `active`, `draft`, or `retired`.
- `creatureType`: monster category (`beast`, `undead`, `fey`, `monstrosity`, `dragon`, `humanoid`).

Legacy fields (`primary_image`, `token_image`, `alternate_images`) are treated as migration-only. Prefer canonical entity fields and validate with [[reference/entity-image-schema-validation|Entity Image Schema Validation]].

## 4) Entity Page Canonical Fields

Use one lean, parser-friendly schema on NPC and monster entity pages:

```yaml
image: assets/images/.../main-image.svg
imageRole: portrait # NPC default; monsters usually reference
tokenImage: assets/images/.../token.svg # optional
alternateImages:
  - assets/images/.../alt-image.svg # optional list
assetFolder: assets/images/<type>/<slug>/
tags: [npc, scout]
faction: harpers # NPC optional
region: sword-coast # optional
status: active
creatureType: beast # monster only
```

### Canonical rules for automation

- `image` is the canonical primary image field for entity pages.
- `tokenImage` is the canonical token handout/VTT token field.
- `alternateImages` is the canonical list for form, scene, and extra references.
- `assetFolder` must be a trailing-slash folder path (`assets/images/npcs/<slug>/`) so scripts can resolve `index.md` as `{{assetFolder}}index.md`.
- Keep asset-folder `index.md` frontmatter aligned with entity note fields for gallery consistency.

## 5) Embedding in Obsidian Notes

Preferred embed format:

```md
![[assets/images/npcs/raelin-silverleaf/raelin-silverleaf-portrait.webp|320]]
```

Fallback Markdown format:

```md
![Raelin Silverleaf portrait](../../assets/images/npcs/raelin-silverleaf/raelin-silverleaf-portrait.webp)
```

## 6) Visual Browsing Pages

Use these indexes for image-first browsing:

- [[reference/npc-image-gallery|NPC Image Gallery]]
- [[reference/monster-image-gallery|Monster Image Gallery]]

Both pages include:

- Optional Dataview examples.
- Manual Markdown fallback cards (plugin-light workflow).

## 7) Quick Add Workflow

### Add a new NPC image set

1. Create `assets/images/npcs/<npc-slug>/`.
2. Add art files with role-based names.
3. Create/update `assets/images/npcs/<npc-slug>/index.md` with gallery frontmatter fields.
4. Update `content/people/<npc-slug>.md` with canonical image frontmatter (`image`, `tokenImage`, `alternateImages`, `assetFolder`) and `## Image` embeds.
5. Add the NPC card to [[reference/npc-image-gallery|NPC Image Gallery]] if maintaining manual view.

### Add a new monster image set

1. Create `assets/images/monsters/<monster-slug>/`.
2. Add art files with role-based names.
3. Create/update `assets/images/monsters/<monster-slug>/index.md` with gallery frontmatter fields.
4. Set `creatureType` for category browsing.
5. Update `content/monsters/<monster-slug>.md` with canonical image frontmatter and set `creatureType` for parsing.
6. Add the monster card to [[reference/monster-image-gallery|Monster Image Gallery]] if maintaining manual view.

## Related

- [[templates/person-npc-template|Person NPC Template]]
- [[templates/monster-template|Monster Template]]
- [[people/raelin-silverleaf|NPC Image Example]]
- [[monsters/winter-wolf|Monster Image Example]]


## 8) Monster Variants and Multi-Form Handling

For monsters with multiple forms, keep one canonical page and one asset folder:

- Keep the baseline art in `image` (usually `reference`).
- Put each variant/form image in `alternateImages`.
- Keep token-ready forms in `tokenImage` when one token works for all forms; if forms need separate tokens, include them in `alternateImages` with clear filenames (`<slug>-alpha-token.svg`).
- If variant mechanics are substantial, split mechanics into separate monster notes and keep each note pointed at its own `assetFolder`.
