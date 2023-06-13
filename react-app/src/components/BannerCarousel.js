import { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import '../css/BannerCarousel.css'

export default function BannerCarousel({ bannerURLs, lead }) {

  const [current, setCurrent] = useState(0);
  const length = bannerURLs.length
  const history = useHistory()

  useEffect(() => {
    let bannerInt = setInterval(() => {
      setCurrent(current === length - 1 ? 0 : current + 1)
    }, 5000)
    return () => {
      clearInterval(bannerInt)
    }
  }, [current])

  const next = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prev = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  if (!bannerURLs.length > 0) return null

  return (
    <section className={`${lead ? 'banner-slider' : 'bottom-banner-slider'}`}
      onClick={() => history.push('/comingsoon')}>
      {/* <div className='banner-arrow-prev'
        onClick={prev}>
        <i class="fa-solid fa-circle-arrow-left"
          onClick={prev}></i>
      </div> */}
      {/* <div className='banner-arrow-next'
        onClick={next}>
        <i class="fa-solid fa-circle-arrow-right"></i>
      </div> */}
      {bannerURLs.length > 0 && bannerURLs.map((banner, i) => (
        <div
          className={i === current ? 'slide active' : 'slide'}
          key={i}
        >
          {i === current && (
            <img src={banner.url} alt='banner image' className='banner-image' />
          )}
        </div>
      ))}
      {/* <i class="fa-solid fa-circle-arrow-left"
      ></i> */}
    </section>
  )
}
