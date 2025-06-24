export function actionTitle(action: {
  description: string;
  hotkey?: string;
}): string {
  const { description, hotkey } = action;
  if (hotkey) {
    const formattedHotkey = hotkey
      .split("+")
      .map((key) => key.charAt(0).toUpperCase() + key.slice(1))
      .join("+");
    return `${description} (${formattedHotkey})`;
  }
  return description;
}
