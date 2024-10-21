/*
 * @Date: 2024-08-21 10:50:56
 * @FilePath: /AS-WEB-3.5/src/core/hooks/game/useGameIframe.ts
 * @Description:
 */
import useGlobal from '../useGlobal'
import { useNavigate } from 'react-router-dom'

export default () => {
  const navigate = useNavigate()
  const { dispatch, ACTIONS } = useGlobal()

  const getGameIframe = ({ platform }: IGetGameIfame) => {
    const uri = `api/game/${platform}/playurl`
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri: uri,
        method: 'GET',
        loading: true,
        cb: (res: any) => {
          if (res.status == 10000) {
            navigate('/gamelobby/iframe', { state: res.data.url })
          }
        },
      }),
    )
  }

  return {
    getGameIframe,
  }
}

export interface IGetGameIfame {
  platform: string
}
