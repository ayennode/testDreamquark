import {
  ManageUser,
  UserList,
  EditUser,
  JobList,
  ManageJob,
  TeamList,
  ManageTeam,
  EditTeam,
} from './pages'

export const Routes = [
  { path: '/', component: UserList, exact: true },
  { path: '/userList', component: UserList },
  { path: '/manageUser', component: ManageUser },
  { path: '/manageUser/:id', component: EditUser },
  { path: '/jobList', component: JobList },
  { path: '/manageJob', component: ManageJob },
  { path: '/teamList', component: TeamList },
  { path: '/manageTeam', component: ManageTeam },
  { path: '/manageTeam/:id', component: EditTeam },
]
