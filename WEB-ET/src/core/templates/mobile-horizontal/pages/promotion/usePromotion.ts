/*
 * @Date: 2024-08-07 16:41:58
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/pages/promotion/usePromotion.ts
 * @Description:
 */
import { useState } from 'react'
import useGlobal from '@/core/hooks/useGlobal'

export default () => {
  const { dispatch, ACTIONS } = useGlobal()
  const [promotionList, setPromotionList] = useState<any>()

  const getPromotionList = () => {
    dispatch(
      ACTIONS.BASE.commonRequest({
        uri: 'api/activity/getNewList',
        cache: { expires: 60 * 60 * 24 * 7, forward: true },
        cb: (res: any) => {
          setPromotionList(res.data)
        },
      }),
    )
  }

  return {
    getPromotionList,
    promotionList,
  }
}
