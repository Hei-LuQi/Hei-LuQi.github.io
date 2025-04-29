import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />">
      <main>
        <div className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroBackgroundInner}>
              <div className={styles.heroBackgroundBar}></div>
              <div className={styles.heroBackgroundBar}></div>
              <div className={styles.heroBackgroundBar}></div>
            </div>
          </div>
          <div className={styles.heroContent}>
            <div className={styles.avatarWrapper}>
              <img
                className={styles.avatar}
                src="/img/image.png"
                alt="Profile"
              />
              <div className={styles.avatarGlow}></div>
            </div>
            <h1 className={styles.title}>{siteConfig.tagline}</h1>
            <div className={styles.socialLinks}>
              <a href="https://github.com/your-username" className={styles.socialLink}>
                <i className="fab fa-github"></i>
              </a>
              <a href="https://twitter.com/your-username" className={styles.socialLink}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com/in/your-username" className={styles.socialLink}>
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Who am I?</h2>
              <div className={styles.underline}></div>
            </div>
            <div className={styles.gridContainer}>
              <div className={styles.gridItem}>
                <div className={styles.card}>
                  <div className={styles.cardIcon}>👨‍💻</div>
                  <h3>Software Engineer</h3>
                  <p>Passionate about creating elegant solutions to complex problems</p>
                </div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.card}>
                  <div className={styles.cardIcon}>✍️</div>
                  <h3>Blogger</h3>
                  <p>Sharing knowledge and experiences with the community</p>
                </div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.card}>
                  <div className={styles.cardIcon}>🚀</div>
                  <h3>Tech Enthusiast</h3>
                  <p>Always learning and exploring new technologies</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>What do I do?</h2>
              <div className={styles.underline}></div>
            </div>
            <div className={styles.projectsGrid}>
              <div className={styles.projectCard}>
                <div className={styles.projectCardInner}>
                  <h3>Project 1</h3>
                  <p>Description of your amazing project goes here</p>
                  <div className={styles.projectTags}>
                    <span className={styles.tag}>React</span>
                    <span className={styles.tag}>Node.js</span>
                  </div>
                  <a href="#" className={styles.projectLink}>Learn More →</a>
                </div>
              </div>
              <div className={styles.projectCard}>
                <div className={styles.projectCardInner}>
                  <h3>Project 2</h3>
                  <p>Another cool project description</p>
                  <div className={styles.projectTags}>
                    <span className={styles.tag}>TypeScript</span>
                    <span className={styles.tag}>GraphQL</span>
                  </div>
                  <a href="#" className={styles.projectLink}>Learn More →</a>
                </div>
              </div>
              <div className={styles.projectCard}>
                <div className={styles.projectCardInner}>
                  <h3>Project 3</h3>
                  <p>Your third awesome project</p>
                  <div className={styles.projectTags}>
                    <span className={styles.tag}>Python</span>
                    <span className={styles.tag}>AI</span>
                  </div>
                  <a href="#" className={styles.projectLink}>Learn More →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
