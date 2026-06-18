if (CSS.paintWorklet) {
  CSS.paintWorklet.addModule('/paintlet/border/polygon-border.js');
} else {
  console.log("Your browser doesn't support the Paint API :(");
}
