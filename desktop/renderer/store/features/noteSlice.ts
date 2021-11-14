import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../../utils/database";
import { AppThunk, RootState } from "../config";

interface NoteState {
  readonly loading: boolean;
  readonly notes: Note[];
}

interface Note {
  readonly id: string;
  readonly note: string;
  readonly uid: string;
  readonly createdAt: Date;
  readonly title?: string;
  readonly updatedAt?: Date;
  readonly folder?: string;
}

const initialState: NoteState = {
  loading: false,
  notes: [],
};

export const noteSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const fetchNotes =
  (userId: string): AppThunk =>
  async (dispatch, _getState) => {
    const { data: notes, error } = await supabase
      .from("Note")
      .select("*")
      .eq("user_id", userId);

    var noteArray: Note[] = [];

    notes.forEach((note) => {
      const currentNote = note as Note;
      noteArray.push(currentNote);
    });

    dispatch(setNotes(noteArray));
  };

export const userNotes = (state: RootState) => state.note.notes;

export const { setNotes, setLoading } = noteSlice.actions;

export default noteSlice.reducer;
