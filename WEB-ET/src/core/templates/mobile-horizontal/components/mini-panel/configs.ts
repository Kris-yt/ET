import configs from '@shadow/components/mini-panel/configs.ts'

export default {
  sizeClassName: {
    s: 'mini-panel-container',
    m: 'mini-panel-container-m',
    l: 'mini-panel-container',
    b: 'mini-panel-container-b',
  },
  sizeBackgroundImage: {
    s: require('./i/bg.png?format=webp'),
    m: require('./i/bg-m.png?format=webp'),
    l: require('./i/bg-l.png?format=webp'),
    b: require('./i/bg-b.png?format=webp'),
  },
  ...configs,
}
