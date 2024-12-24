import Image from "next/image";
import Link from "next/link";
import LogoImage from "@/public/logo.svg";
import { buttonVariants } from "../ui/button";

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-5'>
      <Link href={""} className="flex items-center gap-2">
        <Image src={LogoImage} alt="Hero Image" className="size-10" />
          <p className="text-3xl font-semibold">
            Invoice
            <span className="text-blue-500">App</span>
          </p>
      </Link>
      <Link href={"/login"} className={buttonVariants()}>
        Get Started
      </Link>
    </div>
  );
}

export default Navbar;