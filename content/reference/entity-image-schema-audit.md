---
title: Entity Image Schema Audit
tags:
  - reference
  - workflow
  - images
status: active
---

# Entity Image Schema Audit

Generated: 2026-03-11 09:05 UTC

Command:

```bash
python3 scripts/entities/validate-entity-image-schema.py --write-report content/reference/entity-image-schema-audit.md
```

## Coverage
- Total entity pages scanned: **54**
- NPC pages: **28**
- Monster pages: **26**

## Audit Summary
- Pages already using canonical image fields (`image`, `imageRole`, `tokenImage`, `alternateImages`, `assetFolder`): **2**
- Pages using legacy image fields: **0**
- Pages missing `image`: **52**
- Pages missing `assetFolder`: **52**
- Monster pages missing `creatureType`: **25**
- Pages with malformed/non-parseable `assetFolder`: **0**
- Pages where `assetFolder` is missing trailing slash: **0**
- Pages where `assetFolder` directory does not exist: **0**
- Pages where referenced `image` / `tokenImage` / `alternateImages` path does not exist: **0**

## Pages Using Legacy Fields
- None

## Pages Missing Image
- [[people/alusair-obarskyr|alusair-obarskyr]]
- [[people/brother-kestrel-vane|brother-kestrel-vane]]
- [[people/captain-harlon-drex|captain-harlon-drex]]
- [[people/davil-starsong|davil-starsong]]
- [[people/ellis-fenward|ellis-fenward]]
- [[people/factor-irielle-vann|factor-irielle-vann]]
- [[people/ilyra-vaust|ilyra-vaust]]
- [[people/jastor-rheel|jastor-rheel]]
- [[people/justicar-maelis-durn|justicar-maelis-durn]]
- [[people/krenlin-auvryndar|krenlin-auvryndar]]
- [[people/laeral-silverhand|laeral-silverhand]]
- [[people/magister-selene-dawnscript|magister-selene-dawnscript]]
- [[people/manshoon|manshoon]]
- [[people/marshal-saelra-vonn|marshal-saelra-vonn]]
- [[people/melannor-fellbranch|melannor-fellbranch]]
- [[people/neth-varr|neth-varr]]
- [[people/nymra-blackwake|nymra-blackwake]]
- [[people/ontharr-frume|ontharr-frume]]
- [[people/remallia-haventree|remallia-haventree]]
- [[people/renal-bloodscalp|renal-bloodscalp]]
- [[people/shieldcaptain-oth-brammar|shieldcaptain-oth-brammar]]
- [[people/szass-tam|szass-tam]]
- [[people/thalia-brineledger|thalia-brineledger]]
- [[people/thane-korvul-icevein|thane-korvul-icevein]]
- [[people/vajra-safahr|vajra-safahr]]
- [[people/vesk-talandra|vesk-talandra]]
- [[people/yelena-embervein|yelena-embervein]]
- [[monsters/ambermold-hulk|ambermold-hulk]]
- [[monsters/blindstone-basilisk|blindstone-basilisk]]
- [[monsters/chainpit-overseer|chainpit-overseer]]
- [[monsters/chasm-vulture|chasm-vulture]]
- [[monsters/chokepoint-hook-horror|chokepoint-hook-horror]]
- [[monsters/cinderbat-swarm|cinderbat-swarm]]
- [[monsters/deep-lamprey-swarm|deep-lamprey-swarm]]
- [[monsters/deepwell-sniper|deepwell-sniper]]
- [[monsters/echo-wraith|echo-wraith]]
- [[monsters/gloomknife-goblin|gloomknife-goblin]]
- [[monsters/gloomknife-hexer|gloomknife-hexer]]
- [[monsters/gravewire-skeleton|gravewire-skeleton]]
- [[monsters/ironjaw-carrion-crawler|ironjaw-carrion-crawler]]
- [[monsters/lanternmoth-cloud|lanternmoth-cloud]]
- [[monsters/mirecoil-sorcerer|mirecoil-sorcerer]]
- [[monsters/rubbletusk-boar|rubbletusk-boar]]
- [[monsters/runebound-minotaur|runebound-minotaur]]
- [[monsters/rustwater-ooze|rustwater-ooze]]
- [[monsters/saltfang-drake|saltfang-drake]]
- [[monsters/shardweb-spider|shardweb-spider]]
- [[monsters/siltstrider-lizard|siltstrider-lizard]]
- [[monsters/stonegut-ogre|stonegut-ogre]]
- [[monsters/vaultscale-tyrant|vaultscale-tyrant]]
- [[monsters/veilprayer-adept|veilprayer-adept]]
- [[monsters/voidglass-scout|voidglass-scout]]

