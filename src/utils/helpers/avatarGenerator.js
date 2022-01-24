import { createAvatar } from "@dicebear/avatars";
import * as styleAdventurer from "@dicebear/adventurer";
import * as styleMicah from "@dicebear/micah";
import * as styleAvataaars from "@dicebear/avatars-avataaars-sprites";

const generateAvatar = (avatarStyle = "adventurer", seed = "") => {
  const styles = {
    ["adventurer"]: styleAdventurer,
    ["micah"]: styleMicah,
    ["avataaars"]: styleAvataaars,
  };

  const style = styles[avatarStyle];

  const svg = createAvatar(style, { seed });

  return svg;
};

export { generateAvatar };
