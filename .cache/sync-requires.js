// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-all-tags-js": preferDefault(require("/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/src/templates/all-tags.js")),
  "component---src-templates-tags-js": preferDefault(require("/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/src/templates/tags.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/src/pages/index.js")),
  "component---src-templates-index-js": preferDefault(require("/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/src/templates/index.js")),
  "component---src-templates-blog-post-js": preferDefault(require("/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/src/templates/blog-post.js")),
  "component---cache-dev-404-page-js": preferDefault(require("/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/src/pages/404.js"))
}

