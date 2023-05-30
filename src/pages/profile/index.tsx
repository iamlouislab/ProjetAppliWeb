import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import ButtonLoading from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthContext } from "@/contexts/authContext";
import useUserData from "@/hooks/useUserData";
import Section from "@/types/Section";
import Card from "@/types/Card";
import { authFetch } from "@/utils/authFetch";
import withAuthentication from "@/hoc/withAuthentification";
import ColorPicker from "@/components/ColorPicker";
import { Loading } from "@/components/Loading";
import { AvatarPicker } from "@/components/AvatarPicker";
import User from "@/types/User";

function profile() {
  const { userData, isLoading, errorMessage } = useUserData();

  // get the list of cards that are in all the sectinos
  const cards = userData?.sections?.flatMap((section) => section.cards) ?? [];

  if (isLoading || !userData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <>
        <div className="mx-auto flex w-5/6 flex-col gap-2 pt-8">
          <div className="text-6xl text-white">
            Error while fetching portfolio
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-black h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-10 flex flex-col gap-8 content-center">
          <div className="flex justify-center items-center"
                style={{ backgroundColor: "#171717" }}>
            <AvatarPicker handleChange={async (avatarUrl) => {
              console.log("userData", userData);
              userData.user.avatarUrl = avatarUrl ?? "";
              await fetch("http://localhost:8080/ProjetAppliWeb/rest/users/updateUser/", {
                method: "PUT",
                body: JSON.stringify(userData.user),
                headers: {
                  "Content-Type": "application/json",
                },
              });
            }} user={userData.user} />
            <div
              className="text-white p-6 shadow-md grid gap-16 "
            >
              <div className="mx-auto flex w-full flex-col gap-2 p-8 ">
                <div className="text-6xl  text-white text-center">
                  Welcome back!
                </div>
                <div className="text-2xl text-white text-center">
                  There you can edit your portfolio.
                </div>
                <div className="flex flex-row gap-2 mx-auto">
                  <CreateCardButton user={userData.user} sections={userData.sections} />
                  <CreateSectionButton user={userData.user} portfolioId={userData.id} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-8 content-center">
          <div
            className="text-white p-6 shadow-md grid gap-16 "
            style={{ backgroundColor: "#171717" }}
          >
            <div className="mx-auto flex w-5/6 flex-col gap-2 ">
              <div className="text-2xl text-white">Your sections</div>
              <div className="flex flex-col gap-2">
                <SectionRowHeader />
                {userData.sections.map((section, index) => (
                  <SectionRow section={section} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-8 content-center">
          <div
            className="text-white p-6 shadow-md grid gap-16 "
            style={{ backgroundColor: "#171717" }}
          >
            <div className="mx-auto flex w-5/6 flex-col gap-2 ">
              <div className="text-2xl text-white">Your cards</div>
              <div className="flex flex-col gap-2">
                <CardRowHeader />
                {cards?.map((card, index) => (
                  <CardRow card={card} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SectionRowHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-10 rounded bg-white py-2 text-2xl font-bold text-black">
      <div className="flex flex-row ">
        <div className="ml-2">Title</div>
        <div className="ml-2">Description</div>
      </div>
      <div className="flex flex-row gap-2 rounded py-2 text-2xl font-bold text-black">
        <div className="mr-2">Actions</div>
      </div>
    </div>
  );
};

const CardRowHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-10 rounded bg-white py-2 text-2xl font-bold text-black">
      <div className="flex flex-row">
        <div className="ml-2">Title</div>
        <div className="ml-2">Description</div>
      </div>
      <div className="flex flex-row gap-2 rounded py-2 text-2xl font-bold text-black">
        <div className="mr-2">Actions</div>
      </div>
    </div>
  );
};

const SectionRow = ({ section }: { section: Section }) => {
  return (
    <div className="flex flex-row items-center justify-between gap-10 rounded bg-slate-100 py-2 text-2xl text-black">
      <div className="flex flex-row items-start">
        <div className="ml-2">{section.title}</div>
        <div className="ml-2">{section.description}</div>
      </div>
      <div className="flex flex-row items-center gap-2 rounded bg-slate-100 py-2 text-2xl text-black">
        <div className="mr-2">
          <DeleteSectionButton section={section} />
        </div>
      </div>
    </div>
  );
};

const CardRow = ({ card }: { card: Card }) => {
  return (
    <div className="flex flex-row items-center justify-between gap-10 rounded bg-slate-100 py-2 text-2xl text-black">
      <div className="flex flex-row items-start">
        <div className="ml-2">{card?.title}</div>
        <div className="ml-2">{card?.description}</div>
      </div>
      <div className="flex flex-row items-center gap-2 rounded bg-slate-100 py-2 text-2xl text-black">
        <div className="mr-2">
          <DeleteCardButton card={card} />
        </div>
      </div>
    </div>
  );
};

const DeleteSectionButton = ({ section }: { section: Section }) => {
  const deleteSection = async () => {
    console.log("Deleting section with id: ", section.id);
    const res = await fetch(
      "http://localhost:8080/ProjetAppliWeb/rest/section/deleteSection/" + section.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);

    if (res.status === 200) {
      window.location.reload();
    } else {
      console.log("Error deleting section");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            section from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteSection()}>
            <div className="text-red-600">
            Continue
            </div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const DeleteCardButton = ({ card }: { card: Card }) => {
  const deleteCard = async () => {
    console.log(card)
    const res = await fetch(
      "http://localhost:8080/ProjetAppliWeb/rest/card/deleteCard/" + card.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      window.location.reload();
    }

    console.log(res);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            section from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteCard()}>
            <div className = "text-red-600">
            Continue
            </div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const CreateCardButton = ({
  user,
  sections,
}: {
  user: User;
  sections: Section[];
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const [imageUrl, setImageUrl] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section>(
    null as unknown as Section
  );

  const createCard = async ({
    title,
    description,
    link,
    color,
    imageUrl,
  }: {
    title: string;
    description: string;
    link: string;
    color: string;
    imageUrl: string;
  }) => {
    setLoading(true);

    if (!selectedSection) {
      setError("Please select a section");
      setLoading(false);
      return;
    }

    console.log("Creating card with title: ", title);
    const res = await fetch("http://localhost:8080/ProjetAppliWeb/rest/card/createCard", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        link,
        sectionId: selectedSection.id,
        color: color,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      window.location.reload();
    } else {
      setError("Error creating card");
    }

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-black text-white">
          Create card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Create card</DialogTitle>
          <DialogDescription>Create a new card.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-black">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              className="col-span-3"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Description
            </Label>

            <Input
              id="description"
              value={description}
              className="col-span-3"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
              Link
            </Label>
            <Input
              id="link"
              value={link}
              className="col-span-3"
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="section" className="text-right">
              Section (choose from existing ones)
            </Label>
            <Select
              onValueChange={(value) =>
                setSelectedSection(
                  sections.find((section) => section.title === value) as Section
                )
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                {sections?.map((section) => (
                  <div key={section.id}>
                    <SelectItem value={section.title}>
                      {section.title}
                    </SelectItem>
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="color" className="block text-gray-700 font-bold mb-2">
            Color
          </Label>
          <ColorPicker initialColor={color} onChange={setColor} />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="imageUrl" className="text-right">
            Image Url
          </Label>
          <Input
            id="imageUrl"
            value={imageUrl}
            className="col-span-3"
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          />
        </div>
        <DialogFooter>
          <div className="flex items-center justify-center gap-5">
            {error && <p className="text-red-500">{error}</p>}
            <ButtonLoading
              text="Create card"
              loading_text={"Creating..."}
              loading={loading}
              onClick={() =>
                createCard({ title, description, link, color, imageUrl })
              }
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CreateSectionButton = ({
  user,
  portfolioId,
}: {
  user: User;
  portfolioId: Number;
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createSection = async ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    setLoading(true);
    console.log(portfolioId)
    const res = await fetch(
      "http://localhost:8080/ProjetAppliWeb/rest/section/createSection", // + portfolio.id.toString(),
      {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          portfolioId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      window.location.reload();
    } else {
      setError("Error creating section");
    }

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-black text-white">
          Create section
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Create section</DialogTitle>
          <DialogDescription>Create a new section.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-black">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              className="col-span-3"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              className="col-span-3"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex items-center justify-center gap-5">
            {error && <p className="text-red-500">{error}</p>}
            <ButtonLoading
              text="Create section"
              loading_text={"Creating..."}
              loading={loading}
              onClick={() => createSection({ title, description })}
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default profile;
