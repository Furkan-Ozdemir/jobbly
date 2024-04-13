const COLORS = [
  "#193053",
  "#17A980",
  "#87C33D",
  "#FEABA9",
  "#FDF4CD",
  "#F6A48C",
  "#727EB5",
  "#533E59",
  "#2F2345",
  "#029AD6",
  "#c4cf4a",
];

export default function generateColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}
