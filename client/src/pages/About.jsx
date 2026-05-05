import ScrollAnimation from '../components/ScrollAnimation';
import { useLanguage, t } from '../i18n';
import { teamMembers, milestones } from '../data/mockData';
import './About.css';

function About() {
  const { lang } = useLanguage();

  const cultureItems = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      title: t(lang, 'about.culture1Title'),
      desc: t(lang, 'about.culture1Desc')
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      title: t(lang, 'about.culture2Title'),
      desc: t(lang, 'about.culture2Desc')
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: t(lang, 'about.culture3Title'),
      desc: t(lang, 'about.culture3Desc')
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: t(lang, 'about.culture4Title'),
      desc: t(lang, 'about.culture4Desc')
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
          <h1 className="about-hero__title">{t(lang, 'about.heroTitle')}</h1>
          <p className="about-hero__subtitle">{t(lang, 'about.heroSubtitle')}</p>
        </div>
      </section>

      {/* Company Intro */}
      <section className="section about-intro">
        <div className="container">
          <div className="about-intro__grid">
            <ScrollAnimation animation="fadeInLeft">
              <div className="about-intro__text">
                <h2 className="about-intro__title">
                  {t(lang, 'about.introTitle')}
                  <span className="text-gradient">{t(lang, 'about.introTitleAccent')}</span>
                </h2>
                <p className="about-intro__desc">
                  {t(lang, 'about.introDesc1')}
                </p>
                <p className="about-intro__desc">
                  {t(lang, 'about.introDesc2')}
                </p>
                <p className="about-intro__desc">
                  {t(lang, 'about.introDesc3')}
                </p>
                <div className="about-intro__highlights">
                  <div className="about-intro__highlight">
                    <span className="about-intro__highlight-value">{t(lang, 'about.highlight1Value')}</span>
                    <span className="about-intro__highlight-label">{t(lang, 'about.highlight1Label')}</span>
                  </div>
                  <div className="about-intro__highlight">
                    <span className="about-intro__highlight-value">{t(lang, 'about.highlight2Value')}</span>
                    <span className="about-intro__highlight-label">{t(lang, 'about.highlight2Label')}</span>
                  </div>
                  <div className="about-intro__highlight">
                    <span className="about-intro__highlight-value">{t(lang, 'about.highlight3Value')}</span>
                    <span className="about-intro__highlight-label">{t(lang, 'about.highlight3Label')}</span>
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
                    <div className="about-intro__card-title">{t(lang, 'about.card1Title')}</div>
                    <div className="about-intro__card-desc">{t(lang, 'about.card1Desc')}</div>
                  </div>
                </div>
                <div className="about-intro__card about-intro__card--2">
                  <div className="about-intro__card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <div>
                    <div className="about-intro__card-title">{t(lang, 'about.card2Title')}</div>
                    <div className="about-intro__card-desc">{t(lang, 'about.card2Desc')}</div>
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
                    <div className="about-intro__card-title">{t(lang, 'about.card3Title')}</div>
                    <div className="about-intro__card-desc">{t(lang, 'about.card3Desc')}</div>
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
            <h2 className="section-title">{t(lang, 'about.teamTitle')}</h2>
            <p className="section-subtitle">{t(lang, 'about.teamSubtitle')}</p>
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
            <h2 className="section-title">{t(lang, 'about.timelineTitle')}</h2>
            <p className="section-subtitle">{t(lang, 'about.timelineSubtitle')}</p>
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
            <h2 className="section-title">{t(lang, 'about.cultureTitle')}</h2>
            <p className="section-subtitle">{t(lang, 'about.cultureSubtitle')}</p>
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
