import { useState } from 'react';

function ImageContent({ src, alt = '', ...props }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return <img {...props} src={src} alt={alt} onError={() => setFailed(true)} />;
}

export default function PortfolioImage(props) {
  // Reset the error state whenever an image URL changes in the JSON.
  return <ImageContent key={props.src} {...props} />;
}
