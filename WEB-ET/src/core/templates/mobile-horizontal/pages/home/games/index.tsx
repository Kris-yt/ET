/*
 * @Date: 2024-07-30 01:10:35
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/home/games/index.tsx
 * @Description:
 */

import style from './style.module.scss'

export default ({ gameList }) => {
  return (
    <div className={style['game-list']}>
      {gameList.map((item, index) => (
        <img src={item.imageUrl} alt="game" key={index} />
      ))}
    </div>
  )
}
