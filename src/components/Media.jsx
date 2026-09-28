export default function Media({ src, alt = "", className = "" }) {
  return (
    <span className={"media " + className} style={{ "--media-src": `url("${src}")` }}>
      <img src={src} alt={alt} loading="lazy" />
    </span>
  );
}
