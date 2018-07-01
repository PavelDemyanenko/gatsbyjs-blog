import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

export default ({ data, pathContext}) => {
    const post = data.markdownRemark
    const {next, prev} = pathContext;
    return (
      <div>
        <Helmet title={`${post.frontmatter.title} - Pavel Demyanenko`}/>
        <div>
            <h1>{post.frontmatter.title}</h1>
            <h3>{post.frontmatter.date}</h3>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <p>
              {prev &&
                <Link to={prev.fields.slug}>
                  Previous: {prev.fields.title}
                </Link>
              }
            </p>
            <p>
              {next &&
                <Link to={next.fields.slug}>
                  Next: {next.fields.title}
                </Link>}
            </p>
        </div>
      </div>
    );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM, DD, YYYY")
      }
    }
  }
`;
