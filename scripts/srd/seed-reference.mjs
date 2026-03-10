import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import { createSrdClient } from "./client.mjs"
import { normalizeIndexItem } from "./normalize.mjs"

const OUTPUT_PATH = path.resolve("static/data/srd/reference.json")

const OFFLINE_SEED = {
  "ability-scores": [
    ["cha", "CHA"],
    ["con", "CON"],
    ["dex", "DEX"],
    ["int", "INT"],
    ["str", "STR"],
    ["wis", "WIS"],
  ],
  skills: [
    ["acrobatics", "Acrobatics"],
    ["animal-handling", "Animal Handling"],
    ["arcana", "Arcana"],
    ["athletics", "Athletics"],
    ["deception", "Deception"],
    ["history", "History"],
    ["insight", "Insight"],
    ["intimidation", "Intimidation"],
    ["investigation", "Investigation"],
    ["medicine", "Medicine"],
    ["nature", "Nature"],
    ["perception", "Perception"],
    ["performance", "Performance"],
    ["persuasion", "Persuasion"],
    ["religion", "Religion"],
    ["sleight-of-hand", "Sleight of Hand"],
    ["stealth", "Stealth"],
    ["survival", "Survival"],
  ],
  conditions: [
    ["blinded", "Blinded"],
    ["charmed", "Charmed"],
    ["deafened", "Deafened"],
    ["exhaustion", "Exhaustion"],
    ["frightened", "Frightened"],
    ["grappled", "Grappled"],
    ["incapacitated", "Incapacitated"],
    ["invisible", "Invisible"],
    ["paralyzed", "Paralyzed"],
    ["petrified", "Petrified"],
    ["poisoned", "Poisoned"],
    ["prone", "Prone"],
    ["restrained", "Restrained"],
    ["stunned", "Stunned"],
    ["unconscious", "Unconscious"],
  ],
  "damage-types": [
    ["acid", "Acid"],
    ["bludgeoning", "Bludgeoning"],
    ["cold", "Cold"],
    ["fire", "Fire"],
    ["force", "Force"],
    ["lightning", "Lightning"],
    ["necrotic", "Necrotic"],
    ["piercing", "Piercing"],
    ["poison", "Poison"],
    ["psychic", "Psychic"],
    ["radiant", "Radiant"],
    ["slashing", "Slashing"],
    ["thunder", "Thunder"],
  ],
  languages: [
    ["abyssal", "Abyssal"],
    ["celestial", "Celestial"],
    ["common", "Common"],
    ["deep-speech", "Deep Speech"],
    ["draconic", "Draconic"],
    ["druidic", "Druidic"],
    ["dwarvish", "Dwarvish"],
    ["elvish", "Elvish"],
    ["giant", "Giant"],
    ["gnomish", "Gnomish"],
    ["goblin", "Goblin"],
    ["halfling", "Halfling"],
    ["infernal", "Infernal"],
    ["orc", "Orc"],
    ["primordial", "Primordial"],
    ["sylvan", "Sylvan"],
    ["thieves-cant", "Thieves' Cant"],
    ["undercommon", "Undercommon"],
  ],
  "equipment-categories": [
    ["adventuring-gear", "Adventuring Gear"],
    ["armor", "Armor"],
    ["artisan-tools", "Artisan's Tools"],
    ["gaming-sets", "Gaming Sets"],
    ["mounts-and-vehicles", "Mounts and Vehicles"],
    ["musical-instruments", "Musical Instruments"],
    ["other-tools", "Other Tools"],
    ["ranged-weapons", "Ranged Weapons"],
    ["melee-weapons", "Melee Weapons"],
  ],
  equipment: [
    ["chain-mail", "Chain Mail"],
    ["club", "Club"],
    ["crossbow-light", "Crossbow, light"],
    ["dagger", "Dagger"],
    ["explorers-pack", "Explorer's Pack"],
    ["leather-armor", "Leather Armor"],
    ["longsword", "Longsword"],
    ["shield", "Shield"],
    ["shortbow", "Shortbow"],
    ["thieves-tools", "Thieves' Tools"],
  ],
  monsters: [
    ["goblin", "Goblin"],
    ["orc", "Orc"],
    ["skeleton", "Skeleton"],
    ["wolf", "Wolf"],
    ["young-red-dragon", "Young Red Dragon"],
  ],
  spells: [
    ["bless", "Bless"],
    ["cure-wounds", "Cure Wounds"],
    ["detect-magic", "Detect Magic"],
    ["fireball", "Fireball"],
    ["guidance", "Guidance"],
    ["mage-armor", "Mage Armor"],
    ["magic-missile", "Magic Missile"],
    ["shield", "Shield"],
  ],
}

const SEED_CONFIG = Object.keys(OFFLINE_SEED)

const compareText = (a, b) => {
  if (a === b) return 0
  return a < b ? -1 : 1
}

const toOfflineItems = (endpoint) =>
  OFFLINE_SEED[endpoint].map(([index, name]) => ({
    index,
    name,
    url: `/api/2014/${endpoint}/${index}`,
  }))

const toNormalizedItems = (endpoint, items, source) =>
  items.map((item) => ({
    ...normalizeIndexItem(endpoint, item),
    source,
  }))

const sortByStableFields = (items) =>
  [...items].sort((a, b) => {
    const byName = compareText(a.name.toLowerCase(), b.name.toLowerCase())
    if (byName !== 0) return byName

    const byIndex = compareText(a.index, b.index)
    if (byIndex !== 0) return byIndex

    return compareText(a.id, b.id)
  })

const mergeLiveAndOffline = ({ offlineItems, liveItems }) => {
  const mergedById = new Map(offlineItems.map((item) => [item.id, item]))

  for (const liveItem of liveItems) {
    mergedById.set(liveItem.id, liveItem)
  }

  return sortByStableFields([...mergedById.values()])
}

const getLiveItems = async (client, endpoint) => {
  try {
    const response = await client.listResources(endpoint)
    return response.results
  } catch (_error) {
    return []
  }
}

const seedReferenceData = async () => {
  const client = createSrdClient()
  const collections = {}

  for (const endpoint of SEED_CONFIG) {
    const offlineItems = toNormalizedItems(endpoint, toOfflineItems(endpoint), "offline-curated")
    const liveItems = toNormalizedItems(endpoint, await getLiveItems(client, endpoint), "5e-srd-api")

    collections[endpoint] = mergeLiveAndOffline({ offlineItems, liveItems })
  }

  const dataset = {
    generatedAt: new Date().toISOString(),
    source: {
      name: "D&D 5e SRD API (2014)",
      baseUrl: client.baseUrl,
    },
    mergePolicy: {
      summary: "Union of live SRD API data with local curated seed entries.",
      precedence: "Live API records override curated entries on ID conflicts.",
      localPreservation: "Curated entries remain when not returned by the live API.",
    },
    collections,
  }

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true })
  await writeFile(OUTPUT_PATH, `${JSON.stringify(dataset, null, 2)}\n`, "utf8")

  console.log(`Seeded SRD reference data: ${OUTPUT_PATH}`)
}

await seedReferenceData()
