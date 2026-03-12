

export function getAllNotes(req,res) {
  res.status(200).send("you fetched the nodes");
}
export function createNote(req,res) {
  res.status(201).json({ message: "note created successfully!" });
}
export function updateNote(req,res) {
  res.status(200).json({ message: "note updated successfully!" });
}
export function deleteNote(req,res) {
  res.status(200).json({ message: "note deleted successfully!" });
}

// router.post("/", (req, res) => {
//   res.status(201).json({ message: "note created successfully!" });
// });

// router.put("/:id", (req, res) => {
//   res.status(200).json({ message: "note updated successfully!" });
// });

// router.put("/:id", (req, res) => {
//   res.status(200).json({ message: "note deleted successfully!" });
// });
