import { unified } from 'unified';
import { md2hast, preprocessor } from '../dist/index.js'

const raw = `
  # HEADING
  ***bold***
  1. list 1
  2. list 2

  # TEST INTERPOLATION

  ${''/* this is valid interpolation */}
  {{interpolation}}

  !{{bangInterpolation}}

  ${''/* this is regular text */}
  {{f

  {{f}x

  {f}

  !!{}
`
const markdown = unified().use(md2hast)

const parsed = markdown.parse(preprocessor(raw))

console.log("Successfully 💪 parsed 📝 markdown")
console.log(JSON.stringify(parsed, undefined, 2))
