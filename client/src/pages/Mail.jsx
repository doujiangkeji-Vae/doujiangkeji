import { useState } from 'react';
import './Mail.css';

function Mail() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMail, setSelectedMail] = useState(null);
  const [showCompose, setShowCompose] = useState(false);
  const [composeData, setComposeData] = useState({ to: '', subject: '', body: '' });
  const [sentSuccess, setSentSuccess] = useState(false);

  const inboxMails = [
    { id: 1, from: '张明远', subject: '关于 Q2 季度战略规划', preview: '各位好，附件是 Q2 季度战略规划初稿，请在本周五前完成审阅并提交反馈意见。重点关注以下几个方面：市场拓展策略、产品路线图更新、团队扩充计划以及预算分配方案。', date: '2026-04-17 09:30', read: false },
    { id: 2, from: '人力资源部', subject: '2026 年度体检通知', preview: '各位同事，公司将于 5 月组织年度健康体检，请登录内部系统选择体检时间和医院。今年新增了基因检测和心理健康评估项目，欢迎大家积极参与。', date: '2026-04-16 14:20', read: false },
    { id: 3, from: '李伟', subject: '边缘计算芯片 V2 技术评审', preview: '技术评审会议定于下周二下午 2 点，请相关同事提前准备材料。本次评审将重点讨论芯片架构优化方案和性能测试结果。', date: '2026-04-16 10:15', read: true },
    { id: 4, from: '市场部', subject: 'MWC 2026 展会方案确认', preview: '展会方案已更新至第三版，请各部门负责人确认展品清单和人员安排。展位设计图已附在附件中，请查阅。', date: '2026-04-15 16:45', read: true },
    { id: 5, from: 'IT 支持', subject: '系统维护通知', preview: '本周六凌晨 2:00-6:00 将进行服务器维护，届时内部系统将暂停服务。请提前做好工作安排。', date: '2026-04-15 09:00', read: true },
    { id: 6, from: '王芳', subject: '团建活动方案投票', preview: '下月团建活动有三个方案供大家投票选择：方案一 - 户外拓展训练；方案二 - 海滨度假；方案三 - 主题乐园。请在本周三前完成投票。', date: '2026-04-14 17:30', read: true },
    { id: 7, from: '财务部', subject: '3 月报销审批结果通知', preview: '您提交的 3 月份差旅报销申请已审批通过，报销金额将在 5 个工作日内转入您的工资账户。', date: '2026-04-13 11:00', read: true },
    { id: 8, from: '产品部', subject: 'DJ-SensorPro 2.0 需求评审', preview: '新产品需求文档已更新，请各位在周四前完成评审。重点关注新增的甲醛检测和辐射监测功能的技术可行性。', date: '2026-04-12 15:30', read: true }
  ];

  const sentMails = [
    { id: 101, to: '全体员工', subject: '关于 B 轮融资的内部通知', preview: '各位同事，很高兴通知大家公司已完成 B 轮融资，融资金额达 5 亿元人民币。感谢每一位同事的辛勤付出和不懈努力。', date: '2026-04-10 11:00' },
    { id: 102, to: '李伟', subject: 'Re: 边缘计算芯片 V2 技术评审', preview: '收到，我会提前准备好技术方案文档和性能测试报告。另外建议邀请华为的芯片专家参与评审。', date: '2026-04-16 11:00' },
    { id: 103, to: '市场部', subject: 'Re: MWC 2026 展会方案确认', preview: '展品清单已确认，技术演示部分需要增加一个 Demo。我这边会安排工程师准备。', date: '2026-04-15 17:00' },
    { id: 104, to: '人力资源部', subject: '新员工入职培训安排', preview: '下周有 5 位新同事入职，请安排好入职培训流程。建议增加产品体验环节。', date: '2026-04-14 10:00' }
  ];

  const currentMails = activeTab === 'inbox' ? inboxMails : sentMails;

  const handleSend = () => {
    if (composeData.to && composeData.subject) {
      setSentSuccess(true);
      setComposeData({ to: '', subject: '', body: '' });
      setTimeout(() => {
        setSentSuccess(false);
        setShowCompose(false);
      }, 2000);
    }
  };

  return (
    <div className="page-wrapper">
      <section className="mail-hero">
        <div className="container mail-hero__content">
          <h1 className="mail-hero__title">企业邮箱</h1>
          <p className="mail-hero__subtitle">高效沟通，协作无间</p>
        </div>
      </section>

      <section className="section mail-main">
        <div className="container">
          <div className="mail-layout">
            {/* Sidebar */}
            <aside className="mail-sidebar">
              <button className="mail-compose-btn" onClick={() => setShowCompose(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                写邮件
              </button>
              <nav className="mail-nav">
                <button
                  className={`mail-nav__item ${activeTab === 'inbox' ? 'mail-nav__item--active' : ''}`}
                  onClick={() => { setActiveTab('inbox'); setSelectedMail(null); }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  收件箱
                  {!inboxMails.every(m => m.read) && (
                    <span className="mail-nav__badge">{inboxMails.filter(m => !m.read).length}</span>
                  )}
                </button>
                <button
                  className={`mail-nav__item ${activeTab === 'sent' ? 'mail-nav__item--active' : ''}`}
                  onClick={() => { setActiveTab('sent'); setSelectedMail(null); }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  已发送
                </button>
              </nav>
            </aside>

            {/* Mail List */}
            <div className="mail-list">
              {currentMails.map(mail => (
                <div
                  key={mail.id}
                  className={`mail-list__item ${selectedMail?.id === mail.id ? 'mail-list__item--active' : ''} ${!mail.read ? 'mail-list__item--unread' : ''}`}
                  onClick={() => setSelectedMail(mail)}
                >
                  <div className="mail-list__item-header">
                    <span className="mail-list__item-sender">
                      {activeTab === 'inbox' ? mail.from : `发给: ${mail.to}`}
                    </span>
                    <span className="mail-list__item-date">{mail.date.split(' ')[0]}</span>
                  </div>
                  <div className="mail-list__item-subject">{mail.subject}</div>
                  <div className="mail-list__item-preview">{mail.preview}</div>
                </div>
              ))}
            </div>

            {/* Mail Detail */}
            <div className="mail-detail">
              {selectedMail ? (
                <div className="mail-detail__content">
                  <div className="mail-detail__header">
                    <h2 className="mail-detail__subject">{selectedMail.subject}</h2>
                    <div className="mail-detail__meta">
                      <span className="mail-detail__from">
                        {activeTab === 'inbox' ? `发件人: ${selectedMail.from}` : `收件人: ${selectedMail.to}`}
                      </span>
                      <span className="mail-detail__date">{selectedMail.date}</span>
                    </div>
                  </div>
                  <div className="mail-detail__body">
                    {selectedMail.preview}
                  </div>
                  {activeTab === 'inbox' && (
                    <div className="mail-detail__actions">
                      <button className="btn btn-outline btn-sm" onClick={() => {
                        setComposeData({ to: selectedMail.from, subject: `Re: ${selectedMail.subject}`, body: '' });
                        setShowCompose(true);
                      }}>
                        回复
                      </button>
                      <button className="btn btn-outline btn-sm">
                        转发
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mail-detail__empty">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <p>选择一封邮件查看详情</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Compose Modal */}
      {showCompose && (
        <div className="mail-compose-overlay" onClick={() => setShowCompose(false)}>
          <div className="mail-compose" onClick={e => e.stopPropagation()}>
            <div className="mail-compose__header">
              <h3>写邮件</h3>
              <button className="mail-compose__close" onClick={() => setShowCompose(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mail-compose__form">
              <div className="mail-compose__field">
                <label>收件人</label>
                <input
                  type="text"
                  value={composeData.to}
                  onChange={e => setComposeData({ ...composeData, to: e.target.value })}
                  placeholder="请输入收件人"
                />
              </div>
              <div className="mail-compose__field">
                <label>主题</label>
                <input
                  type="text"
                  value={composeData.subject}
                  onChange={e => setComposeData({ ...composeData, subject: e.target.value })}
                  placeholder="请输入邮件主题"
                />
              </div>
              <div className="mail-compose__field">
                <label>正文</label>
                <textarea
                  value={composeData.body}
                  onChange={e => setComposeData({ ...composeData, body: e.target.value })}
                  placeholder="请输入邮件内容..."
                  rows="10"
                ></textarea>
              </div>
              <div className="mail-compose__actions">
                <button className="btn btn-primary" onClick={handleSend}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  发送
                </button>
                <button className="btn btn-outline" onClick={() => setShowCompose(false)}>
                  取消
                </button>
                {sentSuccess && (
                  <span className="mail-compose__success">邮件发送成功!</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mail;
