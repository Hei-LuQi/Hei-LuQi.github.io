import React from 'react';
import styles from './Timeline.module.css';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className={styles.timeline}>
      {events.map((event, index) => (
        <div key={index} className={styles.timelineItem}>
          <div className={styles.timelinePoint}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineLine} />
          </div>
          <div className={styles.timelineContent}>
            <div className={styles.timelineDate}>{event.date}</div>
            <h3 className={styles.timelineTitle}>{event.title}</h3>
            <p className={styles.timelineDescription}>{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline; 