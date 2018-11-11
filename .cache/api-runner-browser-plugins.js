module.exports = [{
      plugin: require('/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/node_modules/gatsby-plugin-google-analytics/gatsby-browser'),
      options: {"plugins":[],"trackingId":"UA-58342253-1","head":false,"anonymize":true,"respectDNT":true,"exclude":["/preview/**","/do-not-track/me/too/"]},
    },{
      plugin: require('/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/node_modules/gatsby-plugin-canonical-urls/gatsby-browser'),
      options: {"plugins":[],"siteUrl":"https://www.paveldemyanenko.com/blog"},
    },{
      plugin: require('/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/node_modules/gatsby-plugin-offline/gatsby-browser'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/paveldemyanenko/Documents/projects/gatsbyjs-blog/gatsby-browser.js'),
      options: {"plugins":[]},
    }]
