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
import { baseColors } from "../../../lib/utils";
import { AuthContext } from "@/contexts/authContext";
import Portfolio from "@/types/Portfolio";
import useUserData from "@/hooks/useUserData";
import Section from "@/types/Section";
import Card from "@/types/Card";
import { authFetch } from "@/utils/authFetch";
import withAuthentication from "@/hoc/withAuthentification";

function profile() {
  const { userData, isLoading, errorMessage } = useUserData();

  // get the list of cards that are in all the sectinos
  const cards = userData?.sections.map((section) => section.cards).flat();

  if (isLoading || !userData) {
    return <div>Loading...</div>;
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
    <>
      <div className="mx-auto flex w-5/6 flex-col gap-2 pt-8">
        <div className="text-6xl text-white">Hi!</div>
        <div className="text-2xl text-white">
          Welcome to your profile, here you can edit your portfolio.
        </div>
        <div className="flex w-1/2 flex-row justify-start gap-2">
          <CreateCardButton
            user_id={userData.user.id}
            sections={userData.sections}
          />
          {/* user should never be null */}
          <CreateSectionButton
            user_id={userData.user.id}
            portfolio_id={userData.id}
          />
        </div>
      </div>
      <div className="mx-auto flex w-5/6 flex-col gap-10 pt-8">
        <div className="text-2xl text-white">
          <div className="mb-2 text-2xl text-white">Your sections</div>
          <div className="flex flex-col gap-2">
            <SectionRowHeader />
            {userData.sections.map((section, index) => (
              <SectionRow section={section} key={index} />
            ))}
          </div>
        </div>

        <div className="text-2xl text-white">
          <div className="mb-2 text-2xl text-white">Your cards</div>
          <div className="flex flex-col gap-2">
            <CardRowHeader />
            {cards?.map((card, index) => (
              <CardRow card={card} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const SectionRowHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-10 rounded bg-gray-200 py-2 text-2xl font-bold text-black">
      <div className="flex flex-row">
        <div className="ml-2">Title</div>
        <div className="ml-2">Description</div>
        <div className="ml-2">Cards</div>
      </div>
      <div className="flex flex-row gap-2 rounded bg-gray-200 py-2 text-2xl font-bold text-black">
        <div className="mr-2">Actions</div>
      </div>
    </div>
  );
};

const CardRowHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-10 rounded bg-gray-200 py-2 text-2xl font-bold text-black">
      <div className="flex flex-row">
        <div className="ml-2">Title</div>
        <div className="ml-2">Description</div>
        <div className="ml-2">Keywords</div>
      </div>
      <div className="flex flex-row gap-2 rounded bg-gray-200 py-2 text-2xl font-bold text-black">
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
        <div className="ml-2">{card.title}</div>
        <div className="ml-2">{card.description}</div>
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
    const res = await authFetch("/sections/delete", {
      method: "POST",
      body: JSON.stringify({ section_id: section.id }),
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
      <AlertDialogContent>
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
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const DeleteCardButton = ({ card }: { card: Card }) => {
  const deleteCard = async () => {
    const res = await authFetch("/cards/delete", {
      method: "POST",
      body: JSON.stringify({ card_id: card.id }),
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
      <AlertDialogContent>
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
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const CreateCardButton = ({
  user_id,
  sections,
}: {
  user_id: number;
  sections: Section[];
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(
    null
  );

  const createCard = async ({
    title,
    description,
    link,
  }: {
    title: string;
    description: string;
    link: string;
  }) => {
    setLoading(true);

    if (!selectedSectionId) {
      setError("Please select a section");
      setLoading(false);
      return;
    }

    console.log("Creating card with title: ", title);
    const res = await authFetch("/cards/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        link,
        section_id: selectedSectionId,
        user_id: user_id,
      }),
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
        <Button variant="outline" className="bg-black">
          Create card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create card</DialogTitle>
          <DialogDescription>Create a new card.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-white">
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
            <Label htmlFor="title" className="text-right text-white">
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
            <Label htmlFor="link" className="text-right text-white">
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
            <Label htmlFor="section" className="text-right text-white">
              Section (choose from existing ones)
            </Label>
            <Select
              onValueChange={(value) => setSelectedSectionId(parseInt(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((section) => (
                  <div key={section.id}>
                    <SelectItem value={section.id as unknown as string}>
                      {section.title}
                    </SelectItem>
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <div className="flex items-center justify-center gap-5">
            {error && <p className="text-red-500">{error}</p>}
            <ButtonLoading
              text="Create card"
              loading_text={"Creating..."}
              loading={loading}
              onClick={() => createCard({ title, description, link })}
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CreateSectionButton = ({
  user_id,
  portfolio_id,
}: {
  user_id: number;
  portfolio_id: number;
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

    const res = await authFetch("/sections/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        user_id,
        portfolio_id,
      }),
    });

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
        <Button variant="outline" className="bg-black">
          Create section
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create section</DialogTitle>
          <DialogDescription>Create a new section.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-white">
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
            <Label htmlFor="title" className="text-right text-white">
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
              text="Create card"
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

export default withAuthentication(profile);
