import React from 'react';
import axios from 'axios';
import GetAPI from '../utilities/GetAPI';
import { BASE_URL } from '../utilities/URL';
import DefaultLayout from '../layout/DefaultLayout';
import TableUsers from '../components/Tables/TableUsers';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { error_toaster, info_toaster } from '../utilities/Toaster';

export default function Shops() {
  const { data ,reFetch } = GetAPI('admin/get_shops');
  function handleClick(id) {
    axios.get(BASE_URL + `admin/updateStatus/${id}`).then((dat) => {
      reFetch();
      if (dat?.data?.status === "1") {
        info_toaster(dat?.data?.message);
      } else {
        error_toaster(dat?.data?.message);
      }
    });
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Shop's" />
      <div className="flex flex-col gap-10">
        <TableUsers onClick={handleClick} data={data?.data?.data} />
      </div>
    </DefaultLayout>
  );
}
