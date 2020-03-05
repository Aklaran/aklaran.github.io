import React from "react"

import SEO from "../js/components/seo"
import PageCard from "../js/components/page-card"

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <PageCard title="YO!">
      <p>What's up homies. I'm Bo.<br/><br />
      This is gonna be my online home for now, and I swear I'm gonna legit build it.
      I always talk big shit, but in truth I'm a total newbie to the JAMStack and really any development outside of school.
      But here will be a place that I can show my progress :) and it's attached to my name so I should probably make it not suck.<br/><br/>
      I hope to develop this into a blog where I can share some concerted writing about whatever the hell I want,
      a portfolio to show why you should give me money,
      and a fun little playground to experiment with things that look cool and hone my web development and design skills.
      In the past, I've kept all of this work hidden from the public... but invariably I end up just dropping it because no one's watching.
      And probably still, no one's watching. But they <i>could be.</i><br/><br/>
      To keep track of my progress, I'll be posting a little board here when I add stuff to the site. I have no concrete timeline for anything,
      but I plan on implementing the blog first cuz I wanna wriiiiiite yo. Thanks for checkin' in!</p>
      <h1 style={{textAlign: 'center'}}>THE WALL OF GITTIN'R'DUN</h1>
      <ul>
        <li>4.3.2020 - Implemented Markdown Blog functionality :DD</li>
        <li>4.3.2020 - Made the page card and content for this page!</li>
        <li>3.3.2020 - Installed the typography.js package to simplify typography (for now... I'll definitely tweak it later)</li>
        <li>2.3.2020 - Nuked all the starter css and added a nifty mountain background/overlay combo alla <a href="http://gatsby-dimension.surge.sh">The Dimension Starter</a></li>
        <li>1.3.2020 - Reinstalled all the Node/Gatsby stuff and made a fresh new default starter project!</li>
        <li>29.2.2020 - Stayed up till 4am picking and buying a domain name. And in the end I went with aklarans.voyage?! Jeez what goes on in this guy's head...</li>
      </ul>
    </PageCard>
  </>
)

export default IndexPage
