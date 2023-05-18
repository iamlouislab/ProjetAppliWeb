import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loading } from "components/Loading";

function Username() {
  const router = useRouter();
  const { username } = router.query;
  const [loadingComplete, setLoadingComplete] = useState(false);

  const [unknownUser, setUnknownUser] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        if (username !== undefined) {
          const res = await fetch("/portfolio/getPortfolioByUsername", {
            method: "POST",
            body: JSON.stringify({ username }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (res.ok) {
            const { portfolio } = await res.json();
            console.log("portfolio", portfolio);
          } else {
            setUnknownUser(true);
          }
          console.log("fetched data");
          setLoadingComplete(true);
        }
      } catch (error) {
        console.log(error);
        setUnknownUser(true);
        setLoadingComplete(true);
      }
    };

    fetchPortfolio();
  }, [username]);

  if (username === undefined || !loadingComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    );
  } else {
    if (unknownUser) {
      return <div>Unknown user</div>;
    } else {
      return <div>Welcome to {username}&apos;s portfolio</div>;
    }
  }
}

export default Username;
