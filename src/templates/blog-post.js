import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Disqus from 'disqus-react'
import get from 'lodash/get'

const BlogPostTemplate = ({data, pathContext}) => {
  const {markdownRemark: post} = data;
  const {frontmatter, html} = post;
  const {title, date} = frontmatter;
  const {next, previous} = pathContext;

  const siteTitle = data.site.siteMetadata.title;
  const siteUrl = data.site.siteMetadata.siteUrl;
  const shareIconSize = 32;

  const disqusShortname = 'pavel-demyanenko-programming-blog';
  const url = 'https://www.paveldemyanenko.com/blog/' + post.frontmatter.path;
  let disqusArticleIdentifier;
  if (post.frontmatter.disqusArticleIdentifier) {
    disqusArticleIdentifier = post.frontmatter.disqusArticleIdentifier;
  } else {
    disqusArticleIdentifier = post.frontmatter.path;
  }
  const disqusConfig = {
    url: url,
    identifier: disqusArticleIdentifier,
    title: post.frontmatter.title
  };
  let disqus = null;
  if (typeof window !== 'undefined') {
    disqus = (
      <Disqus.DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    );
  }

  return (
    <div>
      <Helmet title={`${title} - My Blog`} />
      <div>
        <div dangerouslySetInnerHTML={{__html: html}} />
        {disqus}
        <p>
          {previous &&
            <Link to={previous.frontmatter.path}>
              Previous: {previous.frontmatter.title}
            </Link>}
        </p>
        <p>
          {next &&
            <Link to={next.frontmatter.path}>
              Next: {next.frontmatter.title}
            </Link>}
        </p>
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        excerpt
        disqusArticleIdentifier
      }
    }
  }
`;

export default BlogPostTemplate;
