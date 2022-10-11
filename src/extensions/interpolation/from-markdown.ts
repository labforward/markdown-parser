export const enter = {
  bangInterpolation: onEnterBangIntepolation,
  interpolation: onEnterIntepolation,
};

export const exit = {
  bangInterpolation: onExit,
  interpolation: onExit,
};

function onEnterBangIntepolation(token) {
  this.enter(
    {
      type: "banginterpolation",
      props: { formula: this.sliceSerialize(token).replace(/\\\|/g, "|") },
      children: [],
    },
    token
  );
}

function onEnterIntepolation(token) {
  this.enter(
    {
      type: "interpolation",
      props: { formula: this.sliceSerialize(token).replace(/\\\|/g, "|") },
      children: [],
    },
    token
  );
}

function onExit(token) {
  this.exit(token);
}
