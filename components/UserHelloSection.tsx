import React from "react";
import { baseColors } from "@/lib/utils";
import Portfolio from "@/types/Portfolio";
import { GithubIcon } from "lucide-react";
import User from "@/types/User";

function UserHelloSection({
  userData,
  portfolioData,
}: {
  userData: User;
  portfolioData: Portfolio;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 pt-28 md:flex-row md:gap-14">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center">
          <h1
            className="mb-1 text-lg font-semibold md:mb-3 md:text-4xl"
            style={{
              color: baseColors.text_major_color,
            }}
          >
            Hello, I'm {userData.username}
          </h1>
          <p
            className="text-md mb-3 max-w-md md:text-xl"
            style={{
              color: baseColors.text_minor_2_color,
            }}
          >
            {userData.description}
          </p>
          <div className="pt-3">
            <div className="flex items-center justify-center gap-3">
              <a
                href={userData.githubLink ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  backgroundColor: baseColors.text_major_color,
                }}
              >
                <div className="w+[60px]">
                  <GithubIcon 
                    size={28}
                    style={{ color: baseColors.text_minor_color }}
                  />
                </div>
                ;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHelloSection;
