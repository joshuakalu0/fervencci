import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Rotator() {
  const query = useRouter();
  const table = query.asPath.split("/")[3] || "user";
  return (
    <div class='rotator-wrapper'>
      <Link href={`/dashboard?page=${table}`}>
        <a>
          <span class='rotator rotator-b'></span>
          <span class='rotator rotator-m'></span>
          <span class='rotator rotator-n'></span>
          <span class='rotator rotator-v'></span>
          <span class='rotator-icon'>
            <ArrowBack />
          </span>
        </a>
      </Link>
    </div>
  );
}
export function RotatorLinkless({ direction, Click }) {
  return (
    <div class='rotator-wrapper'>
      <span class='rotator rotator-b'></span>
      <span class='rotator rotator-m'></span>
      <span class='rotator rotator-n'></span>
      <span class='rotator rotator-v'></span>
      <span class='rotator-icon'>
        {direction == "forword" ? (
          <ArrowForward onClick={Click} />
        ) : (
          <ArrowBack onClick={Click} />
        )}
      </span>
    </div>
  );
}
