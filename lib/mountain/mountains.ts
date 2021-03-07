export enum EnumMountain {
    WhistlerBlackcomb = "whistler-blackcomb",
    Apex = "apex",
    BigWhite = "big-white",
    Baker = "baker-mountain",
    Cypress = "cypress-mountain",
    Fernie = "fernie",
    Grouse = "grouse-mountain",
    KickingHorse = "kicking-horse",
    ManningPark = "manning-park-resort",
    MtWashington = "mount-washington",
    SilverStar = "silver-star",
    SunPeaks = "sun-peaks",
    RevelStoke = "revelstoke",
    MtSeymour = "mount-seymour"
}

export type WebcamListType = {
  [key in EnumMountain]?: string[]
}

export function getWebcamList(): WebcamListType {
  return {
    [EnumMountain.WhistlerBlackcomb]: [
      "https://common.snow.com/Mtncams/roundhouse2.jpg",
      "https://common.snow.com/Mtncams/roundhouse2.jpg",
      "https://common.snow.com/Mtncams/emerald2.jpg",
      "https://common.snow.com/Mtncams/heli_pad2.jpg",
      "https://common.snow.com/Mtncams/big_red2.jpg",
      "https://common.snow.com/Mtncams/2south.jpg",
      "https://common.snow.com/Mtncams/4west.jpg",
      "https://common.snow.com/Mtncams/5couloir.jpg",
      "https://common.snow.com/Mtncams/7thliftline.jpg"
    ],
    [EnumMountain.Cypress] : [
      "http://panocam.cypressmountain.com/axis-cgi/jpg/image.cgi?resolution=1024x768",
      "http://snowstakecam.cypressmountain.com/axis-cgi/jpg/image.cgi?resolution=1024x768"],
    [EnumMountain.BigWhite]: [
      "http://www.bigwhite.com/images/webcams/desktop/snowghost.jpg?" + Date.now(),
      "http://www.bigwhite.com/images/webcams/full/village.jpg?" + Date.now(),
      "http://www.bigwhite.com/images/webcams/full/hwy33.jpg?" + Date.now(),
      "http://www.bigwhite.com/images/webcams/full/blackforest.jpg?" + Date.now(),
      "http://www.bigwhite.com/images/webcams/full/cliff.jpg?" + Date.now()
    ],
    [EnumMountain.Fernie]: [
      "https://secure.skircr.com/cams/fecam1/image.jpg",
      "https://secure.skircr.com/cams/fecam6/image.jpg"
    ],
    [EnumMountain.RevelStoke]: [
      "http://www.revelstokemountainresort.com/uploads/webcams/stoke.jpg?" + Date.now(),
      "http://www.revelstokemountainresort.com/uploads/webcams/gnorm.jpg?" + Date.now()
    ],
    [EnumMountain.RevelStoke]: [
      "https://www.sunpeaksresort.com/sites/default/files/webcams/sundance.jpg?timestamp=" + Date.now(),
      "https://www.sunpeaksresort.com/sites/default/files/webcams/Village%20Day%20Lodge%20Slopeside.jpg?timestamp=" + Date.now(),
      "https://www.sunpeaksresort.com/sites/default/files/webcams/Elevation%20Chair.jpg?timestamp=" + Date.now()
    ],
    [EnumMountain.MtSeymour]: ["http://mtseymour.ca/webcam_image.php"]
  };
}