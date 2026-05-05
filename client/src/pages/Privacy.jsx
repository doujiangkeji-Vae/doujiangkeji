import { useLanguage } from '../i18n/LanguageContext';

export default function Privacy() {
  const { lang } = useLanguage();
  const prefix = lang === 'zh' ? '/cn' : '';

  const content = lang === 'zh' ? {
    title: '隐私政策',
    lastUpdated: '最后更新日期：2025年1月1日',
    intro: '豆姜科技（以下简称"我们"）非常重视用户的隐私保护。本隐私政策旨在帮助您了解我们如何收集、使用、存储和保护您的个人信息。请您在使用我们的网站和服务前仔细阅读本政策。',
    sections: [
      {
        title: '一、信息收集',
        items: [
          '我们可能收集您在访问网站或使用服务时主动提供的信息，包括但不限于：姓名、电子邮箱地址、联系电话、留言内容等。',
          '我们可能自动收集您的设备信息、浏览器类型、IP 地址、访问时间和页面浏览记录等技术信息。',
          '当您使用我们的联系表单或订阅服务时，我们会收集您提交的相关信息。',
        ]
      },
      {
        title: '二、信息使用',
        items: [
          '回复您的咨询和留言，提供客户服务支持。',
          '向您发送产品更新、服务通知和促销信息（经您同意后）。',
          '改善网站功能和用户体验，进行数据分析。',
          '遵守法律法规要求，维护网站安全。',
        ]
      },
      {
        title: '三、信息保护',
        items: [
          '我们采用行业标准的加密技术和安全措施来保护您的个人信息。',
          '我们限制员工对个人信息的访问权限，仅授权必要的人员处理相关信息。',
          '我们会定期审查和更新安全措施，以应对不断变化的安全威胁。',
          '尽管我们努力保护您的信息，但互联网传输无法做到绝对安全，我们无法对数据传输的安全性做出保证。',
        ]
      },
      {
        title: '四、Cookie 使用',
        items: [
          '我们的网站可能使用 Cookie 和类似技术来提升您的浏览体验。',
          'Cookie 帮助我们了解您如何使用网站，以便我们持续改进服务质量。',
          '您可以通过浏览器设置拒绝或删除 Cookie，但这可能影响网站的某些功能。',
        ]
      },
      {
        title: '五、第三方服务',
        items: [
          '我们可能使用第三方服务（如数据分析工具、CDN 服务等）来辅助网站运营。',
          '这些第三方服务可能会收集您的部分信息，其信息处理行为受其自身的隐私政策约束。',
          '我们不对外部第三方的隐私做法承担责任，建议您查阅相关第三方的隐私政策。',
        ]
      },
      {
        title: '六、用户权利',
        items: [
          '您有权查询、访问您的个人信息。',
          '您有权要求更正不准确或不完整的个人信息。',
          '您有权要求删除您的个人信息（在法律法规允许的范围内）。',
          '您有权撤回对个人信息处理的同意。',
          '如需行使上述权利，请通过下方联系方式与我们取得联系。',
        ]
      },
      {
        title: '七、联系方式',
        items: [
          '如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：',
          '电子邮箱：doujiangkeji@126.com',
          '联系电话：13247819985',
          '我们将尽快回复您的请求。',
        ]
      }
    ]
  } : {
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated: January 1, 2025',
    intro: 'Doujiang Technology (hereinafter "we", "us", or "our") takes the protection of your privacy very seriously. This Privacy Policy is designed to help you understand how we collect, use, store, and protect your personal information. Please read this policy carefully before using our website and services.',
    sections: [
      {
        title: '1. Information Collection',
        items: [
          'We may collect information that you voluntarily provide when visiting our website or using our services, including but not limited to: your name, email address, phone number, message content, etc.',
          'We may automatically collect technical information such as your device information, browser type, IP address, access time, and page browsing records.',
          'When you use our contact form or subscription services, we will collect the relevant information you submit.',
        ]
      },
      {
        title: '2. Information Usage',
        items: [
          'Responding to your inquiries and messages, and providing customer service support.',
          'Sending you product updates, service notifications, and promotional information (with your consent).',
          'Improving website functionality and user experience, and conducting data analysis.',
          'Complying with legal and regulatory requirements and maintaining website security.',
        ]
      },
      {
        title: '3. Information Protection',
        items: [
          'We employ industry-standard encryption technologies and security measures to protect your personal information.',
          'We restrict employee access to personal information, authorizing only necessary personnel to process relevant data.',
          'We regularly review and update our security measures to address evolving security threats.',
          'While we strive to protect your information, internet transmission cannot be guaranteed as absolutely secure, and we cannot guarantee the security of data transmission.',
        ]
      },
      {
        title: '4. Cookie Usage',
        items: [
          'Our website may use cookies and similar technologies to enhance your browsing experience.',
          'Cookies help us understand how you use our website so that we can continuously improve our service quality.',
          'You may refuse or delete cookies through your browser settings, but this may affect certain features of the website.',
        ]
      },
      {
        title: '5. Third-party Services',
        items: [
          'We may use third-party services (such as analytics tools, CDN services, etc.) to assist in website operations.',
          'These third-party services may collect some of your information, and their data processing practices are governed by their own privacy policies.',
          'We are not responsible for the privacy practices of external third parties, and we recommend that you review the privacy policies of relevant third parties.',
        ]
      },
      {
        title: '6. User Rights',
        items: [
          'You have the right to query and access your personal information.',
          'You have the right to request correction of inaccurate or incomplete personal information.',
          'You have the right to request deletion of your personal information (within the scope permitted by applicable laws and regulations).',
          'You have the right to withdraw your consent to the processing of personal information.',
          'To exercise any of the above rights, please contact us using the information provided below.',
        ]
      },
      {
        title: '7. Contact Information',
        items: [
          'If you have any questions or suggestions regarding this Privacy Policy, please contact us through the following methods:',
          'Email: doujiangkeji@126.com',
          'Phone: 13247819985',
          'We will respond to your request as soon as possible.',
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
