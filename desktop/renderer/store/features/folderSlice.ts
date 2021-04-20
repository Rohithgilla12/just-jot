import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FolderState {
  readonly loading: boolean;
  readonly folders: Folder[];
}

interface Folder {
  readonly id: string;
  readonly name: string;
  readonly uid: string;
}

const initialState: FolderState = {
  loading: false,
  folders: [],
};

export const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<Folder[]>) => {
      state.folders = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setFolders, setLoading } = folderSlice.actions;
