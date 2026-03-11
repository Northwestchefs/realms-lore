#!/usr/bin/env node
import fs from "node:fs/promises"
import path from "node:path"
import { spawn } from "node:child_process"
function detectNpcMetadata(packName) {
  const name = packName.toLowerCase()

  const races = [
    "elf",
    "drow",
    "human",
    "dwarf",
    "halfling",
    "gnome",
    "orc",
    "tiefling",
    "dragonborn",
  ]

  const genders = ["female", "male"]

  let race = "misc"
  let gender = "unknown"

  for (const r of races) {
    if (name.includes(r)) race = r
  }

  for (const g of genders) {
    if (name.includes(g)) gender = g
  }

  return { race, gender }
}
const repoRoot = process.cwd()
const stagingDir = path.resolve(repoRoot, "imports", "zips")
const outputBaseDir = path.resolve(repoRoot, "assets", "images")

async function generateGalleryPage(packName, imageFiles) {
  const contentDir = path.resolve(repoRoot, "content", "npc-art")

  await fs.mkdir(contentDir, { recursive: true })

  const pagePath = path.join(contentDir, `${packName}.md`)

  const imageLinks = imageFiles
    .filter((img) => !img.startsWith("."))
    .map((img) => `![](/assets/images/npcs/${meta.race}/${meta.gender}/${packName}/${img})`)
    .join("\n\n")

  const markdown = `# ${packName}

${imageLinks}
`

  await fs.writeFile(pagePath, markdown)
}

let zipCommand = null

const findCommand = async () => {
  const candidates = ["unzip", "7z", "7za"]

  for (const cmd of candidates) {
    try {
      await new Promise((resolve, reject) => {
        const child = spawn(cmd, ["--help"], { stdio: "ignore" })
        child.on("error", reject)
        child.on("close", () => resolve())
      })
      return cmd
    } catch {}
  }

  return null
}

const ensureZipTool = async () => {
  zipCommand = await findCommand()

  if (!zipCommand) {
    throw new Error("No zip extractor found. Install `unzip` or `7zip`.")
  }

  console.log(`Using extractor: ${zipCommand}`)
}

const extractZip = (zipPath, destDir) =>
  new Promise((resolve, reject) => {
    const args =
      zipCommand === "unzip"
        ? ["-o", zipPath, "-d", destDir]
        : ["x", zipPath, `-o${destDir}`, "-y"]

    const child = spawn(zipCommand, args, { stdio: "inherit" })

    child.on("close", (code) => {
      if (code !== 0) reject(new Error(`Failed extracting ${zipPath}`))
      else resolve()
    })
  })

const collectZips = async () => {
  try {
    const entries = await fs.readdir(stagingDir, { withFileTypes: true })

    return entries
      .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".zip"))
      .map((e) => path.join(stagingDir, e.name))
  } catch {
    return []
  }
}

const main = async () => {
  await ensureZipTool()

  const zipFiles = await collectZips()

  if (!zipFiles.length) {
    console.log("No zip files found.")
    return
  }

  for (const zip of zipFiles) {
  const name = path.basename(zip, ".zip")

  const meta = detectNpcMetadata(name)

  const dest = path.join(
    outputBaseDir,
    "npcs",
    meta.race,
    meta.gender,
    name
  )

const dest = path.join(
  outputBaseDir,
  "npcs",
  meta.race,
  meta.gender,
  name
)

    await fs.mkdir(dest, { recursive: true })

    console.log(`Extracting ${name} → ${dest}`)
    await extractZip(zip, dest)

    const files = await fs.readdir(dest)
    await generateGalleryPage(name, files)
  }

  console.log("Import complete.")
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})