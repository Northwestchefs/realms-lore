import path from "node:path"
import { readFile } from "node:fs/promises"

const DEFAULT_REFERENCE_PATH = path.resolve("static/data/srd/reference.json")

const normalizeLookupValue = (value) => value.trim().toLowerCase()

const loadReferenceDataset = async (options = {}) => {
  const referencePath = options.referencePath ?? DEFAULT_REFERENCE_PATH
  const raw = await readFile(referencePath, "utf8")
  const dataset = JSON.parse(raw)

  if (!dataset.collections) {
    throw new Error(`Invalid SRD reference dataset: missing collections (${referencePath})`)
  }

  return {
    dataset,
    referencePath,
  }
}

const getCollection = (dataset, endpoint) => dataset.collections[endpoint] ?? []

const buildNameLookup = (items) =>
  new Map(items.map((item) => [normalizeLookupValue(item.name), item]))

const buildIdLookup = (items) => new Map(items.map((item) => [item.id, item]))

const resolveFromCollection = ({ dataset, endpoint, value }) => {
  const items = getCollection(dataset, endpoint)
  const lookup = buildNameLookup(items)
  return lookup.get(normalizeLookupValue(value)) ?? null
}

const listCollectionNames = ({ dataset, endpoint }) =>
  getCollection(dataset, endpoint).map((item) => item.name)

const listCollectionIds = ({ dataset, endpoint }) =>
  getCollection(dataset, endpoint).map((item) => item.id)

const resolveByStableId = ({ dataset, stableId }) => {
  const [endpoint] = stableId.split(":")
  const items = getCollection(dataset, endpoint)
  const lookup = buildIdLookup(items)
  return lookup.get(stableId) ?? null
}

export {
  DEFAULT_REFERENCE_PATH,
  getCollection,
  listCollectionIds,
  listCollectionNames,
  loadReferenceDataset,
  resolveByStableId,
  resolveFromCollection,
}
