import { getLocalStore, updateLocalStore } from '../../../LocalStore/LocalStore';

export const setProgress = (myProgress) => ({
  type: 'SET_PROGRESS',
  myProgress,
});

export const updateProgress = (progress) => ({
  type: 'UPDATE_PRGRESS',
  progress,
});

const updatePatch = (path) => {
  if (path.includes('foods')) {
    return 'meals';
  }
  return 'cocktails';
};

const enableBtn = () => ({
  type: 'ENABLE_BTN',
});

const disableBtn = () => ({
  type: 'DISABLEBTN',
});

const checkAllIngredient = (currProgress) => currProgress
  .every((progress) => progress.isConclude);

export const setProgressInStore = (id, path, setDoneBtn) => (dispatch) => {
  const progress = getLocalStore('inProgressRecipes');
  if (checkAllIngredient(progress[updatePatch(path)][id])) {
    dispatch(enableBtn());
    dispatch(setProgress(progress[updatePatch(path)][id]));
    setDoneBtn(false);
    return;
  }
  dispatch(setProgress(progress[updatePatch(path)][id]));
  dispatch(disableBtn);
  setDoneBtn(true);
};

export const updateProgressInStore = (
  index, path, id, setDoneBtn,
) => async (dispatch, state) => {
  const myCurrProgress = state().recipeReducer.progress;
  console.log(myCurrProgress);
  myCurrProgress[index].isConclude = !myCurrProgress[index].isConclude;
  console.log(myCurrProgress);
  const local = getLocalStore('inProgressRecipes');
  local[updatePatch(path)][id] = myCurrProgress;
  updateLocalStore('inProgressRecipes', local);
  if (checkAllIngredient(myCurrProgress)) {
    dispatch(updateProgress([]));
    dispatch(updateProgress(myCurrProgress));
    dispatch(enableBtn);
    setDoneBtn(false);
    return;
  }
  dispatch(updateProgress([]));
  dispatch(updateProgress(myCurrProgress));
  dispatch(disableBtn);
  setDoneBtn(true);
};
