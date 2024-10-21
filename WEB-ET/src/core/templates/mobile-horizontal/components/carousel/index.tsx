/*
 * @Date: 2024-08-05 17:51:30
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/carousel/index.tsx
 * @Description:
 * 文档: https://github.com/leandrowd/react-responsive-carousel
 */
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import style from './style.module.scss'

const MyCarousel = (props) => {
  const {
    autoPlay = true,
    interval = 3000,
    showThumbs = false,
    showArrows = false,
    showStatus = false,
    infiniteLoop = true,
    className = '',
    stopOnHover = false,
    children,
    ...rest
  } = props

  return (
    <Carousel
      interval={interval}
      autoPlay={autoPlay}
      showThumbs={showThumbs}
      showArrows={showArrows}
      showStatus={showStatus}
      infiniteLoop={infiniteLoop}
      stopOnHover={stopOnHover}
      className={`${style['carousel-container']} ${className}`}
      {...rest}
    >
      {children}
    </Carousel>
  )
}

export default MyCarousel
