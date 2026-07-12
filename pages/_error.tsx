import Image from "next/image";

export default function ServerError() {
  return (
    <div>
      <Image
        src="/server-error.gif"
        alt="Oops! Server is down"
        width={400}
        height={400}
      />
    </div>
  );
}
