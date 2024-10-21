/*
 * @Date: 2024-07-31 12:14:36
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/business-modals/term-services/index.tsx
 * @Description:
 */
import style from './style.module.scss'
import Panel from '@shadow/components/panel/index'
export default ({ onClose }: { onClose: () => void }) => {
  return (
    <Panel
      type="modal"
      mode="board"
      title={$t('网站协议')}
      display
      onClose={onClose}
    >
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
    </Panel>
  )
}

const list = [
  {
    title: "I. Member's Basic Information",
    contents: [
      'To become a Legend Link Member, new players may either personally register onsite or through remote/online registration. Mandatory information of the player and one (1) valid governmentissued Identification (ID) Card must be presented. Only persons twenty-one (21) years of age and above and not among the banned personalities as provided under the Memorandum Circular No. 6, series of 2016, of The Office Of The President, shall strictly be allowed to register and avail of the services of a remote gaming platform.',
    ],
  },
  {
    title: 'II. Communications Opt In',
    contents: [
      'In order to improve your experience with us, Legend Link may send you communication materials, including but not limited to administrative and law mandated announcements, projects, campaigns or promotional materials. º E-mail º SMS º Phone Calls º Social Media (Facebook, Instagram, Twitter and the like)',
      'º E-mail º SMS º Phone Calls',
      'º E-mail º SMS º Phone Calls',
    ],
  },
  {
    title: 'III. Collection and Privacy Statement',
    contents: [
      'Legend Link collects your personal information as a requirement of the Philippine Amusement and Gaming Corporation (PAGCOR) and for the purpose of providing you with our services. Other than PAGCOR, our company needs to share your information with vital suppliers, third party service providers, related companies and subsidiaries to provide you with our services, administration of your account, accounting, market study promotions, play tracking, profiling and loyalty points, promotional games, release of prizes and such other allied services.',
      'In processing your personal information our company adheres to a strict privacy policy in accordance with Republic Act No. 10173 or the Data Privacy Act of 2012.',
      '1. In addition to the above-mentioned purposes, our company collects personal information, which will be used to facilitate the transaction, track and administer your account, and improve efficiency in providing you with our products and services.',
      "2. Our company shall keep the Member's information strictly confidential. The information you give us will not be sold, shared to subsidiaries, third party service providers, suppliers, related companies or made available to the public, except in line with the disclosed purposes, in the course of our ordinary business, or when authorized by and in accordance with Philippine law or any valid order of the court or government agencies.",
      '3. Our Company applies strict security measures and uses automated systems to make sure that the Data Privacy standards for confidentiality, integrity and availability of your personal data are met. Our employees are trained to handle your personal data and we have internal controls in place to avoid and handle personal data breach.',
      '4. Our Company is governed by the laws of the Republic of the Philippines. For all intents and purposes, the storage location of all personal data collected is in the Philippines.',
      '5. Your information shall be kept in our system for as long as your account is active and for a period of at least one (1) year from your last visit.',
      '6. For any complaints, which includes but is not limited to the handling, correction, or request for deletion of your personal information, you may email at cs@Legend Link.vip',
    ],
  },
  {
    title: 'IV. Terms and Conditions for Membership',
    contents: [
      'Legend Link is open to qualified individuals twenty-one (21) years old and above. Pursuant to Presidential Decree 1869, as amended by Republic Act 9487, persons under 21 years of age or students of any school, college, or university in the Philippines are not allowed to play in this gaming establishment.',
      'Pursuant to Malacañang Memorandum Circular No. 8, the following are not allowed to enter, stay, and/or play in the gaming establishment/platform.',
      '1. Government officials and employees connected directly with the operation of the government or any of its agencies; and',
      '2. Members of the Philippine National Police (PNP) and Armed Forces of the Philippines (AFP).',
      '3. Persons under 21 years of age or students of any school, college, or university in the Philippines.',
      '4. PAGCOR officials and employees;',
      '5. Unregistered players;',
      '6. Banned individuals;',
      '7. Spouse, common-law partner, children, parents of officials and persons mentioned in items (1), (2), and (4) above.',
      '8. Persons included to the National Database of Restricted Persons;',
      '9. Gaming Employment License (GEL) holders; and',
      '10. Financiers/Loan Sharks and the like.',
      'Legend Link has the right to deny application or terminate the membership of any individual who violates the terms and conditions of the membership or provides false or inaccurate information during the membership registration.',
      "Member's Affirmation and Consent",
      'I am 21 years of age or older, I have read and understood Terms and Conditions of membership and agree to abide by them, as amended from time to time and declare that the details in this application are true and correct.',
      'I acknowledge and agree to be bound by, and undertake to comply with, the house rules, regulations, and policies issued by the Philippine Amusement and Gaming Corporation concerning the operations and management of this establishment.',
      "I also read and understood the company's Collection and Privacy Statement, and I freely give my informed consent to the collection and the uses of my personal information. I understand that withdrawal of this consent will result in the deactivation of my membership.",
      "I also read and understood the company's Collection and Privacy Statement, and I freely give my informed consent to the collection and the uses of my personal information. I understand that withdrawal of this consent will result in the deactivation of my membership.",
      'I am aware that funding, withdrawal, and/or transfers from and to a payment/banking solution other than my registered account may cause suspension, termination of my account, subject to further verification of Legend Link.',
      'I may make transactions to a 3rd party, such as GCash, Paymaya etc. through Legend Link Remote Gaming Platform. By using the services, I agree that Legend Link may use all information, including personal and billing information, provided by me to Legend Link in the course of using the Services (“Payment Instructions”). I acknowledge and agree that it is my sole responsibility to ensure that all my funding and withdrawal transactions are correct, complete, and accurate in all respect and I understand that time is required to process my account instructions. The account instructions provided by me will be treated as final and executory. Further, by providing Legend Link with my account instructions, I agree to deposit/withdraw or allow Legend Link to deduct from my account all fees and charges associated with my fund instructions.',
      'Standard Processing Periods for Deposit and Withdrawal Transactions:',
      "On delayed deposits and withdrawals due to third-party payment provider's scheduled preventive maintenance - Account will be monitored within 24 hours.",
      "If the amount has not been reflected in the player's account, player is requested to report back to Legend Link to ensure that funds will be credited back into the player's account.",
      "If the amount has not been reflected in the player's account, player is requested to report back to Legend Link to ensure that funds will be credited back into the player's account.",
      "The standard processing period for deposit and withdrawal transaction through third-party payment provider's amounting to Php50,000 to Php500,000 is Three (3) to Five (5) business days.",
      "The standard processing period for deposit and withdrawal transaction through third-party payment provider's amounting to Php50,000 to Php500,000 is Three (3) to Five (5) business days.",
      'Legend Link is not responsible for any delays caused by circumstances beyond its control, such as, those arising from transactions with third party payment providers and vendors.',
      'Legend Link has No Liability',
      "I acknowledge and agree that no liability shall be attached to Legend Link if the latter is unable to complete any funding instructions initiated by me for any reason beyond Legend Link' control, including, but not limited to, the following:",
      'i If, through no fault of Legend Link, my Account does not contain sufficient funds or if the deposit or withdrawal would exceed the transactional limit set for my Account;',
      'ii Legend Link payment processing centre is not working properly or is under system maintenance and I am aware or have been advised by Legend Link about the malfunction or system downtime or maintenance before I execute the fund transfer instructions',
      'iii I have not provided Legend Link with the correct account information, or information that I provided becomes incorrect; and/or',
      "iv Circumstances beyond Legend Link' control (such as, but not limited to, fire, flood, system breakdown, technical bugs or malfunction, and/or types of players; or interference from an outside force), even if foreseeable or foreseen, that may prevent the proper execution of the transfer instructions and Legend Link have taken reasonable precautions to avoid those circumstances.",
      'Account Suspension may be implemented by Legend Link due to the following reasons:',
      'a. National Database for Restricted Persons - persons banned from gaming.',
      'b. Multiple accounts - only one (1) remote gaming platform account shall be allowed per player per remote gaming platform.',
      'c. Promo and Chips Abuser - engaged in activities that are in breach of our promotional guidelines.',
      'd. Underage and Banned Personalities - only persons twenty-one (21) years of age and above and not among banned personalities',
      'e. Other transactions that may be deemed suspicious and subject to further investigation upon the sole and exclusive discretion of Legend Link.',
      'f. Use of bot software is not permitted and, if the player is found to have used such software, it will be considered cheating, and the player may be sanctioned accordingly.',
      'Anti-Money Laundering (AML) Compliance Provision',
      '1. Compliance with AML Laws:',
      'a. The User acknowledges and agrees that Legend Link, the operator of this remote gaming platform (hereinafter referred to as "the Platform"), is committed to full compliance with all applicable AML laws and regulations, including but not limited to the Anti-Money Laundering Act (the "AML Act").',
      '2. Customer Verification and Reporting:',
      'a. By using the Platform, the User consents to and understands that LEGEND LINK may perform customer verification',
      'checks and maintain records of User transactions in accordance with AML requirements. ',
      'b. The User agrees to report any suspicious or potentially AML-related activities or transactions to LEGEND LINK as soon as such activities are identified.',
      '3. Record-Keeping:',
      'a. LEGEND LINK shall maintain accurate records of User transactions, personal information, and AML compliance efforts as required by law. Such records may be retained for a specified period in accordance with AML regulations.',
      '4. Termination of Accounts:',
      'a. The User acknowledges that LEGEND LINK reserves the right to suspend, terminate, or restrict access to the Platform for any User found to be involved in, or reasonably suspected of being involved in, money laundering or other illicit financial activities. LEGEND LINK may, but shall not have the obligation to, inform you prior to suspending, terminating or restricting the access pursuant to this clause. You acknowledge the authority of LEGEND LINK to suspend, terminate or restrict the Access and accordingly, you shall hold LEGEND LINK free and harmless against any and all consequences of such suspension, termination or restriction, or any loss or damage which you may suffer as a result thereof.',
      '5. Cooperation with Investigations:',
      'a. The User agrees to cooperate with LEGEND LINK, law enforcement agencies, and relevant authorities in the event of an AML investigation or inquiry related to their activities on the Platform.',
      '6. Penalties for Non-Compliance:',
      'a. The User acknowledges that non-compliance with AML laws and regulations may result in legal penalties and could lead to the suspension, termination, or restriction of their account on the Platform.',
      '7. Amendments to AML Requirements:',
      'a. The User agrees that LEGEND LINK may, at its discretion, amend its AML requirements to align with changes in AML laws and regulations. Users are expected to adhere to these changes promptly.',
      'These Terms of Use are subject to changes, revisions, updates, and amendments from time to time without the need of prior notice or consent of the user.',
    ],
  },
]
