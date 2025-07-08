import React from 'react'
// import styles from './styles.module.css'
import Card, { CardItem } from '../../Card'

const FeatureList: CardItem[] = [
  {
    title: 'Introduction to BandChain',
    iconPath: require('@site/static/img/icon/introduction.png').default,
    description: <>High-level overview of the BandChain</>,
    to: '/introduction/overview',
    target: '_self',
  },
  {
    title: 'Core Concepts',
    iconPath: require('@site/static/img/icon/core-concepts.png').default,
    description: (
      <>Learn about the core concepts of BandChain, including tokenomics, gas and fees, and more.</>
    ),
    to: '/core-concepts/token-economics',
    target: '_self',
  },
  {
    title: 'Developer Guides',
    iconPath: require('@site/static/img/icon/developer-guides.png').default,
    description: (
      <>
        Learn how to use Band's integration tools to integrate Band's data into your applications.
      </>
    ),
    to: '/develop/developer-guides/obi',
    target: '_self',
  },
  {
    title: 'Node & Validators',
    iconPath: require('@site/static/img/icon/validators.png').default,
    description: <>Learn how to run a BandChain node and become a validator to earn rewards.</>,
    to: '/node-validators/run-node/joining-mainnet/getting-started',
    target: '_self',
  },
  {
    title: 'Request-Based Data Feeds',
    iconPath: require('@site/static/img/icon/request-based-data-feed.png').default,
    description: (
      <>
        An open standard for creating custom price feeds that deliver highly efficient and secure
        data directly to smart contracts.
      </>
    ),
    to: '/develop/custom-scripts/data-source/introduction',
    target: '_self',
  },
  {
    title: 'Concurrent Price Stream',
    iconPath: require('@site/static/img/icon/concurrent-price-stream.png').default,
    description: (
      <>
        An open system for on-chain price signaling. List your tokens on transparent, permissionless
        price feeds based on market demand.
      </>
    ),
    to: '/concurrent-price-stream/introduction',
    target: '_self',
  },
  {
    title: 'VRF',
    iconPath: require('@site/static/img/icon/verifiable-random-function.png').default,
    description: (
      <>
        A provably fair, Verifiably Random Function. Built for Your Smart Contracts: bring
        transparent, secure, and tamper-proof randomness to your smart contracts with ease.
      </>
    ),
    to: '/verifiable-random-function/introduction',
    target: '_self',
  },
  {
    title: 'Membit',
    iconPath: require('@site/static/img/icon/membit.png').default,
    description: (
      <>
        A membit is a rule-based dataset living in a vector database, focused on a specific topic
        (e.g., social trends, market data).
      </>
    ),
    to: '/',
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
