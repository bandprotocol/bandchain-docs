import React from 'react'
// import styles from './styles.module.css'
import Card, { CardItem } from '../../Card'

const FeatureList: CardItem[] = [
  {
    title: 'Introduction to BandChain',
    iconPath: require('@site/static/img/Introduction.png').default,
    description: <>High-level overview of the BandChain</>,
    to: '/introduction/overview',
    target: '_self',
  },
  {
    title: 'Core Concepts',
    iconPath: require('@site/static/img/Core_Concepts.png').default,
    description: (
      <>Learn about the core concepts of BandChain, including tokenomics, gas and fees, and more.</>
    ),
    to: '/core-concepts/token-economics',
    target: '_self',
  },
  {
    title: 'Products',
    iconPath: require('@site/static/img/Products.png').default,
    description: (
      <>
        Learn about the products that BandChain offers, including the Standard Dataset and ,VRF, and
        more.
      </>
    ),
    to: '/products/band-standard-dataset/introduction',
    target: '_self',
  },
  {
    title: 'Developer Guides',
    iconPath: require('@site/static/img/Guides.png').default,
    description: (
      <>
        Learn how to use Band's integration tools to integrate Band's oracle data into your
        applications.
      </>
    ),
    to: '/develop/developer-guides/obi',
    target: '_self',
  },
  {
    title: 'Node & Validators',
    iconPath: require('@site/static/img/Nodes.png').default,
    description: <>Learn how to run a BandChain node and become a validator to earn rewards.</>,
    to: '/node-validators/run-node/joining-mainnet/getting-started',
    target: '_self',
  },
]

export default function GetStartedSection(): JSX.Element {
  return (
    <section>
      <div className="card-wrapper">
        {FeatureList.map((props, idx) => (
          <Card key={idx} {...props} />
        ))}
      </div>
    </section>
  )
}
