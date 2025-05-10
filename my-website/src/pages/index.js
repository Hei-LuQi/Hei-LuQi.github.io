import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import { motion } from 'framer-motion';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />">
      <main>
        <motion.div 
          className={styles.hero}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.heroBackground}>
            <div className={styles.heroBackgroundInner}>
              <div className={styles.heroBackgroundBar}></div>
              <div className={styles.heroBackgroundBar}></div>
              <div className={styles.heroBackgroundBar}></div>
            </div>
          </div>
          <motion.div 
            className={styles.heroContent}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className={styles.avatarWrapper}>
              <motion.img
                className={styles.avatar}
                src="/img/image.png"
                alt="Profile"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
              <div className={styles.avatarGlow}></div>
            </div>
            <motion.h1 
              className={styles.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {siteConfig.tagline}
            </motion.h1>
            <motion.div 
              className={styles.socialLinks}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.a 
                href="https://github.com/your-username" 
                className={styles.socialLink}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="GitHub"
              >
                <i className="fab fa-github"></i>
              </motion.a>
              <motion.a 
                href="https://twitter.com/your-username" 
                className={styles.socialLink}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/your-username" 
                className={styles.socialLink}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.main}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className={styles.section}>
            <motion.div 
              className={styles.sectionHeader}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <h2>Who am I?</h2>
              <div className={styles.underline}></div>
            </motion.div>
            <div className={styles.gridContainer}>
              {[
                { icon: '👨‍💻', title: 'Software Engineer', description: 'Passionate about creating elegant solutions to complex problems' },
                { icon: '✍️', title: 'Blogger', description: 'Sharing knowledge and experiences with the community' },
                { icon: '🚀', title: 'Tech Enthusiast', description: 'Always learning and exploring new technologies' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className={styles.gridItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.2, duration: 0.6 }}
                >
                  <motion.div 
                    className={styles.card}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={styles.cardIcon}>{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
{/* 
          <div className={styles.section}>
            <motion.div 
              className={styles.sectionHeader}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
            >
              <h2>What do I do?</h2>
              <div className={styles.underline}></div>
            </motion.div>
            <div className={styles.projectsGrid}>
              {[
                { title: 'Project 1', description: 'Description of your amazing project goes here', tags: ['React', 'Node.js'] },
                { title: 'Project 2', description: 'Another cool project description', tags: ['TypeScript', 'GraphQL'] },
                { title: 'Project 3', description: 'Your third awesome project', tags: ['Python', 'AI'] }
              ].map((project, index) => (
                <motion.div 
                  key={index}
                  className={styles.projectCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4 + index * 0.2, duration: 0.6 }}
                >
                  <motion.div 
                    className={styles.projectCardInner}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className={styles.projectTags}>
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                    <a href="#" className={styles.projectLink}>Learn More →</a>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div> */}

          <motion.div 
            className={styles.section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <motion.div 
              className={styles.sectionHeader}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0, duration: 0.6 }}
            >
              <h2>My Journey</h2>
              <div className={styles.underline}></div>
            </motion.div>
            
            <div className={styles.journey}>
              <motion.div 
                className={styles.journeyText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.6 }}
              >
                <p>
                  My programming journey started with Pascal (and Assembly language), Java, PHP and lastly JavaScript / Typescript. 
                  It is sad 😔 that I don't have access to my old codes although the code would not be good. I built my own Excel 
                  (with very limited functionality), program which was in shape of a heart ❤️, "virus" which deleted everything from 
                  desktop or utility which allowed user to have virtual desktops on old Windows.
                </p>
                <p>
                  Time spent with programming was a huge chunk of my youth, but I must admit I am also active person. I enjoy cold weather, 
                  beautiful nature and traveling. When the temperature drops below zero ❄️ I like to go and sleep 💤 outside. And for a very 
                  long time I wanted to visit Norway 🇳🇴 and see Matterhorn in Switzerland 🇨🇭.
                </p>
              </motion.div>

              <motion.div 
                className={styles.photoGrid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.6 }}
              >
                <div className={styles.photoRow}>
                  <motion.div 
                    className={styles.photo}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src="/img/adventure/sleeping-bag.jpg" alt="Sleeping in cold weather" />
                    <div className={styles.photoCaption}>Embracing the cold weather adventure</div>
                  </motion.div>
                  <motion.div 
                    className={styles.photo}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src="/img/adventure/watch.jpg" alt="Watch in snow" />
                    <div className={styles.photoCaption}>Below zero adventures</div>
                  </motion.div>
                </div>
                <div className={styles.photoRow}>
                  <motion.div 
                    className={styles.photo}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src="/img/adventure/norway.jpg" alt="Norway landscape" />
                    <div className={styles.photoCaption}>Beautiful Norway fjords</div>
                  </motion.div>
                  <motion.div 
                    className={styles.photo}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src="/img/adventure/matterhorn.jpg" alt="Matterhorn mountain" />
                    <div className={styles.photoCaption}>The majestic Matterhorn</div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
                className={styles.journeyText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6, duration: 0.6 }}
              >
                <p>
                  But most of all I love being surrounded by my best friends and good people! And because they like exactly 
                  the same things like me 😊 we spend time together having fun in mountains.
                </p>
              </motion.div>

              <motion.div 
                className={styles.photoGrid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 0.6 }}
              >
                <div className={styles.photoRow}>
                  <motion.div 
                    className={styles.photo}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src="/img/friends/group1.jpg" alt="Friends group photo 1" />
                    <div className={styles.photoCaption}>Mountain adventures with friends</div>
                  </motion.div>
                  <motion.div 
                    className={styles.photo}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src="/img/friends/group2.jpg" alt="Friends group photo 2" />
                    <div className={styles.photoCaption}>Sharing moments together</div>
                  </motion.div>
                </div>
                <div className={styles.photoRow}>
                  <motion.div 
                    className={styles.photo}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src="/img/friends/group3.jpg" alt="Friends group photo 3" />
                    <div className={styles.photoCaption}>Summit celebrations</div>
                  </motion.div>
                  <motion.div 
                    className={styles.photo}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src="/img/friends/group4.jpg" alt="Friends group photo 4" />
                    <div className={styles.photoCaption}>Creating memories together</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </Layout>
  );
}
