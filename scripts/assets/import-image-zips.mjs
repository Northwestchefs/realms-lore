#!/usr/bin/env node
import fs from "node:fs/promises"
import path from "node:path"
import { spawn } from "node:child_process"

const repoRoot = process.cwd()
const stagingDir = path.resolve(repoRoot, "imports", "zips")
const outputBaseDir = path.resolve(repoRoot, "assets", "images")

function detectNpcMetadata(packName) {
  const name = packName.toLowerCase()

  const races = [
    "elf","drow","human","dwarf","halfling","gnome","orc","tiefling","dragonborn"
  ]

  const genders = ["female","male"]

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

async function generateGalleryPage(packName, imageFiles, meta) {
  const contentDir = path.resolve(repoRoot, "content", "npc-art", meta.race, meta.gender)

  await fs.mkdir(contentDir, { recursive: true })

  const pagePath = path.join(contentDir,