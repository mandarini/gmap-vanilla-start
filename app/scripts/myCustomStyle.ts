export const myCustomStyle = [
  /**
   * HERE is all the info you may need
   * https://developers.google.com/maps/documentation/javascript/style-reference
   */
  { elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#222222" }]
  }
];
