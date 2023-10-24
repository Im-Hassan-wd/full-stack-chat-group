import "./Avatar.css";

export default function Avatar({ src }) {
  return (
    <div className="avatar">
      <img src={src} alt="this is what the user looks like" />
    </div>
  );
}
