import { createSrdClient } from "../srd/client.mjs"
import {
  listCollectionNames,
  loadReferenceDataset,
  resolveByStableId,
  resolveFromCollection,
} from "../srd/reference-cache.mjs"

const endpointOrder = [
  "ability-scores",
  "skills",
  "conditions",
  "damage-types",
  "languages",
  "equipment-categories",
  "equipment",
  "monsters",
  "spells",
]

const outputSection = (title, values) => {
  console.log(`\n${title}`)
  for (const value of values) {
    console.log(`- ${value}`)
  }
}

const parseFlags = () => {
  const args = process.argv.slice(2)
  return {
    detailId: args.find((arg) => arg.startsWith("--detail-id="))?.split("=")[1] ?? null,
  }
}

const main = async () => {
  const { detailId } = parseFlags()
  const { dataset, referencePath } = await loadReferenceDataset()

  console.log(`SRD NPC reference (local cache): ${referencePath}`)

  for (const endpoint of endpointOrder) {
    outputSection(endpoint, listCollectionNames({ dataset, endpoint }))
  }

  const sampleSkill = resolveFromCollection({
    dataset,
    endpoint: "skills",
    value: "sleight of hand",
  })
  const sampleDamageType = resolveFromCollection({
    dataset,
    endpoint: "damage-types",
    value: "piercing",
  })
  const sampleLanguage = resolveFromCollection({
    dataset,
    endpoint: "languages",
    value: "thieves' cant",
  })

  console.log("\nStable ID examples for NPC mechanics")
  console.log(`- Skills: ${sampleSkill?.id ?? "n/a"} (${sampleSkill?.name ?? "n/a"})`)
  console.log(
    `- Damage Type: ${sampleDamageType?.id ?? "n/a"} (${sampleDamageType?.name ?? "n/a"})`,
  )
  console.log(`- Language: ${sampleLanguage?.id ?? "n/a"} (${sampleLanguage?.name ?? "n/a"})`)

  if (!detailId) return

  const localMatch = resolveByStableId({ dataset, stableId: detailId })
  if (localMatch) {
    console.log(`\nLocal match for ${detailId}`)
    console.log(JSON.stringify(localMatch, null, 2))
    return
  }

  const [endpoint, index] = detailId.split(":")
  if (!endpoint || !index) {
    throw new Error(`Invalid detail ID: ${detailId}. Use endpoint:index format.`)
  }

  const client = createSrdClient()
  const details = await client.fetchByIndex(endpoint, index)
  console.log(`\nLive SRD detail for ${detailId}`)
  console.log(JSON.stringify(details, null, 2))
}

await main()
