import { Slideshow } from "./Slideshow";
import { slideshowConfiguration } from "./configuration";
import { slideshowInitialStyle } from "./initial-style";
import { getSlideshowIcon } from "./get-icon";

const SlideshowPanel = Slideshow;

SlideshowPanel.configOptions = slideshowConfiguration;
SlideshowPanel.panelInitialStyle = slideshowInitialStyle;
SlideshowPanel.getIcon = getSlideshowIcon;

export { SlideshowPanel };
