/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`{
      allMarkdownRemark {
        edges {
          node {
            html
            id
            fields {
              slug
            }
            frontmatter {
              date
              path
              title
              excerpt
            }
          }
        }
      }
    }
  `).then(result => {
      if (result.errors) {
        return Promise.reject (result.errors);
      }
      const posts = result.data.allMarkdownRemark.edges
      const blogPostTemplate = path.resolve('./src/templates/blog-post.js')
      posts.forEach(({ node }, index) => {
        createPage({
          path: node.fields.slug,
          component: blogPostTemplate,
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
            prev: index === 0 ? null : posts[index - 1].node,
            next: index === posts.length - 1 ? null : posts[index + 1].node,
          },
        })
      })
      resolve()
    })
  })
};
