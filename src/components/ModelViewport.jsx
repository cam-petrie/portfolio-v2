import { useEffect, useRef } from "react";

// Mounts a three.js scene (mountLaptop / mountDesk) into a transparent container.
export default function ModelViewport({ mount, options, onReady, className = "", caption, label }) {
  const ref = useRef(null);
  const apiRef = useRef(null);

  useEffect(() => {
    const api = mount(ref.current, options);
    apiRef.current = api;
    onReady?.(api);
    return () => api.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mount]);

  return (
    <div className={"viewport " + className} role="img" aria-label={label}>
      <div ref={ref} className="viewport__stage" />
      {caption && <span className="viewport__caption">{caption}</span>}
    </div>
  );
}
