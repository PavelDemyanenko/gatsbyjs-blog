var plugins = [{
      plugin: require('/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-58342253-1","head":false,"anonymize":true,"respectDNT":true,"exclude":["/preview/**","/do-not-track/me/too/"]},
    },{
      plugin: require('/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/node_modules/gatsby-plugin-canonical-urls/gatsby-ssr'),
      options: {"plugins":[],"siteUrl":"https://www.paveldemyanenko.com/blog"},
    },{
      plugin: require('/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Pavel Demyanenko's Programming Blog","short_name":"Pavel Demyanenko`s Programming Blog","start_url":"https://www.paveldemyanenko.com/blog","background_color":"#fff","theme_color":"#007acc","display":"minimal-ui","icons":[{"src":"/favicons/favicon.png","sizes":"64x64","type":"image/png"},{"src":"/favicons/640x640.png","sizes":"640x640","type":"image/png"}]},
    },{
      plugin: require('/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
