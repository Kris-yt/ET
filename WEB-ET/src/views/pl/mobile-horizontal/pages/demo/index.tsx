/*
 * @Date: 2024-07-30 23:41:41
 * @FilePath: /AS-WEB-3.5/src/views/pl/mobile-horizontal/pages/demo/index.tsx
 * @Description:
 */
import { useState } from 'react'
import Button from '@shadow/components/button'
import PanelButton from '@shadow/components/panel/button'
import Panel from '@shadow/components/panel'
import MiniPanel from '@shadow/components/mini-panel'
import InputText from '@shadow/components/input-text'
import Select from '@shadow/components/select'
import SelectMini from '@shadow/components/select/mini'
import Carousel from '@shadow/components/carousel'
import Copy from '@shadow/components/copy'
import Overlay from '@base-ui/components/overlay'
import useGlobal from '@/core/hooks/useGlobal'
import { privacyPolicyText, bannerImages } from './const'
import style from './style.module.scss'
import NoData from '@shadow/components/no-data'

export default () => {
  const [showMiniPanel, setShowMiniPanel] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState<string | number>('1')
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
  const [showCarousel, setShowCarousel] = useState(false)

  const { dispatch, ACTIONS } = useGlobal()

  const handleOpenAlert = () => {
    dispatch(
      ACTIONS.BASE.openAlert({
        title: 'Alert确认框',
        content: '这是一个Alert确认框,',
        cb: () => console.log('确定'),
      }),
    )
  }

  const handleOpenConfirm = () => {
    dispatch(
      ACTIONS.BASE.openConfirm({
        title: 'Confirm确认框',
        content: '这是一个Confirm确认框',
        actions: [
          { text: '取消', type: 'cancel' },
          { text: '确定', cb: () => console.log('确定') },
        ],
      }),
    )
  }

  const handleOpenToast = () => {
    dispatch(
      ACTIONS.BASE.openToast({
        text: '这是一个Toast提示',
        type: 'success',
      }),
    )
  }

  const handleOpenLoading = () => {
    dispatch(ACTIONS.BASE.openLoading())
    setTimeout(() => {
      dispatch(ACTIONS.BASE.closeLoading())
    }, 3000)
  }

  return (
    <div className={style.demo}>
      <div>
        <Button>按钮1-md</Button>
        <Button type="cancel">按钮2-md</Button>
        <Button size="sm">按钮1-sm</Button>
        <Button size="sm" type="cancel">
          按钮2-sm
        </Button>
      </div>
      <div>
        <PanelButton>按钮-未选中</PanelButton>
        <PanelButton state="checked">按钮-选中</PanelButton>
        <PanelButton size="lg">按钮-未选中</PanelButton>
        <PanelButton size="lg" state="checked">
          按钮-选中
        </PanelButton>
        <Button onClick={() => setShowMiniPanel(true)}>显示MiniPanel</Button>
      </div>
      <div>
        <Button onClick={() => setShowPrivacyPolicy(true)}>隐私政策</Button>
        <Button onClick={handleOpenAlert}>Alert提示框</Button>
        <Button onClick={handleOpenConfirm}>Confirm确认框</Button>
        <Button onClick={handleOpenToast}>Toast提示</Button>
        <Button onClick={handleOpenLoading}>全局Loading</Button>
      </div>
      <div>
        <Button onClick={() => setShowCarousel(true)}>轮播图组件</Button>
        <Copy text="我要复制这段文字！">
          <Button>复制文本</Button>
        </Copy>
      </div>
      <div>
        <InputText placeholder="方形输入" shape="square" />
        <InputText placeholder="圆形输入" />
        <Select
          options={[
            { value: '1', label: '选项1' },
            { value: '2', label: '选项2' },
            { value: '3', label: '选项3' },
          ]}
          value={selectValue}
          onSelected={(value) => setSelectValue(value)}
          placeholder="请选择..."
        />
      </div>
      <div>
        <InputText
          placeholder="请输入xxxxx"
          leftNode={<span className={style['phone-code']}>+63</span>}
        />
        <InputText
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="请输入xxxxx"
          rightNode={<span className={style['checkcode']}>23s</span>}
        />
        <SelectMini
          options={[
            { value: '1', label: '选项1' },
            { value: '2', label: '选项2' },
            { value: '3', label: '选项3' },
          ]}
          value={selectValue}
          onSelected={(value) => setSelectValue(value)}
          placeholder="请选择..."
        />
      </div>
      <div>
        <InputText placeholder="请输入xxxxx" tips="默认提示信息..." />
        <InputText
          placeholder="请输入xxxxx"
          tips={<span className={style['cus-tips']}>自定义提示</span>}
        />
      </div>
      <MiniPanel
        title="MiniPanel"
        display={showMiniPanel}
        onClose={() => setShowMiniPanel(false)}
      >
        {/* <div>Contents....</div> */}
        <NoData tag="td" />
      </MiniPanel>
      {showPrivacyPolicy && (
        <Panel
          type="modal"
          title="隐私政策"
          mode="board"
          onClose={() => setShowPrivacyPolicy(false)}
          display
        >
          <div>{privacyPolicyText}</div>
        </Panel>
      )}
      <Overlay display={showCarousel}>
        <div
          className={style['go-back']}
          onClick={() => setShowCarousel(false)}
        />
        <Carousel>
          {bannerImages.map((item, index) => (
            <div key={index}>
              <img src={item} alt={`banner-${index}`} />
            </div>
          ))}
        </Carousel>
      </Overlay>
    </div>
  )
}
