import React, { useState, useEffect } from 'react';

// Fixed component with no linting issues
const TestLinter: React.FC = () => {
  // Using the state properly
  const [count, setCount] = useState(0);
  
  // Properly configured useEffect with dependencies
  useEffect(() => {
    // Using count in the effect
    document.title = `Count: ${count}`;
  }, [count]);
  
  return (
    <div>
      <h1>Test Linter Component</h1>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
};

export default TestLinter;