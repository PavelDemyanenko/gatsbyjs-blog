import React from 'react';
import Link from 'gatsby-link';

export default ({ data }) => {
  const posts = data.allMarkdownRemark
  return (
    <div>
      <h4>{posts.totalCount} Posts</h4>
      {posts.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.fields.slug}>
          <h3>
            {node.frontmatter.title}{" "}
            <span>— {node.frontmatter.date}</span>
          </h3>
          </Link>
          <p>{node.excerpt}</p>
        </div>
      ))}
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
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
