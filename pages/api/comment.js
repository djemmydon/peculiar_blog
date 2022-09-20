import axios from "axios";
import nc from "next-connect";

const handler = nc();

handler.post(async (req, res) => {
  const projectId = "yiwkeouh";
  const dataset = "production";
  const tokenWithAccess =
    "skLrJXvHmUrXGNrV6AGhVrYI67Y1n673I44AHQS7YQavxj5Qu32jnIWLmyhdoBnIMPHspWIAfXyjNDemq3oZr8rBpmcm2W6e02Z8wrwyIbi9yVJXWgNTY8S25GbK74EGoJIjrtn5mh9uWmEVbeLDbdsHOBDfyP4QyjqNj82tUnpvbkC9EMqG";

  const createMutation = [
    {
      create: {
        _type: "comments",
        post: {
          _type: "reference",
          _ref: req.body._id,
        },
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        approved: false,
      },
    },
  ];

  await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    {
      mutations: createMutation,
    },
    {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${tokenWithAccess}`,
      },
    }
  );
  res.status(201).send({ message: "Sent" });
  console.log(res);
});

export default handler;
