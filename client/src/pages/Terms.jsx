import { useLanguage } from '../i18n/LanguageContext';

export default function Terms() {
  const { lang } = useLanguage();
  const prefix = lang === 'zh' ? '/cn' : '';

  const content = lang === 'zh' ? {
    title: '服务条款',
    lastUpdated: '最后更新日期：2025年1月1日',
    intro: '欢迎访问豆姜科技网站。使用本网站及我们的服务即表示您同意遵守以下服务条款。请您在使用前仔细阅读本条款。',
    sections: [
      {
        title: '一、服务说明',
        items: [
          '豆姜科技网站提供公司产品介绍、行业资讯、技术解决方案等相关信息展示服务。',
          '我们保留随时修改、暂停或终止部分或全部服务的权利，恕不另行通知。',
          '本网站上的所有信息仅供参考之用，不构成任何形式的商业承诺或保证。',
          '我们可能在不事先通知的情况下对网站内容进行更新和修改。',
        ]
      },
      {
        title: '二、用户行为规范',
        items: [
          '您在使用本网站时，应遵守中华人民共和国相关法律法规。',
          '您不得利用本网站从事任何违法、违规或侵害他人合法权益的活动。',
          '您不得对本网站进行反向工程、反编译或以其他方式试图获取网站源代码。',
          '您不得使用自动化工具（如爬虫、机器人等）大量抓取网站内容。',
          '您不得干扰或破坏网站的正常运行或服务器安全。',
        ]
      },
      {
        title: '三、知识产权声明',
        items: [
          '本网站上的所有内容，包括但不限于文字、图片、图形、标志、视频、音频、软件及界面设计等，均受中华人民共和国知识产权法律保护。',
          '未经豆姜科技事先书面许可，任何人不得复制、修改、传播、展示或以其他方式使用本网站的任何内容。',
          '"豆姜科技"及相关品牌标识为豆姜科技的注册商标或商标，未经授权不得使用。',
          '本网站提及的第三方产品或服务名称可能为其各自所有者的商标。',
        ]
      },
      {
        title: '四、免责声明',
        items: [
          '我们尽力确保网站信息的准确性和时效性，但不对信息的完整性、准确性或及时性做出任何明示或暗示的保证。',
          '对于因使用或无法使用本网站而导致的任何直接、间接、附带、特殊或后果性损害，我们不承担任何责任。',
          '本网站可能包含指向第三方网站或资源的链接，这些链接仅为方便用户而设。我们对第三方网站的内容、隐私政策或做法不承担任何责任。',
          '因不可抗力（如自然灾害、网络故障、系统维护等）导致的服务中断，我们不承担责任。',
        ]
      },
      {
        title: '五、隐私政策引用',
        items: [
          '您使用本网站即表示您同意我们的隐私政策。',
          '我们的隐私政策详细说明了我们如何收集、使用和保护您的个人信息。',
          '如需了解隐私政策的详细内容，请参阅我们的隐私政策页面。',
        ]
      },
      {
        title: '六、条款变更',
        items: [
          '我们保留随时修改本服务条款的权利。',
          '条款变更后，我们将在网站上公布更新后的条款。',
          '您在条款变更后继续使用本网站，即视为您同意接受修改后的条款。',
          '建议您定期查阅本条款以了解最新的服务条款内容。',
        ]
      },
      {
        title: '七、联系方式',
        items: [
          '如果您对本服务条款有任何疑问，请通过以下方式联系我们：',
          '电子邮箱：doujiangkeji@126.com',
          '联系电话：13247819985',
          '本服务条款适用中华人民共和国法律，如有争议，双方应友好协商解决。',
        ]
      }
    ]
  } : {
    title: 'Terms of Service',
    lastUpdated: 'Last Updated: January 1, 2025',
    intro: 'Welcome to the Doujiang Technology website. By using this website and our services, you agree to comply with the following Terms of Service. Please read these terms carefully before use.',
    sections: [
      {
        title: '1. Service Description',
        items: [
          'The Doujiang Technology website provides information display services including company product introductions, industry news, and technical solutions.',
          'We reserve the right to modify, suspend, or terminate part or all of the services at any time without prior notice.',
          'All information on this website is for reference purposes only and does not constitute any form of commercial commitment or guarantee.',
          'We may update and modify website content without prior notice.',
        ]
      },
      {
        title: '2. User Conduct',
        items: [
          'When using this website, you shall comply with the applicable laws and regulations of the People\'s Republic of China.',
          'You shall not use this website for any illegal, irregular, or rights-infringing activities.',
          'You shall not reverse-engineer, decompile, or otherwise attempt to obtain the source code of this website.',
          'You shall not use automated tools (such as crawlers, bots, etc.) to scrape website content in bulk.',
          'You shall not interfere with or disrupt the normal operation or server security of this website.',
        ]
      },
      {
        title: '3. Intellectual Property',
        items: [
          'All content on this website, including but not limited to text, images, graphics, logos, videos, audio, software, and interface design, is protected by the intellectual property laws of the People\'s Republic of China.',
          'Without the prior written permission of Doujiang Technology, no person may copy, modify, distribute, display, or otherwise use any content on this website.',
          '"Doujiang Technology" and related brand identifiers are registered trademarks or trademarks of Doujiang Technology and may not be used without authorization.',
          'Third-party product or service names mentioned on this website may be trademarks of their respective owners.',
        ]
      },
      {
        title: '4. Disclaimer',
        items: [
          'We make every effort to ensure the accuracy and timeliness of website information, but make no express or implied warranties regarding the completeness, accuracy, or timeliness of the information.',
          'We shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of or inability to use this website.',
          'This website may contain links to third-party websites or resources, which are provided for user convenience only. We are not responsible for the content, privacy policies, or practices of third-party websites.',
          'We shall not be liable for service interruptions caused by force majeure events (such as natural disasters, network failures, system maintenance, etc.).',
        ]
      },
      {
        title: '5. Privacy Policy Reference',
        items: [
          'By using this website, you agree to our Privacy Policy.',
          'Our Privacy Policy details how we collect, use, and protect your personal information.',
          'For detailed information about our Privacy Policy, please refer to our Privacy Policy page.',
        ]
      },
      {
        title: '6. Changes to Terms',
        items: [
          'We reserve the right to modify these Terms of Service at any time.',
          'Upon changes to these terms, we will publish the updated terms on this website.',
          'Your continued use of this website after changes to these terms constitutes your acceptance of the modified terms.',
          'We recommend that you periodically review these terms to stay informed of the latest Terms of Service.',
        ]
      },
      {
        title: '7. Contact Information',
        items: [
          'If you have any questions regarding these Terms of Service, please contact us through the following methods:',
          'Email: doujiangkeji@126.com',
          'Phone: 13247819985',
          'These Terms of Service are governed by the laws of the People\'s Republic of China. In the event of any dispute, both parties shall seek to resolve it through friendly negotiation.',
        ]
      }
    ]
  };

  return (
    <div className="page">
      <section className="section" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container">
          <h1 className="section-title">{content.title}</h1>
          <p style={{ color: '#888', marginBottom: '40px', fontSize: '14px' }}>{content.lastUpdated}</p>
          <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', color: '#555' }}>
            <p style={{ marginBottom: '32px', fontSize: '16px' }}>{content.intro}</p>
            {content.sections.map((section, index) => (
              <div key={index} style={{ marginBottom: '36px' }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#1a1a2e',
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #4f46e5'
                }}>
                  {section.title}
                </h2>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  {section.items.map((item, i) => (
                    <li key={i} style={{ marginBottom: '10px', fontSize: '15px' }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
