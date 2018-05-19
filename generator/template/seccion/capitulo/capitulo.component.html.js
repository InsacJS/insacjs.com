module.exports = (capitulo) => {
  let result = ``

  result += `<article class="markdown-body">

${capitulo.markdown}
</article>`

  return result
}
