import ScrollAnimation from '../components/ScrollAnimation';
import { teamMembers, milestones } from '../data/mockData';
import './About.css';

function About() {
  const cultureItems = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      title: '创新驱动',
      desc: '持续投入研发，拥抱前沿技术，用创新解决实际问题。'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      title: '协作共赢',
      desc: '开放合作，与客户、伙伴共同成长，构建共赢生态。'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: '追求卓越',
      desc: '对品质极致追求，每一个产品都经过严格测试和打磨。'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: '社会责任',
      desc: '科技向善，用技术力量回馈社会，推动可持续发展。'
    }
  ];

  return (
    <div className="page-wrapper">
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="about-hero__bg">
          <div className="about-hero__glow about-hero__glow--1"></div>
          <div className="about-hero__glow about-hero__glow--2"></div>
        </div>
        <div className="container about-hero__content">
          <h1 className="about-hero__title">关于豆姜科技</h1>
          <p className="about-hero__subtitle">智造未来，连接万物 -- 我们的故事</p>
        </div>
      </section>

      {/* Company Intro */}
      <section className="section about-intro">
        <div className="container">
          <div className="about-intro__grid">
            <ScrollAnimation animation="fadeInLeft">
              <div className="about-intro__text">
                <h2 className="about-intro__title">
                  用技术连接
                  <span className="text-gradient">物理世界与数字世界</span>
                </h2>
                <p className="about-intro__desc">
                  豆姜科技成立于 2018 年，是一家专注于物联网核心技术研发的高新技术企业。
                  公司总部位于深圳，在北京、上海、杭州设有研发中心。
                </p>
                <p className="about-intro__desc">
                  我们致力于通过创新的硬件产品和软件平台，为企业级客户提供从设备接入、
                  数据采集到智能分析的端到端物联网解决方案。产品覆盖智能网关、环境传感器、
                  智能安防、边缘计算等多个领域，服务客户超过 2000 家，产品远销 65 个国家和地区。
                </p>
                <p className="about-intro__desc">
                  秉承"智造未来，连接万物"的使命，豆姜科技将持续深耕物联网核心技术，
                  推动行业数字化转型，让智能技术惠及每一个人。
                </p>
                <div className="about-intro__highlights">
                  <div className="about-intro__highlight">
                    <span className="about-intro__highlight-value">500+</span>
                    <span className="about-intro__highlight-label">研发人员</span>
                  </div>
                  <div className="about-intro__highlight">
                    <span className="about-intro__highlight-value">128+</span>
                    <span className="about-intro__highlight-label">发明专利</span>
                  </div>
                  <div className="about-intro__highlight">
                    <span className="about-intro__highlight-value">4</span>
                    <span className="about-intro__highlight-label">研发中心</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInRight">
              <div className="about-intro__visual">
                <div className="about-intro__card about-intro__card--1">
                  <div className="about-intro__card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <div className="about-intro__card-title">IoT 平台</div>
                    <div className="about-intro__card-desc">5000万+ 设备接入</div>
                  </div>
                </div>
                <div className="about-intro__card about-intro__card--2">
                  <div className="about-intro__card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <div>
                    <div className="about-intro__card-title">AI 芯片</div>
                    <div className="about-intro__card-desc">自研 NPU 21 TOPS</div>
                  </div>
                </div>
                <div className="about-intro__card about-intro__card--3">
                  <div className="about-intro__card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  </div>
                  <div>
                    <div className="about-intro__card-title">全球布局</div>
                    <div className="about-intro__card-desc">65+ 国家和地区</div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section about-team">
        <div className="container">
          <ScrollAnimation>
            <h2 className="section-title">核心团队</h2>
            <p className="section-subtitle">汇聚行业顶尖人才，驱动技术创新</p>
          </ScrollAnimation>
          <div className="about-team__grid">
            {teamMembers.map((member, index) => (
              <ScrollAnimation key={member.id} delay={index * 80}>
                <div className="team-card">
                  <div className="team-card__avatar">
                    <span>{member.name[0]}</span>
                  </div>
                  <h3 className="team-card__name">{member.name}</h3>
                  <p className="team-card__title">{member.title}</p>
                  <p className="team-card__bio">{member.bio}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section about-timeline">
        <div className="container">
          <ScrollAnimation>
            <h2 className="section-title">发展历程</h2>
            <p className="section-subtitle">从初创到行业领先，每一步都脚踏实地</p>
          </ScrollAnimation>
          <div className="timeline">
            {milestones.map((item, index) => (
              <ScrollAnimation key={index} delay={index * 60}>
                <div className={`timeline__item ${index % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}>
                  <div className="timeline__dot"></div>
                  <div className="timeline__content">
                    <span className="timeline__year">{item.year}</span>
                    <h3 className="timeline__title">{item.title}</h3>
                    <p className="timeline__desc">{item.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="section about-culture">
        <div className="container">
          <ScrollAnimation>
            <h2 className="section-title">企业文化</h2>
            <p className="section-subtitle">我们的价值观，指引前行的方向</p>
          </ScrollAnimation>
          <div className="about-culture__grid">
            {cultureItems.map((item, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="culture-card">
                  <div className="culture-card__icon">{item.icon}</div>
                  <h3 className="culture-card__title">{item.title}</h3>
                  <p className="culture-card__desc">{item.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
