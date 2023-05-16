import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function ButtonLoading({
  text,
  loading_text,
  loading,
  onClick,
  disabled = false,
}: {
  text: string;
  loading_text: string;
  loading: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      className="flex items-center justify-center"
      disabled={loading || disabled}
      onClick={onClick}
      type="submit"
    >
      {loading && <Loader2 className="mr-2 animate-spin" />}
      {loading ? loading_text : text}
    </Button>
  );
}

export default ButtonLoading;
