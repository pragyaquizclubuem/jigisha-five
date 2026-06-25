export interface MapSectionData {
  heading: string;
  venueLabel: string;
  venueName: string;
  locationLabel: string;
  locationAddress: string;
  supportingDescription: string;
  ctaText: string;
  locationUrl: string;
  mapImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export const mapData: MapSectionData = {
  heading: "YOUR ROUTE TO JIGISHA 5.0",
  venueLabel: "Venue",
  venueName: "University of Engineering and Management, Kolkata (IEM Newtown Campus)",
  locationLabel: "Location",
  locationAddress: "University Area, Plot No. III, B/5, New Town Road, Action Area III, Newtown, Kolkata, West Bengal 700160",
  supportingDescription: "JOIN US FOR AN UNFORGETTABLE CELEBRATION OF QUIZZING, CURIOSITY AND COMPETITION AT JIGISHA 5.0.",
  ctaText: "LOCATE THE VENUE",
  locationUrl: "https://maps.app.goo.gl/AsneiTZtM9TQKfVv8",
  mapImage: {
    src: "/images/map_preview.png",
    alt: "Google Maps preview of University of Engineering and Management (UEM) Kolkata campus location in Newtown",
    width: 600,
    height: 600,
  },
};
