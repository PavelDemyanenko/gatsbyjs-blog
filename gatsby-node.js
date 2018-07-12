/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const _ = require('lodash');
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

  const pageLength = 2

  const pageToPath = (index, pathPrefix, maxPages) => {
    if (pathPrefix !== null) {
      pathPrefix = `/${pathPrefix}`
    } else {
      pathPrefix = ''
    }

    if (index === 1) {
      return `${pathPrefix}/`
    }

    if (index > 1 && index <= maxPages) {
      return `${pathPrefix}/${index}`
    }

    return ''
  };

  const createPaginatedPages = ({
    edges,
    pathPrefix = null,
    component,
    context = {}
  }) => {
    const groupedPages = edges
      .map((edge, index) => {
        return index % pageLength === 0
          ? edges.slice(index, index + pageLength)
          : null
      })
      .filter(edge => edge);
    const maxPages = groupedPages.length;

    _.each(groupedPages, (group, index) => {
      const pageNumber = index + 1;

      return createPage({
        path: pageToPath(pageNumber, pathPrefix, maxPages),
        component: component,
        context: {
          group: group,
          nextPath: pageToPath(pageNumber - 1, pathPrefix, maxPages),
          prevPath: pageToPath(pageNumber + 1, pathPrefix, maxPages),
          extraContext: context
        }
      })
    })
  };

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('./src/templates/blog-post.js')
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
              featuredImage {
                childImageSharp {
                  sizes(maxWidth: 540) {
                    src
                    srcSet
                  }
                }
              }
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

      createPaginatedPages({
        edges: posts,
        component: path.resolve(`./src/templates/index.js`)
      })

      _.each(posts, (post, index) => {
        const previous = index === posts.length - 1 ? false : posts[index + 1].node;
        const next = index === 0 ? false : posts[index - 1].node;

        createPage({
          path: post.node.frontmatter.path,
          component: blogPostTemplate,
          context: {
            link: post.node.frontmatter.path,
            previous,
            next,
          },
        })
      })

      resolve()
    })
  })
};
