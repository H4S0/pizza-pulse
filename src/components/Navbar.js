import Link from "next/link";
import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
      <div>ST BURGER</div>
      <ul className="flex gap-8">
        <Link href="href">Home</Link>
        <Link href="href">About</Link>
        <Link href="href">Menu</Link>
        <Link href="href">Locations</Link>
        <Button>Sign UP</Button>
      </ul>
      <div className="flex flex-col">
        <div className="flex gap-7">
          <p>CALL and ORDER</p>
          <p>ST BURGER</p>
        </div>
        <p className="text-center">+291 9999999</p>
      </div>
    </nav>
  );
};

export default Navbar;
