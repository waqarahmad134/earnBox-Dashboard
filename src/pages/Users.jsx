import React from 'react';
import axios from 'axios';
import GetAPI from '../utilities/GetAPI';
import { BASE_URL } from '../utilities/URL';
import DefaultLayout from '../layout/DefaultLayout';
import TableUsers from '../components/Tables/TableUsers';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { error_toaster, info_toaster } from '../utilities/Toaster';

export default function Users() {
  const { data, reFetch } = GetAPI('admin/get_users');
  function handleClick(id) {
    axios.get(BASE_URL + `admin/updateStatus/${id}`).then((dat) => {
      if (dat?.data?.status === '1') {
        reFetch();
        info_toaster(dat?.data?.message);
      } else {
        error_toaster(dat?.data?.message);
      }
    });
  }
  function deleteUser(id) {
    axios.get(BASE_URL + `admin/deleteUser/${id}`).then((dat) => {
      if (dat?.data?.status === '1') {
        reFetch();
        info_toaster(dat?.data?.message);
      } else {
        error_toaster(dat?.data?.message);
      }
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
