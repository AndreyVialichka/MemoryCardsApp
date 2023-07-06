import LinearProgress from "@mui/material/LinearProgress";
import { useAppSelector } from "common/hooks";
import { isLoadingSelector } from "app/app.selector";
import Header from "features/auth/Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import { Register } from "features/auth/Register/Register";
import ForgotPasport from "features/auth/PasswordRestore/ForgotPassword/ForgotPassword";
import { Packs } from "features/packs/Packs/Packs";
import { Cards } from "features/cards/componets/Cards/Cards";
import CreateNewPassword from "features/auth/PasswordRestore/CreateNewPassword/CreateNewPassword";
import CheckEmail from "features/auth/PasswordRestore/CheckEmail/CheckEmail";
import Learn from "features/cards/componets/Learn/Learn";
import Profile from "features/auth/Profile/Profile";
import { Login } from "features/auth/Login/Login";

export const App = () => {
  const isLoading = useAppSelector(isLoadingSelector);

  return <div className="App">
      {isLoading && <LinearProgress />}
      <Header />
      <Routes>
                <Route path={'/login'} element={<Login/>} />
                <Route path={'/register'} element={<Register/>} />
                <Route path={'/forgotpassword'} element={<ForgotPasport/>} />
                <Route path={'/packs'} element={<Packs/>} />
                <Route path={'/cards/:packId/:searchParams?'} element={<Cards/>} />
                <Route path={'/createnewpassword/:token'} element={<CreateNewPassword/>} />
                <Route path={'/checkemail'} element={<CheckEmail/>}/>
                <Route path={'/learn/:packId'} element={<Learn/>} />
                <Route path={'/profile'} element={<Profile/>}/>

                {/*<Route path={PATH.TEST} element={<AllComponents/>} />*/}
            </Routes>
      </div>;
};


// {
//   path: '/login',
//   element: <Login/>,
// },
// {
//   path: '/register',
//   element: <Register/>,
// },
// {
//   path: '/forgotpassword',
//   element: <ForgotPasport/>,
// },
// {
//   path: '/packs',
//   element: <Packs/>,
// },
// {
//   path: '/cards/:packId/:searchParams?',
//   element: <Cards/>,
// },
// {
//   path: '/createnewpassword/:token',
//   element: <CreateNewPassword/>,
// },
// {
//   path: '/checkemail',
//   element: <CheckEmail/>,
// },
// {
//   path: '/learn/:packId',
//   element: <Learn/>,
// },
// {
//   path: '/yprofile',
//   element: <Profile/>,
// }