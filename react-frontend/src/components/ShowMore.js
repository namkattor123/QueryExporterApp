import React, { useState } from 'react';

const ShowMore = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  // Kiểm tra xem text có tồn tại không trước khi sử dụng slice
  if (!text) {
    return null;
  }

  return (
    <div>
      {isTruncated ? (
        <div>
          {text.slice(0, maxLength)}
          <span onClick={toggleTruncate} style={{ cursor: 'pointer', color: 'blue' }}>
            ...Show more
          </span>
        </div>
      ) : (
        <div>
          {text}
          <span onClick={toggleTruncate} style={{ cursor: 'pointer', color: 'blue' }}>
            ...Show less
          </span>
        </div>
      )}
    </div>
  );
};

export default ShowMore;
