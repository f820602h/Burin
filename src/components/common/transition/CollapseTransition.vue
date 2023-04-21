<script setup lang="ts">
type ElementStyle = {
  height: string;
  width: string;
  position: string;
  visibility: string;
  overflow: string;
  paddingTop: string;
  paddingBottom: string;
  borderTopWidth: string;
  borderBottomWidth: string;
  marginTop: string;
  marginBottom: string;
};

type KeyframeObject = {
  height: string;
  opacity: number;
  paddingTop: string;
  paddingBottom: string;
  borderTopWidth: string;
  borderBottomWidth: string;
  marginTop: string;
  marginBottom: string;
};

type AnimateOptions = { duration: number; easing: string };

const props = defineProps({
  duration: {
    type: Number,
    default: 250,
  },
  easingEnter: {
    type: String,
    default: "ease-in-out",
  },
  easingLeave: {
    type: String,
    default: "ease-in-out",
  },
  opacityClosed: {
    type: Number,
    default: 0,
  },
  opacityOpened: {
    type: Number,
    default: 1,
  },
});

const closed = "0px";

function getElementStyle(element: HTMLElement): ElementStyle {
  return {
    height: element.style.height,
    width: element.style.width,
    position: element.style.position,
    visibility: element.style.visibility,
    overflow: element.style.overflow,
    paddingTop: element.style.paddingTop,
    paddingBottom: element.style.paddingBottom,
    borderTopWidth: element.style.borderTopWidth,
    borderBottomWidth: element.style.borderBottomWidth,
    marginTop: element.style.marginTop,
    marginBottom: element.style.marginBottom,
  };
}

function prepareElement(
  element: HTMLElement,
  initialStyle: ElementStyle
): string {
  const { width } = getComputedStyle(element);
  element.style.width = width;
  element.style.position = "absolute";
  element.style.visibility = "hidden";
  element.style.height = "";
  const { height } = getComputedStyle(element);
  element.style.width = initialStyle.width;
  element.style.position = initialStyle.position;
  element.style.visibility = initialStyle.visibility;
  element.style.height = closed;
  element.style.overflow = "hidden";
  return initialStyle.height && initialStyle.height != closed
    ? initialStyle.height
    : height;
}

function animateTransition(
  element: HTMLElement,
  initialStyle: ElementStyle,
  done: () => void,
  keyframes: KeyframeObject[],
  options: AnimateOptions
): void {
  const animation = element.animate(keyframes, options);
  element.style.height = initialStyle.height;
  animation.onfinish = () => {
    element.style.overflow = initialStyle.overflow;
    done();
  };
}

function getEnterKeyframes(
  height: string,
  initialStyle: ElementStyle
): KeyframeObject[] {
  return [
    {
      height: closed,
      opacity: props.opacityClosed,
      paddingTop: closed,
      paddingBottom: closed,
      borderTopWidth: closed,
      borderBottomWidth: closed,
      marginTop: closed,
      marginBottom: closed,
    },
    {
      height,
      opacity: props.opacityOpened,
      paddingTop: initialStyle.paddingTop,
      paddingBottom: initialStyle.paddingBottom,
      borderTopWidth: initialStyle.borderTopWidth,
      borderBottomWidth: initialStyle.borderBottomWidth,
      marginTop: initialStyle.marginTop,
      marginBottom: initialStyle.marginBottom,
    },
  ];
}

function enterTransition(element: HTMLElement, done: () => void): void {
  const HTMLElement = element;
  const initialStyle = getElementStyle(HTMLElement);
  const height = prepareElement(HTMLElement, initialStyle);
  const keyframes = getEnterKeyframes(height, initialStyle);
  const options = { duration: props.duration, easing: props.easingEnter };
  animateTransition(HTMLElement, initialStyle, done, keyframes, options);
}

function leaveTransition(element: HTMLElement, done: () => void): void {
  const HTMLElement = element;
  const initialStyle = getElementStyle(HTMLElement);
  const { height } = getComputedStyle(HTMLElement);
  HTMLElement.style.height = height;
  HTMLElement.style.overflow = "hidden";
  const keyframes = getEnterKeyframes(height, initialStyle).reverse();
  const options = { duration: props.duration, easing: props.easingLeave };
  animateTransition(HTMLElement, initialStyle, done, keyframes, options);
}
</script>

<template>
  <Transition :css="false" @enter="enterTransition" @leave="leaveTransition">
    <slot />
  </Transition>
</template>
