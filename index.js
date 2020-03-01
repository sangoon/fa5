const parser = require("xml2js").parseStringPromise;
const { readFile } = require("fs").promises;

const toIcon = ({ $: { "glyph-name": name, unicode } }) => ({
  name,
  id: name,
  unicode: escapeUnicode(unicode),
  created: 1
});

const toIcons = ({ svg: { defs } }) =>
  defs[0].font[0].glyph.reduce((acc, glyph) => {
    // console.log(glyph);
    return [...acc, toIcon(glyph)];
  }, []);

const escapeUnicode = str =>
  str.replace(/[\u00A0-\uffff]/gu, function(c) {
    return ("000" + c.charCodeAt().toString(16)).slice(-4);
  });

(async () => {
  const svg = await readFile(
    "/Users/sangoon/dev/sources/fa5/webfonts/fa-regular-400.svg"
  );
  console.log(JSON.stringify({ icons: toIcons(await parser(svg)) }));
  //   const svgString = parsedSvg.toString();
  //   console.log(JSON.stringify(parsedSvg, null, 2));
  //   const glyphs = svgString.match(/<glyph[^>]*?>/g);
  //   console.log(glyphs);
})();
