module.exports = {
    siteMetadata: {
        title: `ASP.NET Core Gatsby`,
    },
    plugins: [

        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-emotion`,
        `gatsby-plugin-typescript`,
        `gatsby-plugin-tslint`,
        'gatsby-plugin-antd',
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-robots-txt`,
            options: {
                env: {
                    development: {
                        policy: [{ userAgent: '*', disallow: ['/apps/*'] }]
                    }
                }
            }
        }
    ],
}
