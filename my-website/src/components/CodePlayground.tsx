import React, { useState } from 'react';
import styles from './CodePlayground.module.css';

interface CodePlaygroundProps {
  defaultCode: string;
  height?: number;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({ defaultCode, height = 300 }) => {
  const [code, setCode] = useState(defaultCode.trim());

  return (
    <div className={styles.playground} style={{ height }}>
      <div className={styles.editor}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={styles.textarea}
          spellCheck="false"
        />
      </div>
      <div className={styles.controls}>
        <button 
          className={styles.button}
          onClick={() => setCode(defaultCode.trim())}
        >
          重置代码
        </button>
      </div>
    </div>
  );
};

export default CodePlayground; 