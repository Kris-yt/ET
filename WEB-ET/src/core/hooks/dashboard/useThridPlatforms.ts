/*
 * @Date: 2024-08-10 15:05:52
 * @FilePath: /AS-WEB-3.5/src/core/hooks/dashboard/useThridPlatforms.ts
 * @Description:
 */
import _ from 'lodash'
import { useState } from 'react'
import useGlobal from '../useGlobal'

export default () => {
  const { dispatch, ACTIONS } = useGlobal()
  const [platforms, setPlatforms] = useState<Record<string, any>[]>([])

  const getThirdPlatforms = () => {
    const uri = `api/game/thirdgametype`
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri,
        cache: { forward: true, expires: 1000 * 60 * 60 },
        cb: (res) => {
          const types = _.map(res.data, (value) => value)
          setPlatforms([{ code: $t('所有平台') }, ...types])
        },
      }),
    )
  }

  return {
    platforms,
    getThirdPlatforms,
  }
}
