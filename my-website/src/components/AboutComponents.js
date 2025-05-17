import React from 'react';
import { motion } from 'framer-motion';

export const Avatar = () => (
  <motion.div
    style={{
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      overflow: 'hidden',
      margin: '1rem auto'
    }}
    whileHover={{ scale: 1.1 }}
  />
);

export const Highlight = ({children}) => (
  <span style={{
    background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    padding: '0 4px'
  }}>
    {children}
  </span>
);

export const Card = ({icon, title, children}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={{
      padding: '1.5rem',
      borderRadius: '12px',
      backgroundColor: 'var(--ifm-card-background-color)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem'
    }}
  >
    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{icon}</div>
    <h3 style={{ margin: '0.5rem 0' }}>{title}</h3>
    <div>{children}</div>
  </motion.div>
); 