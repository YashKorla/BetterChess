import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// import {useAppDispatch,useAppSelector} from 'hooks.ts';

// const value = useAppSelector((state)=> state.userPreference.user.email);

// const dispatch = useAppDispatch();
//  dispatch(setIsloading());
