import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loading } from "components/Loading";
import { baseColors } from "@/lib/utils";
import UserHelloSection from "@/components/UserHelloSection";
import Portfolio from "@/types/Portfolio";
import Section from "@/types/Section";
import SectionComponent from "@/components/SectionComponent";
import User from "@/types/User";

function Username() {
  const router = useRouter();
  const { username } = router.query;
  const [loadingComplete, setLoadingComplete] = useState(false);

  const [unknownUser, setUnknownUser] = useState(false);
  const [userData, setUserData] = useState<User>();
  const [portfolio, setPortfolio] = useState<Portfolio>();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        if (username !== undefined) {
          const res = await fetch(
            "http://localhost:8080/ProjetAppliWeb/rest/portfolio/getPortfolioByUsername/" + username,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (res.ok) {
            const { portfolio, user } = await res.json();
            console.log("portfolio", portfolio);
            console.log("user", user);
            setPortfolio(portfolio);
            setUserData(user);
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
      return <div className="text-white">Unknown user</div>;
    } else {
      return (
        <div
          style={{
            backgroundColor:
              userData?.backgroundColor || baseColors.background_color,
          }}
          className="min-h-screen"
        >
          <div className="mx-auto w-5/6">
            <UserHelloSection userData={userData!} portfolioData={portfolio!} />
            {portfolio?.sections?.map((section: Section, index) => (
              <div key={index}>
                <SectionComponent
                  key={index}
                  sectionInformation={section as Section}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default Username;
