import React from 'react';
import GetAPI from '../../utilities/GetAPI';
import DefaultLayout from '../../layout/DefaultLayout';
import TableThree from '../../components/Tables/TableThree';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Link } from 'react-router-dom';

export default function Package() {
  const { data, reFetch } = GetAPI('admin/v1/getPackages');
  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Packages" />
      <div className="mb-6">
        <Link
          to={'/add-package'}
          className="py-2.5 px-4 rounded bg-black text-white font-medium border "
        >
          Add New Package
        </Link>
      </div>
      <div className="flex flex-col gap-10">
        <TableThree data={data?.data?.data} />
      </div>
    </DefaultLayout>
  );
}