## Pages Missing assetFolder
- [[people/alusair-obarskyr|alusair-obarskyr]]
- [[people/brother-kestrel-vane|brother-kestrel-vane]]
- [[people/captain-harlon-drex|captain-harlon-drex]]
- [[people/davil-starsong|davil-starsong]]
- [[people/ellis-fenward|ellis-fenward]]
- [[people/factor-irielle-vann|factor-irielle-vann]]
- [[people/ilyra-vaust|ilyra-vaust]]
- [[people/jastor-rheel|jastor-rheel]]
- [[people/justicar-maelis-durn|justicar-maelis-durn]]
- [[people/krenlin-auvryndar|krenlin-auvryndar]]
- [[people/laeral-silverhand|laeral-silverhand]]
- [[people/magister-selene-dawnscript|magister-selene-dawnscript]]
- [[people/manshoon|manshoon]]
- [[people/marshal-saelra-vonn|marshal-saelra-vonn]]
- [[people/melannor-fellbranch|melannor-fellbranch]]
- [[people/neth-varr|neth-varr]]
- [[people/nymra-blackwake|nymra-blackwake]]
- [[people/ontharr-frume|ontharr-frume]]
- [[people/remallia-haventree|remallia-haventree]]
- [[people/renal-bloodscalp|renal-bloodscalp]]
- [[people/shieldcaptain-oth-brammar|shieldcaptain-oth-brammar]]
- [[people/szass-tam|szass-tam]]
- [[people/thalia-brineledger|thalia-brineledger]]
- [[people/thane-korvul-icevein|thane-korvul-icevein]]
- [[people/vajra-safahr|vajra-safahr]]
- [[people/vesk-talandra|vesk-talandra]]
- [[people/yelena-embervein|yelena-embervein]]
- [[monsters/ambermold-hulk|ambermold-hulk]]
- [[monsters/blindstone-basilisk|blindstone-basilisk]]
- [[monsters/chainpit-overseer|chainpit-overseer]]
- [[monsters/chasm-vulture|chasm-vulture]]
- [[monsters/chokepoint-hook-horror|chokepoint-hook-horror]]
- [[monsters/cinderbat-swarm|cinderbat-swarm]]
- [[monsters/deep-lamprey-swarm|deep-lamprey-swarm]]
- [[monsters/deepwell-sniper|deepwell-sniper]]
- [[monsters/echo-wraith|echo-wraith]]
- [[monsters/gloomknife-goblin|gloomknife-goblin]]
- [[monsters/gloomknife-hexer|gloomknife-hexer]]
- [[monsters/gravewire-skeleton|gravewire-skeleton]]
- [[monsters/ironjaw-carrion-crawler|ironjaw-carrion-crawler]]
- [[monsters/lanternmoth-cloud|lanternmoth-cloud]]
- [[monsters/mirecoil-sorcerer|mirecoil-sorcerer]]
- [[monsters/rubbletusk-boar|rubbletusk-boar]]
- [[monsters/runebound-minotaur|runebound-minotaur]]
- [[monsters/rustwater-ooze|rustwater-ooze]]
- [[monsters/saltfang-drake|saltfang-drake]]
- [[monsters/shardweb-spider|shardweb-spider]]
- [[monsters/siltstrider-lizard|siltstrider-lizard]]
- [[monsters/stonegut-ogre|stonegut-ogre]]
- [[monsters/vaultscale-tyrant|vaultscale-tyrant]]
- [[monsters/veilprayer-adept|veilprayer-adept]]
- [[monsters/voidglass-scout|voidglass-scout]]

## Monster Pages Missing creatureType
- [[monsters/ambermold-hulk|ambermold-hulk]]
- [[monsters/blindstone-basilisk|blindstone-basilisk]]
- [[monsters/chainpit-overseer|chainpit-overseer]]
- [[monsters/chasm-vulture|chasm-vulture]]
- [[monsters/chokepoint-hook-horror|chokepoint-hook-horror]]
- [[monsters/cinderbat-swarm|cinderbat-swarm]]
- [[monsters/deep-lamprey-swarm|deep-lamprey-swarm]]
- [[monsters/deepwell-sniper|deepwell-sniper]]
- [[monsters/echo-wraith|echo-wraith]]
- [[monsters/gloomknife-goblin|gloomknife-goblin]]
- [[monsters/gloomknife-hexer|gloomknife-hexer]]
- [[monsters/gravewire-skeleton|gravewire-skeleton]]
- [[monsters/ironjaw-carrion-crawler|ironjaw-carrion-crawler]]
- [[monsters/lanternmoth-cloud|lanternmoth-cloud]]
- [[monsters/mirecoil-sorcerer|mirecoil-sorcerer]]
- [[monsters/rubbletusk-boar|rubbletusk-boar]]
- [[monsters/runebound-minotaur|runebound-minotaur]]
- [[monsters/rustwater-ooze|rustwater-ooze]]
- [[monsters/saltfang-drake|saltfang-drake]]
- [[monsters/shardweb-spider|shardweb-spider]]
- [[monsters/siltstrider-lizard|siltstrider-lizard]]
- [[monsters/stonegut-ogre|stonegut-ogre]]
- [[monsters/vaultscale-tyrant|vaultscale-tyrant]]
- [[monsters/veilprayer-adept|veilprayer-adept]]
- [[monsters/voidglass-scout|voidglass-scout]]

## Pages with Malformed assetFolder
- None

## Pages with assetFolder Missing Trailing Slash
- None

## Pages with Missing assetFolder Directory
- None

## Pages with Missing Referenced Image Paths
- None
