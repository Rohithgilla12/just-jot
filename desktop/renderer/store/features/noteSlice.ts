import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NoteState {
  readonly loading: boolean;
  readonly notes: Note[];
}

interface Note {
  readonly id: string;
  readonly text: string;
  readonly uid: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
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

export const { setNotes, setLoading } = noteSlice.actions;
