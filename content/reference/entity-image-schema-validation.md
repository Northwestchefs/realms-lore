---
title: Entity Image Schema Validation
tags:
  - reference
  - workflow
  - images
status: active
---

# Entity Image Schema Validation

Lightweight validation and migration support for NPC and monster entity pages.

## Run the Validator

```bash
python3 scripts/entities/validate-entity-image-schema.py
```

Write/update the audit markdown report:

```bash
python3 scripts/entities/validate-entity-image-schema.py --write-report content/reference/entity-image-schema-audit.md
```

Optional npm shortcut:

```bash
npm run entity:validate-images
```

## What It Checks

Across `content/people/*.md` and `content/monsters/*.md` (excluding each `index.md`):

- YAML frontmatter block exists and can be parsed.
- Canonical image fields on entity pages:
  - `image`
  - `imageRole`
  - `tokenImage`
  - `alternateImages`
  - `assetFolder`
- Required fields:
  - all entities: `image`, `assetFolder`
  - monsters: `creatureType`
- `assetFolder` shape:
  - string path
  - trailing slash convention (`.../`)
  - referenced directory exists
- Referenced file paths exist when provided:
  - `image`
  - `tokenImage`
  - each `alternateImages` item
- `alternateImages` is a list when present.
- Legacy field detection (audit only):
  - `image_primary`, `image_token`, `image_variants`
  - `primary_image`, `token_image`, `alternate_images`, `asset_folder`

## Exit Behavior

- Exit `0`: no hard validation errors.
- Exit `1`: at least one hard validation error.

Warnings (like missing trailing slash on `assetFolder`) are reported but do not fail by themselves.

## Legacy to Canonical Mapping

Use these mappings for migration when old keys are found:

- `image_primary` or `primary_image` -> `image`
- `image_token` or `token_image` -> `tokenImage`
- `image_variants` or `alternate_images` -> `alternateImages`
- `asset_folder` -> `assetFolder`

After mapping, verify canonical shape:

- `assetFolder` ends with `/`
- `alternateImages` is a YAML list
- all referenced files/folders exist

## Common Fixes

- **Missing `image`**
  - Add a primary asset path, usually portrait/reference art under the entity folder.
- **Missing `assetFolder`**
  - Add the folder path, for example:
    - NPC: `assets/images/npcs/<slug>/`
    - Monster: `assets/images/monsters/<slug>/`
- **Missing monster `creatureType`**
  - Add broad category values used in this repo (for example `beast`, `undead`, `monstrosity`).
- **Missing file/directory path**
  - Create the file/folder or fix the path typo.
- **`alternateImages` not a list**
  - Convert to YAML list format:

```yaml
alternateImages:
  - assets/images/monsters/example/example-variant-reference.svg
```

## Contributor Workflow

1. Create entity page from template:
   - [[templates/person-npc-template|Person NPC Template]]
   - [[templates/monster-template|Monster Template]]
2. Add images under an entity slug folder in `assets/images/npcs/` or `assets/images/monsters/`.
3. Fill canonical frontmatter fields in entity page.
4. Run validator locally.
5. If needed, regenerate [[reference/entity-image-schema-audit|Entity Image Schema Audit]] and include notable findings in your PR.

## Related

- [[reference/image-asset-system|Image Asset System]]
- [[reference/entity-image-schema-audit|Entity Image Schema Audit]]
