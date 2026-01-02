//import Note from "../models/Note.js";

export async function getDefault(req, res) {
    try {
        res.status(200).json("Successful.");
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

// export async function getNote(req, res) {
//     try {
//         const note = await Note.findById(req.params.id);
//         if (!note) return res.status(404).json({ message: "Note not found." });
//         res.status(200).json(note);
//     } catch (error) {
//         console.error("Error in getNote controller", error);
//         res.status(500).json({ message: "Internal server error." });
//     }
// }

// export async function newNote(req, res) {
//     try {
//         const { title, content } = req.body;
//         const note = new Note({ title: title, content: content});

//         await note.save();
//         res.status(201).json({ message: "Note created succesfully." });
//     } catch (error) {
//         console.error("Error in newNote controller", error);
//         res.status(500).json({ message: "Internal server error." });
//     };
// }

// export async function updateNote(req, res) {
//     try {
//         const { title, content } = req.body;

//         const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content });
//         if (!updatedNote) return res.status(404).json({ message: "Note not found." });

//         res.status(200).json({ message: "Note updated succesfully." });
//     } catch (error) {
//         console.error("Error in updateNote controller", error);
//         res.status(500).json({ message: "Internal server error." });
//     }
// }

// export async function deleteNote(req, res) {
//     try {
//         const deletedNote = await Note.findByIdAndDelete(req.params.id);
//         if (!deletedNote) return res.status(404).json({ message: "Note not found." });

//         res.status(200).json({ message: "Note deleted succesfully." });
//     } catch (error) { 
//         console.error("Error in deleteNote controller", error);
//         res.status(500).json({ message: "Internal server error." });
//     }
// }