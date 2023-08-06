import React from 'react'
import Card, { CardItem } from '../../Card'

const items: CardItem[] = [
  {
    title: 'Devloper Discord',
    Svg: require('@site/static/img/discord.svg').default,
    description: <>Chat with Band Protocol Developers on Discord.</>,
    to: 'https://100x.band/discord',
    target: '_blank',
  },
  {
    title: 'Telegram Group',
    Svg: require('@site/static/img/telegram.svg').default,
    description: <>Join our Telegram group to get support from our team.</>,
    to: 'https://100x.band/tg',
    target: '_blank',
  },
  {
    title: 'Found an Issue?',
    Svg: require('@site/static/img/github.svg').default,
    description: <>Help us improve this page by suggesting edits on GitHub.</>,
    to: 'https://github.com/bandprotocol/bandchain-docs/issues/new',
    target: '_blank',
  },
]

export default function HelpAndSupportSection(): JSX.Element {
  return (
    <section>
      <div className="card-wrapper">
        {items.map((props, idx) => (
          <Card key={idx} {...props} />
        ))}
      </div>
    </section>
  )
}
