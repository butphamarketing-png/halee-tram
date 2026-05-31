export const publicAsset = (file: string) =>
  `${import.meta.env.BASE_URL}${file}`.replace(/([^:]\/)\/+/g, "$1");

export const LOGO_ICON_SRC = publicAsset("logo.tachnen.png");
