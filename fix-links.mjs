import { readFileSync, writeFileSync } from 'fs'

const files = [
  'src/pages/Home.jsx',
  'src/pages/Projects.jsx',
]

for (const file of files) {
  let text = readFileSync(file, 'utf8')

  // href="/something"  ->  href="${import.meta.env.BASE_URL}something"
  text = text.replace(/href="\/([^"]*)"/g, (match, path) => {
    return `href="\${import.meta.env.BASE_URL}${path}"`
  })

  // location.href='/something'  ->  location.href='${import.meta.env.BASE_URL}something'
  text = text.replace(/location\.href='\/([^']*)'/g, (match, path) => {
    return `location.href='\${import.meta.env.BASE_URL}${path}'`
  })

  // leftover legacy: location.href='projects.html'  ->  location.href='${import.meta.env.BASE_URL}projects'
  text = text.replaceAll("location.href='projects.html'", "location.href='${import.meta.env.BASE_URL}projects'")

  writeFileSync(file, text, 'utf8')
  console.log(`fixed ${file}`)
}
