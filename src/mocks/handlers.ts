import { rest } from "msw";

// Mock handlers
const handlers = [
  rest.get("http://localhost:5173/dataSet", (req, res, ctx) => {
    // Mock data
    const users = [
      {
        name: "Aachen",
        id: "1",
        nametype: "Valid",
        recclass: "L5",
        mass: "21",
        fall: "Fell",
        year: "1880-01-01T00:00:00.000",
        reclat: "50.775000",
        reclong: "6.083330",
        geolocation: {
          type: "Point",
          coordinates: [6.08333, 50.775],
        },
      },
      {
        name: "Aarhus",
        id: "2",
        nametype: "Valid",
        recclass: "H6",
        mass: "720",
        fall: "Fell",
        year: "1951-01-01T00:00:00.000",
        reclat: "56.183330",
        reclong: "10.233330",
        geolocation: {
          type: "Point",
          coordinates: [10.23333, 56.18333],
        },
      },
    ];

    return res(ctx.status(200), ctx.json(users));
  }),
];

export default handlers;
