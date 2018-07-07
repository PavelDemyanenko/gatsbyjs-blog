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
    const path = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: 'path',
      value: path,
    })
  }
};

const createTagPages = (createPage, posts) => {
  const tagPageTemplate = path.resolve (`src/templates/tags.js`);
  const allTagsTemplate = path.resolve (`src/templates/all-tags.js`);

  const postsByTags = {};

  posts.forEach (({node}) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach (tag => {
        if (!postsByTags[tag]) {
          postsByTags[tag] = [];
        }
        postsByTags[tag].push (node);
      });
    }
  });

  const tags = Object.keys (postsByTags);

  createPage ({
    path: `/tags`,
    component: allTagsTemplate,
    context: {
      tags: tags.sort (),
    },
  });

  tags.forEach (tagName => {
    const posts = postsByTags[tagName];

    createPage ({
      path: `/tags/${tagName}`,
      component: tagPageTemplate,
      context: {
        posts,
        tagName,
      },
    });
  });
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  const blogPostTemplate = path.resolve('./src/templates/blog-post.js')

  return new Promise((resolve, reject) => {
    graphql(`{
      allMarkdownRemark {
        edges {
          node {
            html
            id
            frontmatter {
              date
              path
              title
              excerpt
              tags
            }
          }
        }
      }
    }
  `).then(result => {
      if (result.errors) {
        return Promise.reject (result.errors);
      }

      const posts = result.data.allMarkdownRemark.edges;

      createTagPages (createPage, posts)

      posts.forEach(({ node }, index) => {
        createPage({
          path: node.frontmatter.path,
          component: blogPostTemplate,
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            link: node.frontmatter.path,
            prev: index === 0 ? null : posts[index - 1].node,
            next: index === posts.length - 1 ? null : posts[index + 1].node,
          },
        })
      })
      resolve()
    })
  })
};
