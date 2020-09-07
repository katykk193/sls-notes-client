import { useState, useEffect } from 'react';

function useCrash() {
  const [crash, setCrash] = useState(false);

  const fn = async (okToCrash) => {
    if (okToCrash) {
      setCrash(() => {
        throw new Error('Error!');
      });
    }
  };

  useEffect(() => {
    fn(crash);
  }, [crash]);

  return setCrash;
}

export default useCrash;
