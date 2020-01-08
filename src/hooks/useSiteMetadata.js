import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          subtitle
          social {
            title
            icon
            link
          }
          socials {
            github
            twitter
            linkedin
            instagram
          }
          disqusShortname
          siteUrl
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export default useSiteMetadata
