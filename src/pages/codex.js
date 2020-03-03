import React from "react"
import { Link } from "gatsby"

import Layout from "../js/components/layout"
import Image from "../js/components/image"
import SEO from "../js/components/seo"

const CodexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>issa codex</h1>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default CodexPage
