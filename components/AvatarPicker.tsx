import User from "@/types/User";
import { useState } from "react";

const AvatarUrlList = [
    "https://sd-160040.dedibox.fr/hagimont/photo/Daniel1.jpg",
    "https://sd-160040.dedibox.fr/hagimont/photo/Daniel2.jpg",
    "https://sd-160040.dedibox.fr/hagimont/photo/Daniel3.jpg",
    "https://sd-160040.dedibox.fr/hagimont/photo/Daniel5.jpg"
];

export const AvatarPicker = ({ handleChange, user }: { handleChange: (url: string | null) => void, user: User }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [avatar, setAvatar] = useState(user.avatarUrl ?? AvatarUrlList[0]);

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <div
                    className="w-44 h-44 rounded-full bg-gray-100 border-2 border-gray-400 flex justify-center items-center"
                    onClick={() => setShowPicker(!showPicker)}
                >
                    <img
                        className="w-44 h-44 rounded-full"
                        src={avatar}
                        alt="avatar"
                    />
                </div>
                {showPicker && (
                    <div className="absolute top-0 -left-28 w-44 mt-12 rounded-md">
                        <div className="flex flex-wrap justify-center">
                            {AvatarUrlList.map((url) => (
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