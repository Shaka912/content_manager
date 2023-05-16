import { connectdb } from "../../../lib/mongodb";
import Tags from "../../../models/tags";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const {
      query: { id },
    } = req;
    if (!id) {
      res.status(400).json({ error: "ID is required" });
      return;
    }
    try {
      const tags = await Tags.findByIdAndDelete(id);

      if (!tags) {
        return res.status(404).json({ message: "No tags found" });
      }
      res.status(200).json({ message: "Tags deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
}
