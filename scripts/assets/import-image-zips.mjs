#!/usr/bin/env node
import fs from "node:fs/promises"
import path from "node:path"
import { spawn } from "node:child_process"

const repoRoot = process.cwd()
const stagingDir = path.resolve(repoRoot, "imports", "zips")
const outputBaseDir = path.resolve(repoRoot, "assets", "images")

/* -----------------------------
   Metadata extraction
-------------------------------- */

function extractNpcMetadataFromFilename(filename) {
  const name = filename.toLowerCase().replace(/\.[^/.]+$/, "")
  const words = name.split(/\s+/)

  const races = ["elf","drow","human","dwarf","halfling","gnome","orc","tiefling","dragonborn"]
  const genders = ["female","male"]
  const classes = [
    "wizard","sorcerer","warlock","cleric","paladin","fighter",
    "ranger","rogue","monk","bard","druid","barbarian"
  ]

  const race = races.find(r => words.includes(r)) || "unknown"
  const gender = genders.find(g => words.includes(g)) || "unknown"
  const npcClass = classes.find(c => words.includes(c)) || "npc"

  const traits = words.filter(
    w => !races.includes(w) && !genders.includes(w) && !classes.includes(w)
  )

  return { race, gender, npcClass, traits }
}

/* -----------------------------
   Gallery generator
-------------------------------- */

async function generateGalleryPage(race, gender, npcClass, images) {

  const galleryDir = path.resolve(repoRoot, "content", "npc-art", race, gender)
  await fs.mkdir(galleryDir, { recursive: true })

  const pageName = `${race}-${gender}-${npcClass}.md`
  const pagePath = path.join(galleryDir, pageName)

  const imageLinks = images
    .map(img =>
      `![](/assets/images/npcs/${race}/${gender}/${npcClass}/${img})`
    )
    .join("\n\n")

  const markdown = `# ${race} ${gender} ${npcClass}

${imageLinks}
`

  await fs.writeFile(pagePath, markdown)
}

/* -----------------------------
   ZIP extractor detection
-------------------------------- */

let zipCommand = null

async function findZipTool() {

  const candidates = ["unzip","7z","7za"]

  for (const cmd of candidates) {
    try {
      await new Promise((resolve,reject)=>{
        const child = spawn(cmd,["--help"],{stdio:"ignore"})
        child.on("error",reject)
        child.on("close",()=>resolve())
      })
      return cmd
    } catch {}
  }

  return null
}

async function ensureZipTool() {

  zipCommand = await findZipTool()

  if(!zipCommand){
    throw new Error("No zip extractor found (install unzip or 7-Zip)")
  }

  console.log(`Using extractor: ${zipCommand}`)
}

/* -----------------------------
   Extract ZIP
-------------------------------- */

function extractZip(zipPath,destDir){

  return new Promise((resolve,reject)=>{

    const args =
      zipCommand === "unzip"
        ? ["-o",zipPath,"-d",destDir]
        : ["x",zipPath,`-o${destDir}`,"-y"]

    const child = spawn(zipCommand,args,{stdio:"inherit"})

    child.on("close",(code)=>{
      if(code !== 0) reject(new Error(`Failed extracting ${zipPath}`))
      else resolve()
    })

  })
}

/* -----------------------------
   Collect ZIP files
-------------------------------- */

async function collectZips(){

  try{

    const entries = await fs.readdir(stagingDir,{withFileTypes:true})

    return entries
      .filter(e=>e.isFile() && e.name.endsWith(".zip"))
      .map(e=>path.join(stagingDir,e.name))

  }catch{
    return []
  }
}

/* -----------------------------
   Main importer
-------------------------------- */

async function main(){

  await ensureZipTool()

  const zipFiles = await collectZips()

  if(!zipFiles.length){
    console.log("No ZIP files found.")
    return
  }

  for(const zip of zipFiles){

    const packName = path.basename(zip,".zip")

    const tempDir = path.join(repoRoot,".tmp-import",packName)
    await fs.mkdir(tempDir,{recursive:true})

    console.log(`Extracting ${packName}`)
    await extractZip(zip,tempDir)

    const files = await fs.readdir(tempDir)

    const galleryIndex = {}

    for(const file of files){

      if(!file.match(/\.(png|jpg|jpeg|webp)$/i)) continue

      const meta = extractNpcMetadataFromFilename(file)

      const destDir = path.join(
        outputBaseDir,
        "npcs",
        meta.race,
        meta.gender,
        meta.npcClass
      )

      await fs.mkdir(destDir,{recursive:true})

      const src = path.join(tempDir,file)
      const dest = path.join(destDir,file)

      await fs.rename(src,dest)

      const key = `${meta.race}-${meta.gender}-${meta.npcClass}`

      if(!galleryIndex[key]){
        galleryIndex[key] = { ...meta, images: [] }
      }

      galleryIndex[key].images.push(file)

      /* Write JSON metadata */
      const jsonPath = dest.replace(/\.(png|jpg|jpeg|webp)$/,".json")
      await fs.writeFile(jsonPath,JSON.stringify(meta,null,2))

    }

    /* Build gallery pages */

    for(const key in galleryIndex){

      const entry = galleryIndex[key]

      await generateGalleryPage(
        entry.race,
        entry.gender,
        entry.npcClass,
        entry.images
      )

    }

  }

  console.log("Import complete.")
}

main().catch(err=>{
  console.error(err)
  process.exit(1)
})