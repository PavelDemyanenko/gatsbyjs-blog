import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

export default ({ data }) => {
  const {edges: posts} = data.allMarkdownRemark;
  const { nextPath, prevPath } = pathContext;
  return (
    <div>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {posts.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.frontmatter.path}>
            <h3>
              {node.frontmatter.title}{" "}
              <span>— {node.frontmatter.date}</span>
            </h3>
          </Link>
          <Img sizes={node.frontmatter.featuredImage.childImageSharp.sizes} />
          <p>{node.frontmatter.excerpt}</p>
          <ul>
            {node.frontmatter.tags.map (tag => {
              return (
                <li key={tag}>
                  <Link to={`/tags/${tag}`}>
                    {tag}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <div>
          {prevPath.length > 0 &&
          <Link style={{ boxShadow: 'none' }} to={prevPath}>
            &lt; Older posts
          </Link>
          }
          {nextPath.length > 0 &&
          <Link style={{ boxShadow: 'none' }} to={prevPath}>
            Newer posts &gt;
          </Link>
          }
        </div>
    </div>
  );
};

export const query = graphql `
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          html
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            path
            tags
            excerpt
            featuredImage {
              childImageSharp {
                sizes(maxWidth: 540) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
