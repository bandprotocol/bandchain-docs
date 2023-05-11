import React from 'react'
import Card, { CardItem } from '../../Card'

const stacks: CardItem[] = [
  {
    title: 'Cosmos SDK',
    Svg: require('@site/static/img/cosmossdk.svg').default,
    description: <>The blockchain framework powering BandChain</>,
    to: '/',
    target: '_blank',
  },
  {
    title: 'WebAssembly',
    Svg: require('@site/static/img/WebAssembly_Logo.svg').default,
    description: <>The standard underpinning BandChain's data oracle script</>,
    to: '/',
    target: '_blank',
  },
  {
    title: 'ReScript',
    Svg: require('@site/static/img/rescript.svg').default,
    description: <>The core language of our CosmoScan block explorer</>,
    to: '/',
    target: '_blank',
  },
]

export default function DevelopmentStackSection(): JSX.Element {
  return (
    <section>
      <div className="card-wrapper">
        {stacks.map((props, idx) => (
          <Card key={idx} {...props} />
        ))}
      </div>
    </section>
  )
}
