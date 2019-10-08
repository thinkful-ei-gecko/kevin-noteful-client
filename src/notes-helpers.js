export const findFolder = (folders = [], folderId) =>
  folders.find((folder) => folder.id === folderId);

export const findNote = (notes = [], noteId) => {
  return notes.find((note) => note.id === Number(noteId)); 
}

export const getNotesForFolder = (notes = [], folderId) => {
  return !folderId ? notes : notes.filter((note) => note.folder_id === Number(folderId));
};

export const countNotesForFolder = (notes = [], folderId) =>
  notes.filter((note) => note.folder_id === folderId).length;
