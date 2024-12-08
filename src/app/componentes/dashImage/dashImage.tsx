import Image from "next/image";
import dash from "../../images/dashImage.jpg";

export default function dashImage() {
  return (
    <Image
      className="logomarca"
      src={dash}
      alt="dash"
      width={1400}
      height={700}
    />
  );
}
