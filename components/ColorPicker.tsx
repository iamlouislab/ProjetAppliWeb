import { useState } from "react";
import { Button } from "./ui/button";
import { SketchPicker } from "react-color";

const ColorPicker = ({
  initialColor,
  onChange,
}: {
  initialColor: string;
  onChange: (color: string) => void;
}) => {
  const [color, setColor] = useState(initialColor);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: any) => {
    setColor(color.hex);
    onChange(color.hex);
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className="h-8 w-12 rounded border border-white"
        style={{ backgroundColor: color }}
      ></div>
      <Button variant="outline" onClick={handleClick}>
        Choose color
      </Button>
      {displayColorPicker ? (
        <div className="absolute z-10">
          <div className="fixed inset-0" onClick={handleClose}></div>
          <SketchPicker color={color as any} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
