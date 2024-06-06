import React from 'react';
import axios from 'axios';
import GetAPI from '../utilities/GetAPI';
import { BASE_URL } from '../utilities/URL';
import DefaultLayout from '../layout/DefaultLayout';
import TableUsers from '../components/Tables/TableUsers';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import {
  info_toaster,
  success_toaster,
  warning_toaster,
} from '../utilities/Toaster';

export default function Users() {
  const { data, reFetch } = GetAPI('admin/v1/allUsers');

  function handleClick(id) {
    axios.get(BASE_URL + `admin/V1/updateStatus/${id}`).then((dat) => {
      if (dat?.data?.status === '1') {
        success_toaster(dat?.data?.message);
      } else {
        console.log(dat?.data);
        warning_toaster(dat?.data?.message);
      }
      reFetch();
    });
  }
  function deleteUser(id) {
    axios.get(BASE_URL + `admin/v1/deleteUser/${id}`).then((dat) => {
      if (dat?.data?.status === '1') {
        success_toaster(dat?.data?.message);
      } else {
        info_toaster(dat?.data?.message);
      }
      reFetch();
    });
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Users" />
      <TableUsers
        deleteUser={deleteUser}
        onClick={handleClick}
        data={data?.data?.data}
      />
    </DefaultLayout>
  );
}
