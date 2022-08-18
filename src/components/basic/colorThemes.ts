export interface ColorThemeObject {
  front: string;
  back: string;
}

export interface ColorThemes {
  normal: ColorThemeObject;
  dark?: ColorThemeObject;
  confirm?: ColorThemeObject;
  cancel?: ColorThemeObject;
  disabled?: ColorThemeObject;
}

export const buttonColorThemes: ColorThemes = {
  normal: { front: "bg-zinc-200", back: "bg-zinc-400" },
  dark: { front: "bg-stone-400", back: "bg-stone-600" },
  confirm: { front: "bg-green-600", back: "bg-green-900" },
  cancel: { front: "bg-red-600", back: "bg-red-900" },
  disabled: { front: "bg-white/40", back: "bg-white/30" },
};

export const knobColorThemes: ColorThemes = {
  normal: { front: "bg-zinc-200", back: "bg-zinc-400" },
  dark: { front: "bg-stone-400", back: "bg-stone-600" },
};
