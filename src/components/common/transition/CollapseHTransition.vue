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
  width: string;
  opacity: number;
  paddingTop: string;
  paddingBottom: string;
  borderTopWidth: string;
  borderBottomWidth: string;
  marginTop: string;
  marginBottom: string;
};

type AnimateOptions = { duration: number; easing: string };

const emit = defineEmits<{
  (e: "before-enter"): void;
  (e: "before-leave"): void;
  (e: "after-enter"): void;
  (e: "after-leave"): void;
}>();

const props = withDefaults(
  defineProps<{
    duration?: number;
    easingEnter?: string;
    easingLeave?: string;
    opacityClosed?: number;
    opacityOpened?: number;
  }>(),
  {
    duration: 250,
    easingEnter: "ease-in-out",
    easingLeave: "ease-in-out",
    opacityClosed: 0,
    opacityOpened: 0,
  },
);

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
  initialStyle: ElementStyle,
): string {
  const { height } = getComputedStyle(element);
  element.style.height = height;
  element.style.position = "absolute";
  element.style.visibility = "hidden";
  element.style.width = "";
  const { width } = getComputedStyle(element);
  element.style.width = closed;
  element.style.height = initialStyle.height;
  element.style.position = initialStyle.position;
  element.style.visibility = initialStyle.visibility;
  // element.style.overflow = "hidden";
  return initialStyle.width && initialStyle.width != closed
    ? initialStyle.width
    : width;
}

function animateTransition(
  element: HTMLElement,
  initialStyle: ElementStyle,
  done: () => void,
  keyframes: KeyframeObject[],
  options: AnimateOptions,
): void {
  const animation = element.animate(keyframes, options);
  element.style.width = initialStyle.width;
  animation.onfinish = () => {
    element.style.overflow = initialStyle.overflow;
    done();
  };
}

function getEnterKeyframes(
  width: string,
  initialStyle: ElementStyle,
): KeyframeObject[] {
  return [
    {
      width: closed,
      opacity: props.opacityClosed,
      paddingTop: closed,
      paddingBottom: closed,
      borderTopWidth: closed,
      borderBottomWidth: closed,
      marginTop: closed,
      marginBottom: closed,
    },
    {
      width,
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

function enterTransition(element: Element, done: () => void): void {
  const HTMLElement = element as HTMLElement;
  const initialStyle = getElementStyle(HTMLElement);
  const width = prepareElement(HTMLElement, initialStyle);
  const keyframes = getEnterKeyframes(width, initialStyle);
  const options = { duration: props.duration, easing: props.easingEnter };
  animateTransition(HTMLElement, initialStyle, done, keyframes, options);
}

function leaveTransition(element: Element, done: () => void): void {
  const HTMLElement = element as HTMLElement;
  const initialStyle = getElementStyle(HTMLElement);
  const { width } = getComputedStyle(HTMLElement);
  HTMLElement.style.width = width;
  // HTMLElement.style.overflow = "hidden";
  const keyframes = getEnterKeyframes(width, initialStyle).reverse();
  const options = { duration: props.duration, easing: props.easingLeave };
  animateTransition(HTMLElement, initialStyle, done, keyframes, options);
}
</script>

<template>
  <Transition
    :css="false"
    @enter="enterTransition"
    @leave="leaveTransition"
    @before-enter="emit('before-enter')"
    @before-leave="emit('before-leave')"
    @after-enter="emit('after-enter')"
    @after-leave="emit('after-leave')"
  >
    <slot />
  </Transition>
</template>
