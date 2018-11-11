// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-templates-all-tags-js": () => import("/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/src/templates/all-tags.js" /* webpackChunkName: "component---src-templates-all-tags-js" */),
  "component---src-templates-tags-js": () => import("/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/src/templates/tags.js" /* webpackChunkName: "component---src-templates-tags-js" */),
  "component---src-pages-index-js": () => import("/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-templates-index-js": () => import("/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/src/templates/index.js" /* webpackChunkName: "component---src-templates-index-js" */),
  "component---src-templates-blog-post-js": () => import("/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/src/templates/blog-post.js" /* webpackChunkName: "component---src-templates-blog-post-js" */),
  "component---cache-dev-404-page-js": () => import("/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/.cache/dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-404-js": () => import("/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */)
}

exports.data = () => import("/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/.cache/data.json")

