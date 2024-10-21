import Overlay from '@base-ui/components/overlay'
import Background from '@base-ui/components/background'
import style from './style.module.scss'
import { useState, useEffect } from 'react'
export default ({ onClose }) => {
  const [dismodal, setdisModal] = useState(false)
  useEffect(() => {
    const orientation = window.innerWidth > window.innerHeight ? false : true
    if (orientation) {
      setdisModal(true)
    }
  }, [])
  const list = [
    {
      title: 'Responsible Gaming',
      contents: [
        'REMINDER : This game is intended for recreational purposes only. Players are encouraged to play responsibly. Gambling is prohibited for minors and should not be conducted in open and public spaces.',
        'Legend Link aims to provide memorable, fun, and entertaining gaming experiences while prioritizing Responsible Gaming. Our commitment extends to the prevention of problem and underage gambling, as we prioritize the well-being of our players.',
        'At Legend Link, we are fully aware of the potential risks associated with gambling, and we take proactive measures to address these concerns. We understand the importance of creating a safe and enjoyable environment for all our customers, and part of this commitment involves training our staff to provide assistance to those who may need help, ensuring a discreet and confidential approach to support.',
      ],
    },
    {
      title: 'Excluded Persons',
      contents: [
        'Legend Link is committed in promoting gaming as alternative form of entertainment and leisure where stakeholders undertake a shared responsibility to ensure gaming decisions are informed and that gaming behavior is socially responsible.',
        'persons under 21 years of age, Pursuant to Malacañang Memorandum Circular No. 8, the following are also not allowed to enter, stay, and/or play in the gaming establishment/platform.',
        '1. Government officials and employees connected directly with the operation of the government or any of its agencies; and',
        '2. Members of the Philippine National Police (PNP) and Armed Forces of the Philippines (AFP).',
        '3. PAGCOR officials and employees;',
        '4. Unregistered players;',
        '5. Banned individuals;',
        '6. Spouse, common-law partner, children, parents of officials and persons mentioned in items (1), (2), and (4) above.',
        '7. Persons included to the National Database of Restricted Persons;',
        '8. Gaming Employment License (GEL) holders; and',
        '9. Financiers/Loan Sharks and the like.',
        'Legend Link has the right to deny application or terminate the membership of any individual who violates the terms and conditions of the membership or provides false or inaccurate information during the membership registration.',
      ],
    },
    {
      title: 'Gambling Addiction',
      contents: [
        "Gambling can stimulate the brain's reward system much like drugs or alcohol can, leading to addiction. If you have a problem with compulsive gambling, you may continually chase bets that lead to losses, use up savings and create debt. You may hide your behavior and even turn to theft or fraud to support your addiction.",
        'Signs and symptoms of compulsive gambling (gambling disorder) can include:',
        '•	Being preoccupied with gambling, such as constantly planning gambling activities and how to get more gambling money',
        '•	Needing to gamble with increasing amounts of money to get the same thrill',
        '•	Trying to control, cut back or stop gambling, without success',
        '•	Feeling restless or irritable when you try to cut down on gambling',
        '•	Gambling to escape problems or relieve feelings of helplessness, guilt, anxiety or depression',
        '•	Trying to get back lost money by gambling more (chasing losses)',
        '•	Lying to family members or others to hide the extent of your gambling',
        '•	Risking or losing important relationships, a job, or school or work opportunities because of gambling',
        '•	Asking others to bail you out of financial trouble because you gambled money awa',
      ],
    },
    {
      title: 'When to see a doctor or mental health professional',
      contents: [
        'Have family members, friends or co-workers expressed concern about your gambling? If so, listen to their worries. Because denial is almost always a feature of compulsive or addictive behavior, it may be difficult for you to realize that you have a problem.',
      ],
    },
    {
      title: 'WHERE TO SEEK HELP FOR GAMBLING-RELATED CONCERNS',
      contents: [
        'If you feel that you or a family member has a gambling problem, you may contact our customer support at: (customer service e-mail/phone). You may directly contact the following help centers:',
        'Life Change Recovery Center   Dr. Randy Misael S. Dellosa   105 Scout Rallos Street, Kamuning   Brgy. Sacred Heart, Quezon City   Telephone numbers: (02) 415-7964 / 415-6529Website: www.lifechangerecoverycenter.com',
        'Bridges of Hope Drugs and Alcohol Rehabilitation Foundation, Inc. Headquarters:364 Aguirre Avenue, Phase 3, BF Homes, Parañaque City, Metro Manila  Tel. No. (02) 622-0193',
        'New Manila Branch: 12 Orestes Lane, Mariposa Street Tel. No. (02) 502-0600; (0917) 856-0623 Email: help@bridgesofhope.ph',
      ],
    },
    {
      title: 'Exclusion Program',
      contents: [
        'PAGCOR manages the exclusion program which will be able to exclude you from gambling in all PAGCOR operated and regulated establishments.',
        'The forms and procedures can be found on this link: https://pagcor.ph/regulatory/exclusion2.php. There are two types of exclusion programs:',
        '1. Self-Exclusion',
        'You can request for an exclusion period of 6 months, 1 year or 5 years. After the lapse of your selected period, the exclusion order will be lifted automatically;',
        'The six-month exclusion period is irrevocable;',
        'Extensions may be granted for at least six (6) months;',
        '2. Family Exclusion ',
        'Any one of the following family members can request for exclusion: spouse, child at least 18 years of age and a parent;',
        'Applicant may request for an exclusion period of 6 months, 1 year or 3 years. After completion of the exclusion period, the family exclusion order will be lifted automatically unless the family re-applies for exclusion.',
        'You can contact PAGCOR for any concerns or clarifications at keepitfun@pagcor.ph.',
      ],
    },
  ]
  return (
    <Overlay display={!dismodal} zIndex={9}>
      <Background
        className={style['panel-container']}
        src={require('./i/agreement-bg.png?format=webp')}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className={style['close']} onClick={onClose}>
          <img src={require('./i/close.png?format=webp')} />
        </div>
        <ul className={style['rule-container']}>
          {list.map((item, index) => (
            <li key={index}>
              <h4>{item.title}</h4>
              {item.contents.map((content, i) => (
                <p key={i}>{content}</p>
              ))}
            </li>
          ))}
        </ul>
      </Background>
    </Overlay>
  )
}
