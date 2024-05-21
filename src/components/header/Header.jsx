import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Your Voice, Your Platform</span>
        <span className="headerTitleLg text-orange-600">RENTIFY</span>
      </div>
      <img
        className="headerImg"
        src="https://cdn.pixabay.com/photo/2016/10/16/13/06/new-york-1745089_1280.jpg"
        alt=""
      />
    </div>
  );
}
