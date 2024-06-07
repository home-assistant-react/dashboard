import * as Icons from "../../Icons";

export const getIcon = (name: string) => {
  if (Icons[`W${name}` as keyof typeof Icons]) {
    return Icons[`W${name}` as keyof typeof Icons];
  }
  return Icons.W01d;
};
