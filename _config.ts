import lume from "lume/mod.ts";
import esbuild from "lume/plugins/esbuild.ts";
import sass from "lume/plugins/sass.ts";
import terser from "lume/plugins/terser.ts";
import date from "lume/plugins/date.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import sitemap from "lume/plugins/sitemap.ts";
import { imgcaption } from "./plugin/imgcaption.ts";
import lang_javascript from "highlightjs/languages/javascript.min.js";
import lang_lisp from "highlightjs/languages/lisp.min.js";
import lang_vim from "highlightjs/languages/vim.min.js";
import lang_bash from "highlightjs/languages/bash.min.js";

const markdown = {
  plugins: [imgcaption],
  keepDefaultPlugins: true,
};
const site = lume({
  src: "./src",
  location: new URL("https://saud.wtf"),
}, { markdown })
  .use(esbuild({
    options: {
      format: "iife",
      keepNames: false,
    },
  }))
  .use(sass())
  .use(terser())
  .use(date())
  .use(sitemap())
  .use(codeHighlight({
    languages: {
      javascript: lang_javascript,
      lisp: lang_lisp,
      vim: lang_vim,
      bash: lang_bash,
    },
  }))
  .remoteFile(
    "_includes/css/code.css",
    "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/monokai.min.css",
  )
  .copy("static", ".");

export default site;
