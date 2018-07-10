// src/templates/index.js
import React from 'react';
import Link from 'gatsby-link'
import get from "lodash/get";
import Helmet from 'react-helmet'


class IndexPage extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const { data, pathContext } = this.props;
    const { group, nextPath, prevPath } = pathContext;

    return (
      <div>
        <Helmet title={siteTitle} />
        <Bio />
        {group.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3>
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <Img sizes={node.frontmatter.featuredImage.childImageSharp.sizes} />
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
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
          )
        })}
        <div>
          {prevPath.length > 0 &&
          <Link to={prevPath}>
            &lt; Older posts
          </Link>
          }
          {nextPath.length > 0 &&
          <Link to={prevPath}>
            Newer posts &gt;
          </Link>
          }
        </div>
      </div>
    )
  }
}

export default IndexPage;
