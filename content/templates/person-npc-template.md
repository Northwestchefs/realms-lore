---
title: Person NPC Template
image:
imageRole: portrait
fullBodyImage:
assetFolder:
tags:
  - template
  - npc
race:
raceGroup:
class:
subclass:
role:
archetype:
faction:
region:
status: active
source:
promptSummary:
notes:
---

# {{Person Name}}

## Overview

One short paragraph (2-4 lines) on who this person is and why they matter in play.

## Role / Allegiance

- **Role:**
- **Primary Allegiance:**
- **Secondary Ties:**
- **Base of Operations:**

## Appearance

- Table-facing identifiers, style, silhouette.
- What people notice first.

## Image

> Canonical image fields for NPC pages: `image`, `imageRole`, `fullBodyImage`, `assetFolder`.

### Primary Portrait

![[{{image}}|320]]

### Full-Body Reference (Optional)

![[{{fullBodyImage}}|260]]

### Asset Folder / Metadata

- `{{assetFolder}}`
- [[{{assetFolder}}index|Image Index]]

## Import Statblock

```text
Name: {{Person Name}}
Size, type, alignment: Medium humanoid (human), neutral
Armor Class: 10
Hit Points: 9 (2d8)
Speed: 30 ft.
STR 10 (+0) DEX 10 (+0) CON 10 (+0) INT 10 (+0) WIS 10 (+0) CHA 10 (+0)
Saving Throws: None
Skills: None
Damage Vulnerabilities: None
Damage Resistances: None
Damage Immunities: None
Condition Immunities: None
Senses: passive Perception 10
Languages: Common
Challenge: 0 (10 XP)
Proficiency Bonus: +2

Traits
None.

Actions
Dagger. Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage.

Bonus Actions
None.

Reactions
None.

Legendary Actions
None.

Spellcasting
None.
```

Use the exact field order above for every NPC page. Keep this section plain-text and parser-friendly for copy/paste workflows. Do not add lore paragraphs inside this section.

### SRD-backed mechanics checklist

- Validate mechanic labels against `static/data/srd/reference.json` before finalizing this section.
- Use SRD-consistent names for:
  - ability abbreviations (`STR`, `DEX`, `CON`, `INT`, `WIS`, `CHA`)
  - skills (for example, `Sleight of Hand`)
  - conditions and damage types (for example, `Frightened`, `Piercing`)
  - languages (for example, `Common`, `Thieves' Cant`)
- Prefer recognizable SRD equipment/spell naming in actions and spellcasting entries.
- Optional workflow helper: run `npm run npc:srd-reference` to print local canonical names.
- Validation helper: run `npm run npc:check-statblocks` to catch non-canonical terms in template/NPC Import Statblock fields.

## Description

- Personality, voice, and table-ready behavior cues.
- Public mannerisms and social leverage.

## History / Background

- Publicly known background beats.
- Era-sensitive details kept broad when canon is disputed.

## Relationships

- [[people/index|People]]
- [[factions/index|Factions]]
- [[noble-houses/index|Noble Houses]]
- [[nations-realms/index|Nations & Realms]]
- [[regions/index|Regions]]
- [[settlements/index|Settlements]]
- [[faiths/index|Faiths]]
- [[landmarks/index|Landmarks]]

## Plot Hooks

- Immediate way this NPC can hire, pressure, reward, or mislead the party.
- One complication tied to faction, law, faith, or local politics.

## Related Links

- [[people/index|People]]
- [[reference/image-asset-system|Image Asset System]]
- Add the most relevant nation, region, settlement, faction, faith, landmark, and person links.
