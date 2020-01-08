import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'
import { pages } from '../utils'

const PostsWrapper = styled.div`
  padding: 0 15px;
  max-width: 1060px;
  margin: 0 auto 35px;
`

const Blog = props => {
  const posts = props.data.allMdx.edges || []
  const siteUrl = props.data.site.siteMetadata.siteUrl
  return (
    <Layout location={props.location} active={pages.blog}>
      <div className="Blog">
        <SEO title="Blog" url={`${siteUrl}/blog`} />
        <Header title="Blog" color="#3fabbb" />
        <PostsWrapper>
          {posts.map(({ node }) => {
            if (node.frontmatter.published)
              return (
                <Card
                  data={{
                    title: node.frontmatter.title,
                    thumbnail: node.frontmatter.image.childImageSharp.sizes,
                    excerpt: node.excerpt,
                    date: node.frontmatter.date,
                    path: `/${node.fields.slug}`,
                    timeToRead: node.timeToRead
                  }}
                  key={node.frontmatter.path}
                />
              )
            else return false
          })}
          <Pagination
            limit={props.pageContext.limit}
            numPages={props.pageContext.numPages}
            currentPage={props.pageContext.currentPage}
          />
        </PostsWrapper>
      </div>
    </Layout>
  )
}

export const queryBlog = graphql`
  query QueryTagBlogList($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { model: { eq: "post" }, published: { eq: true } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 240)
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            path
            image {
              childImageSharp {
                sizes {
                  ...GatsbyImageSharpSizes_tracedSVG
                }
              }
            }
            published
          }
        }
      }
    }
  }
`

export default Blog
