import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loading } from "components/Loading";

function Username() {
  const router = useRouter();
  const { username } = router.query;
  const [loadingComplete, setLoadingComplete] = useState(false);

  const [unknownUser, setUnknownUser] = useState(false);
  const [noPortfolio, setNoPortfolio] = useState(false);

  useEffect(() => {
    if (username !== undefined) {
      //   fetch(`/api/profile/${username}`)
      //     .then((res) => res.json())
      //     .then((data) => {
      //       if (data.error) {
      //         setUnknownUser(true);
      //       } else {
      //         setUserData(data.userData);
      //         setPortfolio(data.portfolioData);
      //         setUserSections(data.sectionsData);
      //       }
      //       setLoadingComplete(true);
      console.log("fetched data");
      setLoadingComplete(true);
    }
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
      if (noPortfolio) {
        return <div>User has no portfolio</div>;
      } else {
        return <div>Welcome to {username}&apos;s portfolio</div>;
      }
    }
  }
}

export default Username;
