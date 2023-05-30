import Card from "@/types/Card";
import { useState } from "react";

const CardImgUrlList = [
    "https://wallpaperaccess.com/full/334698.jpg",
    "https://wallpapercosmos.com/w/full/2/7/8/1209988-3840x2160-desktop-4k-glow-in-the-dark-background.jpg",
    "https://wallpapercosmos.com/w/full/7/4/d/1210101-3840x2160-desktop-4k-glow-in-the-dark-wallpaper-photo.jpg",
    "https://wallpapercosmos.com/w/full/0/c/8/1210001-1920x1080-desktop-1080p-glow-in-the-dark-wallpaper-image.jpg",
    "https://wallpapercosmos.com/w/full/6/a/4/1210003-1920x1080-desktop-full-hd-glow-in-the-dark-background-photo.jpg",
    "https://wallpapercosmos.com/w/full/f/f/6/1210308-1920x1080-desktop-full-hd-glow-in-the-dark-background-photo.jpg",
    "https://wallpapercosmos.com/w/full/5/7/e/1210089-3840x2160-desktop-4k-glow-in-the-dark-background-image.jpg",
    "https://wallpapercosmos.com/w/full/9/9/c/1210216-3840x2160-desktop-4k-glow-in-the-dark-background-photo.jpg"

];

export const CardImgPicker = ({ handleChange, card }: { handleChange: (url: string | null) => void, card: Card }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [avatar, setAvatar] = useState(card.imageUrl?? CardImgUrlList[0]);

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <div
                    className="w-44 h-11 rounded-full bg-gray-100 border-2 border-gray-400 flex justify-center items-center"
                    onClick={() => setShowPicker(!showPicker)}
                >
                    <img
                        className="w-44 h-11 rounded-full"
                        src={avatar}
                        alt="avatar"
                    />
                </div>
                {showPicker && (
                    <div className="absolute top-0 -left-28 mt-12 rounded-md z-10">
                        <div className="flex flex-row justify-center">
                            {CardImgUrlList.map((url) => (
                                <div
                                    key={url}
                                    className="w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-400 flex justify-center items-center m-1"
                                    onClick={() => {
                                        setAvatar(url);
                                        handleChange(url);
                                        setShowPicker(false);
                                    }}
                                >
                                    <img
                                        className="w-20 h-20 rounded-full"
                                        src={url}
                                        alt="avatar"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}