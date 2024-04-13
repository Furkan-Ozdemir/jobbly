const COLORS = [
  { background: "#193053", text: "#E6CFAC" },
  { background: "#17A980", text: "#E8607F" },
  { background: "#87C33D", text: "#783C68" },
  { background: "#FEABA9", text: "#65549C" },
  { background: "#FDF4CD", text: "#660F96" },
  { background: "#F6A48C", text: "#6D5B4B" },
  { background: "#727EB5", text: "#8D8B4A" },
  { background: "#533E59", text: "#ACC1A6" },
  { background: "#2F2345", text: "#D0DEBE" },
  { background: "#029AD6", text: "#FD3C66" },
  { background: "#c4cf4a", text: "#453ABA" },
];

export default function generateColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}
